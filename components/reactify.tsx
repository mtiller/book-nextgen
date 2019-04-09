import React from "react";
import { Injector, ParsedNode } from "../src/types";

var h2r = require("html-to-react");

const processNode = new h2r.ProcessNodeDefinitions(React);
const parser = new h2r.Parser();

export function classEqual(kid: JSX.Element, className: string): boolean {
    return (
        kid.props.hasOwnProperty("className") &&
        typeof kid.props.className == "string" &&
        kid.props.className == className
    );
}

export function hasText(kid: JSX.Element, text: string, contains: boolean): boolean {
    if (kid.props.hasOwnProperty("children") && typeof kid.props.children == "string") {
        if (contains) return kid.props.children.indexOf(text) >= 0;
        return kid.props.children == text;
    }
    return false;
}

export interface ReactifyProps {
    html: string;
    injectors?: Injector[];
}

export const Reactify = (props: ReactifyProps) => {
    const injectors = props.injectors || [];
    const instructions = [
        ...injectors.map(injector => {
            return {
                shouldProcessNode: (node: ParsedNode) => injector(node, [], 0, processNode.processDefaultNode) != null,
                processNode: (node: ParsedNode, children: JSX.Element[], index: number) =>
                    injector(node, children, index, processNode.processDefaultNode),
            };
        }),
        {
            shouldProcessNode: () => true,
            processNode: processNode.processDefaultNode,
        },
    ];
    const element = parser.parseWithInstructions(props.html, () => true, instructions);
    return element;
};
