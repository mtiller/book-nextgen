import React from "react";
import { Injector } from "./types";
import { useState, useEffect } from "react";
import { Siren, Entity } from "siren-types";
import { SirenNav } from "siren-nav";

export const interactiveInjector: Injector = (node, children, index, def) => {
    if (node.type == "text") return null;
    const classes = node.attribs["class"];
    if (!classes) return null;
    const classList = classes.split(" ");
    if (classList.indexOf("interactive") == -1) return null;
    const src = node.attribs["src"];
    const id = src.slice(16, src.length - 4);
    return <Interactive key={index} id={id} content={def(node, children, index)} />;
};

const billboardUrl = "http://modelica.university:3000";
const nav = SirenNav.create(billboardUrl, billboardUrl);
const Interactive = (props: { id: string; content: JSX.Element }) => {
    const [data, setData] = useState<null | Entity<{}>>(null);

    // TODO: Go to billboard, find the particular model we are interested
    // in (by id), download the model information (parameters, etc) to render in
    // the application and also the action to trigger for simulation.

    // useEffect(
    //     () => {
    //         nav.get()
    //             .asSiren()
    //             .then(setData);
    //     },
    //     [billboardUrl],
    // );
    return data == null ? (
        <div>
            <h6 style={{ margin: 0 }}>Loading application...</h6>
            <div>{props.content}</div>
        </div>
    ) : (
        <div>
            Interactive Figure for {props.id} goes here
            <div>{props.content}</div>
            <pre>{JSON.stringify(data)}</pre>
        </div>
    );
};
