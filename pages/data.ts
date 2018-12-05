import { NextContext } from "next";

export async function getInitialProps(context: NextContext) {
    const data = typeof context.query.fjson === "string" ? context.query.fjson : context.query.fjson[0];
    const base = JSON.parse(data);
    const globalData = typeof context.query.global === "string" ? context.query.global : context.query.global[0];
    const global = JSON.parse(globalData);
    return { ...base, global: global };
}
