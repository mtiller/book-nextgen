import { NextContext } from "next";
import { PageData, IndexPageData, GlobalData, SphinxPage, IndexData, Sponsors } from "./types";

export async function getInitialPageProps(context: NextContext): Promise<PageData> {
    const page = parseFJSon<SphinxPage>(context.query, "page");
    const global = parseFJSon<GlobalData>(context.query, "global");
    const sponsors = parseFJSon<Sponsors>(context.query, "sponsors");
    const searchIndex = parseFJSon<{}>(context.query, "searchIndex");
    const titles = parseFJSon<{ [href: string]: string }>(context.query, "titles");
    return { page: page, global: global, sponsors: sponsors, serializedIndex: searchIndex, titles: titles };
}

export async function getInitialIndexProps(context: NextContext): Promise<IndexPageData> {
    const index = parseFJSon<IndexData>(context.query, "index");
    const global = parseFJSon<GlobalData>(context.query, "global");
    const searchIndex = parseFJSon<{}>(context.query, "searchIndex");
    const titles = parseFJSon<{ [href: string]: string }>(context.query, "titles");
    return { index: index, global: global, serializedIndex: searchIndex, titles: titles };
}

function parseFJSon<P>(query: Record<string, string | string[]>, field: string): P {
    if (!query[field]) throw new Error(`Missing page '${field}' in ${JSON.stringify(Object.keys(query))}`);
    const fjson = query[field];
    const arg = typeof fjson === "string" ? fjson : fjson[0];
    const data = JSON.parse(arg) as P;
    return data;
}
