import React from "react";
import { LandingPage } from "./landing";
import { LandingPageData } from "../src/types";
import { getInitialPageProps } from "../src/data";

export default class Index extends React.Component<LandingPageData, {}> {
    static getInitialProps(context) {
        return getInitialPageProps(context);
    }
    render() {
        return <LandingPage {...this.props} />;
    }
}
