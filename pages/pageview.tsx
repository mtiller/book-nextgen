import React from "react";
import { NextContext } from "next";
import { PageData } from "../src/types";
import { getInitialPageProps } from "../src/data";
import { Heading } from "../components/heading";
import { Reactify } from "../components/reactify";
import { interactiveInjector, sourceViewInjector } from "../injectors";
import { YouAreHere } from "../components/breadcrumbs";

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
