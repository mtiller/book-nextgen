import React from "react";
import { LandingPage } from "./landing";
import { SphinxJsonData } from "./types";
import { NextContext } from "next";
import { getInitialProps } from "./data";

export default class Index extends React.Component<SphinxJsonData, {}> {
    static getInitialProps = getInitialProps;
    render() {
        return <LandingPage {...this.props} />;
    }
}
