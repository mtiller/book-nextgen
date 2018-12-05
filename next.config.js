// next.config.js
const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");
var fs = require("fs");
var path = require("path");
var glob = require("glob");

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

function getGlobalData() {
    return fs.readFileSync(path.join(__dirname, "json", "globalcontext.json")).toString();
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
            const files = await getPages();
            const ret = {};
            files.forEach(file => {
                if (file === "index.fjson") {
                    ret["/"] = { page: "/", query: { fjson: getData(file), global: getGlobalData() } };
                } else {
                    const route = `/${file.slice(0, file.length - 6)}/`;
                    ret[route] = { page: "/pageview", query: { fjson: getData(file), global: getGlobalData() } };
                }
            });
            // console.log("ret = ", JSON.stringify(ret));
            return ret;
        },
    }),
);
