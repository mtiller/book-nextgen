import React from "react";
import { LandingPage } from "./landing";
import { LandingPageData } from "../src/types";
import { getInitialLandingPageProps } from "../src/data";

export default class Index extends React.Component<LandingPageData, {}> {
    static getInitialProps(context) {
        return getInitialLandingPageProps(context);
    }
    render() {
        return <LandingPage {...this.props} />;
    }
}
