import React from "react";
import { SphinxJsonData } from "./types";
import { getInitialProps } from "./data";
import { Heading } from "./heading";
import { IBreadcrumbProps, Breadcrumbs } from "@blueprintjs/core";

const Parents = (props: SphinxJsonData) => {
    const parents: IBreadcrumbProps[] = props.parents.map(parent => ({ href: parent.link, text: parent.title }));
    const breadcrumbs: IBreadcrumbProps[] = [{ text: "Home", href: "/" }, ...parents, { text: props.title }];
    return (
        <div style={{ margin: 20 }}>
            <Breadcrumbs items={breadcrumbs} />
        </div>
    );
};

export default class PageView extends React.Component<SphinxJsonData> {
    static getInitialProps = getInitialProps;
    render() {
        const props = this.props;

        return (
            <div>
                <Heading {...props} />
                <div style={{ width: "100%", display: "flex", justifyContent: "space-around", marginTop: "60px" }}>
                    <img src="/static/images/TitleHeading.png" />
                </div>
                <hr />
                <Parents {...props} />

                <div style={{ margin: 20 }}>
                    <div dangerouslySetInnerHTML={{ __html: props.body }} />
                </div>
                <pre>{JSON.stringify({ ...props, url: null }, null, 4)}</pre>
            </div>
        );
    }
}
