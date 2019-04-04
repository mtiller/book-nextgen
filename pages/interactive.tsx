import React from "react";
import { Injector } from "./types";
import { useState, useEffect } from "react";
import { Siren, Entity } from "siren-types";
import { SirenNav } from "siren-nav";
import { Button } from "@blueprintjs/core";

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

// const billboardUrl = "http://mbe-api.modelica.university";
const billboardUrl = "http://localhost:3010";
const nav = SirenNav.create(billboardUrl, billboardUrl, undefined, { withCredentials: false });
const Interactive = (props: { id: string; content: JSX.Element }) => {
    const [data, setData] = useState<null | Entity<{}>>(null);
    const [modelNav, setModelNav] = useState<null | SirenNav>(null);

    const fetchDetails = async () => {
        // Call the 'find' action on the current navigator (pointing at
        // billboard URL) to get a nav that points to the specific model
        // resources
        const mn = await nav.performAction("find", { model: props.id }).followLocation();
        setModelNav(mn);
        const data = await mn.get().asSiren();
        console.log("data = ", data);
        setData(data);
    };

    const runSimulation = async () => {
        const result = await modelNav.performAction("run", {}).asSiren();
        console.log("Result = ", result);
    };

    // TODO: Go to billboard, find the particular model we are interested
    // in (by id), download the model information (parameters, etc) to render in
    // the application and also the action to trigger for simulation.

    useEffect(() => {
        fetchDetails();
    }, [billboardUrl, props.id]);
    return data == null ? (
        <div>
            <h6 style={{ margin: 0 }}>Loading application...</h6>
            <div>{props.content}</div>
        </div>
    ) : (
        <div>
            Interactive Figure for {props.id} goes here
            <div>{props.content}</div>
            <Button onClick={() => runSimulation()}>Run</Button>
            <pre style={{ textAlign: "left" }}>{JSON.stringify(data, null, 4)}</pre>
        </div>
    );
};
