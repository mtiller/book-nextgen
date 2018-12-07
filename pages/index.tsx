import React from "react";
import { LandingPage } from "./landing";
import { PageData } from "./types";
import { NextContext } from "next";
import { getInitialProps } from "./data";

export default class Index extends React.Component<PageData, {}> {
    static getInitialProps = getInitialProps;
    render() {
        return <LandingPage {...this.props} />;
    }
}
