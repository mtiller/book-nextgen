import React from "react";
import { Injector, ParsedNode } from "./types";

var h2r = require("html-to-react");

const processNode = new h2r.ProcessNodeDefinitions(React);
const parser = new h2r.Parser();

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
                processNode: (node: ParsedNode, children: ParsedNode[], index: number) =>
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
