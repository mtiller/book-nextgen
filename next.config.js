// next.config.js
const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");
var fs = require("fs");
var path = require("path");
var glob = require("glob");

const mjpage = require("mathjax-node-page/lib/main.js").mjpage;
const runMath = true;

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

function mathify(str) {
    return new Promise((resolve, reject) => {
        mjpage(str, { format: ["TeX"], fragment: true }, { svg: true }, output => resolve(output));
    });
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

const imagesRE3 = new RegExp(escapeRegExp("../../../_images/"), "g");
const imagesRE2 = new RegExp(escapeRegExp("../../_images/"), "g");

const hrefRE = new RegExp(/href="/g);

/**
 * This is run "server-side" (where the file system actually exists) and
 * fetches the contexts of the local files.  This will then be passed
 * as "query strings" to the components so that they don't have to make any
 * network requests or read the file system (because they are "client-side").
 */
async function getData(filename) {
    const raw = fs.readFileSync(path.join(__dirname, "json", filename));
    let str = raw.toString();
    str = str.replace(imagesRE3, "/static/_images/");
    str = str.replace(imagesRE2, "/static/_images/");
    if (runMath) {
        const obj = JSON.parse(str);
        if (obj.body) {
            obj.body = await mathify(obj.body);
        }
        str = JSON.stringify(obj);
    }
    return str;
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
            const globalData = await getData("globalcontext.json");
            const sponsorData = await getData("_static/sponsors/sponsors.json");
            const lunrData = await fs.readFileSync("./static/lunr.json").toString();
            const titles = {};
            const files = await getPages();
            const ret = {};
            await Promise.all(
                files.map(async file => {
                    const fjson = JSON.parse(await getData(file));
                    const route = `/${file.slice(0, file.length - 6)}/`;
                    console.log(`Title for ${route} is ${fjson.title}`);
                    titles[route] = fjson.title;
                }),
            );
            const titleData = JSON.stringify(titles);
            let toc = JSON.parse(await getData("index.fjson")).body;
            toc = toc.replace(hrefRE, `href="/`);

            const work = files.map(async file => {
                const fjson = await getData(file);
                console.log("file = ", file);
                switch (file) {
                    case "search.fjson": {
                        break;
                    }
                    case "index.fjson": {
                        const query = {
                            page: fjson,
                            global: globalData,
                            sponsors: sponsorData,
                            titles: titleData,
                            toc: toc,
                        };
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
                        const query = {
                            index: text,
                            global: globalData,
                            sponsors: sponsorData,
                            titles: titleData,
                            toc: toc,
                        };
                        ret["/genindex"] = { page: "/indexview", query: query };
                        break;
                    }
                    default: {
                        const query = {
                            page: fjson,
                            global: globalData,
                            sponsors: sponsorData,
                            titles: titleData,
                            toc: toc,
                        };
                        const route = `/${file.slice(0, file.length - 6)}/`;
                        ret[route] = { page: "/pageview", query: query };
                        break;
                    }
                }
            });
            await Promise.all(work);
            Object.keys(ret).forEach(route => {
                console.log(`${route} -> ${ret[route].page}`);
            });
            // console.log("ret = " + JSON.stringify(ret));
            return ret;
        },
    }),
);
