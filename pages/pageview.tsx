import React from "react";
import { NextContext } from "next";
import { PageData } from "./types";
import { getInitialPageProps } from "./data";
import { Heading } from "./heading";
import { IBreadcrumbProps, Breadcrumbs } from "@blueprintjs/core";
import { Index } from "lunr";

var h2r = require("html-to-react");

const Parents = (props: PageData) => {
    const parents: IBreadcrumbProps[] = props.page.parents.map(parent => ({ href: parent.link, text: parent.title }));
    const breadcrumbs: IBreadcrumbProps[] = [{ text: "Home", href: "/" }, ...parents, { text: props.page.title }];
    return (
        <div style={{ margin: 20 }}>
            <Breadcrumbs items={breadcrumbs} />
        </div>
    );
};

interface TagNode {
    type: "tag";
    name: string;
    attribs: { [attr: string]: string };
    children: Node[];
    next: Node | null;
    parent: Node | null;
    prev: Node | null;
}

interface TextNode {
    type: "text";
    data: string;
    next: Node | null;
    parent: Node | null;
    prev: Node | null;
}

type Node = TagNode | TextNode;

const Interactive = (props: { id: string; content: JSX.Element }) => {
    return (
        <div>
            Interactive Figure for {props.id} goes here
            <div>{props.content}</div>
        </div>
    );
};
const processNode = new h2r.ProcessNodeDefinitions(React);
const parser = new h2r.Parser();
const instructions = [
    {
        shouldProcessNode: (node: Node) => {
            if (node.type == "text") return;
            const classes = node.attribs["class"];
            if (!classes) return;
            const classList = classes.split(" ");
            return classList.indexOf("interactive") >= 0;
        },
        processNode: (node: Node, children: Node[], index: number) => {
            if (node.type == "text") throw new Error("Expected tag node");
            const src = node.attribs["src"];
            const id = src.slice(16, src.length - 4);
            return <Interactive key={index} id={id} content={processNode.processDefaultNode(node, children, index)} />;
            // return <h1 key={index}>{id}</h1>;
            // return React.createElement("h1", { key: index }, id);
        },
    },
    {
        shouldProcessNode: () => true,
        processNode: processNode.processDefaultNode,
    },
];

const Body = (props: PageData) => {
    const element = parser.parseWithInstructions(props.page.body, () => true, instructions);
    return <div style={{ margin: 20 }}>{element}</div>;
};

export default class PageView extends React.Component<PageData> {
    static getInitialProps(context: NextContext) {
        return getInitialPageProps(context);
    }
    render() {
        const props = this.props;
        const body = props.page.body;
        const search = Index.load(this.props.serializedIndex);

        return (
            <div>
                <Heading
                    next={props.page.next}
                    prev={props.page.prev}
                    parent={props.page.parents.length > 0 ? props.page.parents[0] : null}
                    search={search}
                    titles={props.titles}
                    toc={props.toc}
                />
                <Parents {...props} />

                <Body {...props} />
                {/* <pre>{body}</pre>
                <pre>{JSON.stringify({ ...props, url: null }, null, 4)}</pre> */}
            </div>
        );
    }
}
