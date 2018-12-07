import { NextContext } from "next";
import { PageData, SphinxJsonData, GlobalData } from "./types";

// const fjsonPlaceholder: SphinxJsonData = {
//     body: `<div>Placeholder Body</div>`,
//     display_toc: true,
//     title: "Placeholder Body",
//     sourcename: "N/A",
//     customsidebar: null,
//     current_page_name: "placeholder",
//     next: null,
//     rellinks: [],
//     meta: {},
//     parents: [],
//     sidebars: null,
//     toc: "<div>Placeholder Table of Contents",
//     prev: null,
// };

export async function getInitialProps(context: NextContext): Promise<PageData> {
    if (!context.query.fjson) throw new Error("Missing fjson field in " + JSON.stringify(context.query));
    const fjson = context.query.fjson;
    const arg = typeof fjson === "string" ? fjson : fjson[0];
    const base = JSON.parse(arg);
    return { ...base, global: parseGlobal(context) };
}

export function parseGlobal(context: NextContext): GlobalData {
    const g = context.query.global;
    const globalArg = typeof g === "string" ? g : g[0];
    const globalData = JSON.parse(globalArg);
    return globalData as GlobalData;
}
