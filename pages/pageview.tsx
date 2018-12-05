import React from "react";
import { SphinxJsonData } from "./types";
import { NextContext } from "next";

export default class PageView extends React.Component<SphinxJsonData> {
    static async getInitialProps(context: NextContext) {
        const data = typeof context.query.fjson === "string" ? context.query.fjson : context.query.fjson[0];
        return JSON.parse(data);
    }
    render() {
        return (
            <div>
                <div dangerouslySetInnerHTML={{ __html: this.props.body }} />
                <pre>{JSON.stringify(this.props, null, 4)}</pre>
            </div>
        );
    }
}
