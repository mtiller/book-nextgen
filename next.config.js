// next.config.js
const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");
var fs = require("fs");
var path = require("path");

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

module.exports = withCSS(
    withTypescript({
        useFileSystemPublicRoutes: false,
        exportPathMap: async defaultPathMap => {
            return {
                "/": { page: "/", query: { fjson: getData("index.fjson") } },
                "/front/preface": { page: "/pageview", query: { fjson: getData("front/preface.fjson") } },
            };
        },
    }),
);
