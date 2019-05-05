import React from "react";
import { NextContext } from "next";
import { PageData } from "../src/types";
import { getInitialPageProps } from "../src/data";
import { Heading } from "../components/heading";
import { IBreadcrumbProps, Breadcrumbs } from "@blueprintjs/core";
import { Reactify } from "../components/reactify";
import { interactiveInjector, sourceViewInjector } from "../injectors";

const YouAreHere = (props: PageData) => {
    const parents: IBreadcrumbProps[] = props.page.parents.map(parent => ({ href: parent.link, text: parent.title }));
    const breadcrumbs: IBreadcrumbProps[] = [{ text: "Home", href: "/" }, ...parents, { text: props.page.title }];
    return (
        <div style={{ margin: 20 }}>
            <Breadcrumbs items={breadcrumbs} />
        </div>
    );
};

export default class PageView extends React.Component<PageData> {
    static getInitialProps(context: NextContext) {
        return getInitialPageProps(context);
    }
    render() {
        const props = this.props;
        const body = props.page.body;

        return (
            <div>
                <Heading
                    next={props.page.next}
                    prev={props.page.prev}
                    parent={props.page.parents.length > 0 ? props.page.parents[0] : null}
                    searchUrl="/static/lunr.json"
                    titles={props.titles}
                    toc={props.toc}
                />
                <YouAreHere {...props} />

                <div style={{ margin: 20 }}>
                    <Reactify html={body} injectors={[interactiveInjector, sourceViewInjector]} />
                </div>
            </div>
        );
    }
}
