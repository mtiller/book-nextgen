import { NextContext } from "next";
import {
    PageData,
    IndexPageData,
    SearchPageData,
    GlobalData,
    SphinxPage,
    IndexData,
    SearchData,
    Sponsors,
} from "./types";

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

export async function getInitialPageProps(context: NextContext): Promise<PageData> {
    const page = parseFJSon<SphinxPage>(context.query, "page");
    const global = parseFJSon<GlobalData>(context.query, "global");
    const sponsors = parseFJSon<Sponsors>(context.query, "sponsors");
    return { page: page, global: global, sponsors: sponsors };
}

export async function getInitialIndexProps(context: NextContext): Promise<IndexPageData> {
    const index = parseFJSon<IndexData>(context.query, "index");
    const global = parseFJSon<GlobalData>(context.query, "global");
    return { index: index, global: global };
}

export async function getInitialSearchProps(context: NextContext): Promise<SearchPageData> {
    const search = parseFJSon<SearchData>(context.query, "search");
    const global = parseFJSon<GlobalData>(context.query, "global");
    return { search: search, global: global };
}

function parseFJSon<P>(query: Record<string, string | string[]>, field: string): P {
    if (!query[field]) throw new Error(`Missing page '${field}' in ${JSON.stringify(query)}`);
    const fjson = query[field];
    const arg = typeof fjson === "string" ? fjson : fjson[0];
    const data = JSON.parse(arg) as P;
    return data;
}
