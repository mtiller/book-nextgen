import React from "react";
import { LandingPage } from "./landing";
import { PageData } from "./types";
import { getInitialPageProps } from "./data";

export default class Index extends React.Component<PageData, {}> {
    static getInitialProps(context) {
        return getInitialPageProps(context);
    }
    render() {
        return <LandingPage {...this.props} />;
    }
}
