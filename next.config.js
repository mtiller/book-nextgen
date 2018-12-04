// next.config.js
const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");
module.exports = withCSS(
    withTypescript({
        useFileSystemPublicRoutes: false,
        exportPathMap: async defaultPathMap => {
            return {
                "/": { page: "/" },
                "/page1": { page: "/pageview", query: { number: 1 } },
            };
        },

        // webpack(config, options) {
        //     return {
        //         useFileSystemPublicRoutes: false,
        //     };
        // },
    }),
);
