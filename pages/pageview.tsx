import React from "react";
import { SphinxJsonData } from "./types";
import { getInitialProps } from "./data";

export default class PageView extends React.Component<SphinxJsonData> {
    static getInitialProps = getInitialProps;
    render() {
        return (
            <div>
                <div style={{ margin: 20 }}>
                    <div dangerouslySetInnerHTML={{ __html: this.props.body }} />
                </div>
                <pre>{JSON.stringify({ ...this.props, url: null }, null, 4)}</pre>
            </div>
        );
    }
}
