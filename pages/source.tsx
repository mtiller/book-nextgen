import React from "react";
import { Injector } from "../src/types";
import { Toggler } from "../components/toggler";
import { classEqual, hasText } from "./reactify";

const isLast = (kid: JSX.Element) => kid.type == "span" && classEqual(kid, "p") && hasText(kid, ";", true);

const isAnnotation = (kid: JSX.Element) =>
    kid.type == "span" && classEqual(kid, "kr") && hasText(kid, "annotation", false);

// Use a simple state machine to transform child nodes of a <pre> element so
// that we can toggle the visibility of annotations.
export const sourceViewInjector: Injector = (node, children, index, def) => {
    // Look only for "pre" elements
    if (node.type == "text") return null;
    if (node.name != "pre") return null;

    // Flag indicating whether we are collection the children of an annotation node
    let collect = false;

    // The "new" children, after we re-organize the children
    const kids: JSX.Element[] = [];
    // A buffer where we store the children of an annotation node
    let buffer: JSX.Element[] = [];

    // Loop over all children
    for (let i = 0; i < children.length; i++) {
        // Extract the kid we are interested in
        const kid = children[i];

        // Are we in the process of collection children (i.e., already found an annotation)
        if (collect) {
            // If so, push that kid into the buffer
            buffer.push(kid);
            // Is this the last child of the annotation node?
            if (isLast(kid)) {
                // Take kids in the buffer and wrap them in a Toggler
                kids.push(<Toggler content={<span children={buffer} />} />);
                // Clear the buffer
                buffer = [];
                // Terminate collection
                collect = false;
            }
        } else {
            // If we aren't collectin children, just push the kid right through
            kids.push(kid);
            // Buf is this an annotation node?
            if (isAnnotation(kid)) {
                // If so, set the `collect` flag
                collect = true;
            }
        }
    }

    // Now we just do the default transformation, but with the transformed
    // children
    return def(node, kids, index);
};
