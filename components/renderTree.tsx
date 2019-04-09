import * as React from "react";
import { IndexNode } from "../src/types";

/**
 * Properties for RenderTree (and RenderCategory)
 */
export interface RenderTreeProps {
    node: IndexNode;
    depth: number;
}

/**
 * Render the category name.  It might be plain text or a collection of links.
 * @param props
 */
const RenderCategory = (props: RenderTreeProps) => {
    if (props.node.self.length == 0) return <span>{props.node.category}</span>;
    return (
        <span>
            <a href={props.node.self[0]}>
                <b>{props.node.category}</b>
            </a>{" "}
            {props.node.self.slice(1).map((s, i) => (
                <a key={i} href={s}>
                    <b>{`[${i + 1}] `}</b>
                </a>
            ))}
        </span>
    );
};

/**
 * Render a given index node and all of its children
 * @param props
 */
export const RenderTree = (props: RenderTreeProps) => {
    // At the root level, do it this way...
    if (props.depth == 0) {
        return (
            <div>
                <h3>
                    <RenderCategory {...props} />
                </h3>
                {props.node.children.map((c, i) => (
                    <RenderTree key={i} node={c} depth={props.depth + 1} />
                ))}
            </div>
        );
    }
    // If not root level, do it this way
    return (
        <div style={{ margin: 20 }}>
            <p>
                <RenderCategory {...props} />
            </p>
            {props.node.children.map((c, i) => (
                <RenderTree key={i} node={c} depth={props.depth + 1} />
            ))}
        </div>
    );
};
