import * as React from "react";
import { IndexPageData, IndexNode } from "../src/types";
import { NextContext } from "next";
import { getInitialIndexProps } from "./data";
import { Heading } from "./heading";
import { Index } from "lunr";

/**
 * Count the total number of children (leaves) in this tree
 * @param node Node to count children of
 */
function children(node: IndexNode): number {
    return node.children.reduce((p, c) => {
        return p + children(c);
    }, 1);
}

/**
 * Properties for RenderTree (and RenderCategory)
 */
interface RenderTreeProps {
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
const RenderTree = (props: RenderTreeProps) => {
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

/**
 * This function takes a collection on index nodes and breaks them into groupings
 * so as to arrive at 4 columns.
 */
function formColumns(entries: IndexNode[]) {
    // Collect the sizes of by first letter
    const sizes: { [letter: string]: number } = {};
    // Total number of entries in the index
    let total: number = 0;

    // Loop over all root level entries and establish the size for each
    // letter in the index and increment the total
    entries.forEach(e => {
        const n = children(e);
        sizes[e.category] = n;
        total += n;
    });

    // For 4 columns, we have to determine how many entries to allow in each
    // row.  We add some padding (hence the 1.x factor).  Otherwise, it might
    // overflow into 5 columns and it can also be used to adjust things so that
    // the it looks nicer.
    const collen = (1.2 * total) / 4;

    // Iterate over entries and aggregate them into groups for each column
    return entries.reduce(
        (p, e) => {
            if (p.cur + sizes[e.category] > collen) {
                return { ...p, cur: sizes[e.category], nodes: [...p.nodes, [e]] };
            } else {
                const last = p.nodes[p.nodes.length - 1];
                last.push(e);
                return { ...p, cur: p.cur + sizes[e.category], nodes: p.nodes };
            }
        },
        { cur: 0, collen: collen, total: total, sizes: sizes, nodes: [[]] as IndexNode[][] },
    );
}

/**
 * This is the component that renders the index
 */
export default class IndexView extends React.Component<IndexPageData> {
    static getInitialProps(context: NextContext) {
        return getInitialIndexProps(context);
    }
    render() {
        const index = this.props.index;
        const entries = index.entries;
        const columns = formColumns(entries);
        const search = Index.load(this.props.serializedIndex);
        return (
            <div>
                <Heading
                    next={null}
                    prev={null}
                    parent={null}
                    search={search}
                    titles={this.props.titles}
                    toc={this.props.toc}
                />
                <div style={{ margin: 20 }}>
                    <h1>Index</h1>
                    <div style={{ display: "flex" }}>
                        {columns.nodes.map((column, i) => {
                            const size = column.reduce((p, c) => p + columns.sizes[c.category], 0);
                            return (
                                <div key={i} style={{ minWidth: 300 }}>
                                    {/* <p>
                                        Size: {size}/{columns.collen} (of {columns.total})
                                    </p> */}
                                    {column.map((e, i) => (
                                        <RenderTree key={i} node={e} depth={0} />
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
