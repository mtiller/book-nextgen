import React from "react";
import { LandingPage } from "./landing";
import { SphinxJsonData } from "./types";
import { NextContext } from "next";

export default class Index extends React.Component<SphinxJsonData, {}> {
    static async getInitialProps(context: NextContext) {
        const data = typeof context.query.fjson === "string" ? context.query.fjson : context.query.fjson[0];
        return JSON.parse(data);
    }
    render() {
        return <LandingPage {...this.props} />;
    }
}
// const Index = (props: PageProps<SphinxJsonData>) => <LandingPage {...props} />;
//export default withRouter(Index);
