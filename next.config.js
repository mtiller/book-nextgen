// next.config.js
const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");
var fs = require("fs");
var path = require("path");
var glob = require("glob");

function normalizeEntry(entry) {
    const category = entry[0];
    const children = entry[1].map(normalizeIndex);
    return {
        category: category,
        self: [],
        children: children,
    };
}

function normalizeIndex(id) {
    try {
        const first = id[0];
        if (typeof first !== "string")
            throw new Error(`Expected first entry to be a string, but got ${typeof first} in ${JSON.stringify(id)}`);
        const category = first;
        const rest = id[1];
        if (rest.length == 3 && rest[2] == null) {
            const self = rest[0].map(x => x[1]);
            const children = rest[1].map(x => normalizeIndex(x));
            return {
                category: category,
                self: self,
                children: children,
            };
        } else {
            return {
                category: category,
                self: rest.map(r => r[1]),
                children: [],
            };
        }
    } catch (e) {
        throw e;
    }
}

/**
 * This is run "server-side" (where the file system actually exists) and
 * fetches the contexts of the local files.  This will then be passed
 * as "query strings" to the components so that they don't have to make any
 * network requests or read the file system (because they are "client-side").
 */
function getData(filename) {
    const raw = fs.readFileSync(path.join(__dirname, "json", filename));
    return raw.toString();
}

async function getPages() {
    return new Promise((resolve, reject) => {
        glob(
            "**/*.fjson",
            {
                cwd: path.join(__dirname, "json"),
            },
            (err, files) => {
                if (err) reject(err);
                else resolve(files);
            },
        );
    });
}

module.exports = withCSS(
    withTypescript({
        useFileSystemPublicRoutes: false,
        exportPathMap: async defaultPathMap => {
            const globalData = getData("globalcontext.json");
            const files = await getPages();
            const ret = {};
            files.forEach(file => {
                const fjson = getData(file);
                console.log("file = ", file);
                switch (file) {
                    case "index.fjson": {
                        const query = { page: fjson, global: globalData };
                        ret["/"] = { page: "/", query: query };
                        break;
                    }
                    case "genindex.fjson": {
                        const raw = JSON.parse(fjson);
                        // console.log("raw = ", JSON.stringify(raw));
                        const entries = raw["genindexentries"];
                        const normal = entries.map(normalizeEntry);
                        const text = JSON.stringify({
                            counts: raw["genindexcounts"],
                            entries: normal,
                        });
                        const query = { index: text, global: globalData };
                        ret["/genindex"] = { page: "/indexview", query: query };
                        break;
                    }
                    case "searchindex.fjson": {
                        const query = { search: fjson, global: globalData };
                        ret["/search"] = { page: "/searchview", query: query };
                        break;
                    }
                    default: {
                        const query = { page: fjson, global: globalData };
                        const route = `/${file.slice(0, file.length - 6)}/`;
                        ret[route] = { page: "/pageview", query: query };
                        break;
                    }
                }
            });
            Object.keys(ret).forEach(route => {
                console.log(`${route} -> ${ret[route].page}`);
            });
            // console.log("ret = " + JSON.stringify(ret));
            return ret;
        },
    }),
);
