import React from "react";
import { ModelData, Results } from "../src/types";
import { useState, useEffect } from "react";
import { Entity } from "siren-types";
import { SirenNav } from "siren-nav";
import { ParameterPanel } from "./parameters";
import { ResultsChart } from "./results";

const billboardUrl = "https://mbe-api.modelica.university";
// const billboardUrl = "http://localhost:3010";

const nav = SirenNav.create(billboardUrl);

export interface InteractiveProps {
    id: string;
    content: JSX.Element;
}

export const Interactive = (props: InteractiveProps) => {
    const [modelData, setModelData] = useState<null | Entity<ModelData>>(null);
    const [modelNav, setModelNav] = useState<null | SirenNav>(null);
    const [running, setRunning] = useState<boolean>(false);
    const [results, setResults] = useState<null | Entity<Results>>(null);

    const fetchDetails = async () => {
        setModelData(null);
        setModelNav(null);
        setResults(null);
        setRunning(false);
        // Call the 'find' action on the current navigator (pointing at
        // billboard URL) to get a nav that points to the specific model
        // resources
        const mn = await nav.follow("template", { model: props.id });
        setModelNav(mn);
        const data = await mn.get().asSiren<ModelData>();
        setModelData(data);
    };

    const runSimulation = async (mods: { [key: string]: string }) => {
        setRunning(true);
        try {
            const result = await modelNav.performAction("run", mods).asSiren<Results>();
            setResults(result);
        } catch (e) {
            console.error(e);
        } finally {
            setRunning(false);
        }
    };

    // TODO: Go to billboard, find the particular model we are interested
    // in (by id), download the model information (parameters, etc) to render in
    // the application and also the action to trigger for simulation.

    const figureLink = (
        <a
            id={`figure-${props.id}-link`}
            style={{ float: "left", lineHeight: 1, marginLeft: "-20px", paddingRight: "4px" }}
            className="figurelink"
            aria-hidden="true"
            href={`#figure-${props.id}`}
        >
            <svg
                className="octicon octicon-link"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                aria-hidden="true"
            >
                <path
                    fill-rule="evenodd"
                    d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
                />
            </svg>
        </a>
    );

    useEffect(() => {
        fetchDetails();
    }, [billboardUrl, props.id]);
    return (
        <div id={`figure-${props.id}`} style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            <div style={{ flexGrow: 1, flexBasis: 0, display: "flex" }}>
                {modelData ? (
                    <ParameterPanel running={running} onRun={runSimulation} modelData={modelData.properties} />
                ) : (
                    <div style={{ flexGrow: 1 }} />
                )}
            </div>
            {results ? (
                <div style={{ flexGrow: 0 }}>
                    <h4 style={{ margin: 0, marginTop: 10, marginBottom: 5 }}>
                        {figureLink}
                        {modelData.properties.casedata.title}
                    </h4>
                    <div style={{ width: 600, height: 480, marginLeft: "auto", marginRight: "auto" }}>
                        <ResultsChart height={460} modelData={modelData.properties} results={results.properties} />
                    </div>
                </div>
            ) : (
                <div style={{ flexGrow: 0 }}>
                    {figureLink}
                    {props.content}
                </div>
            )}
            <div style={{ flexGrow: 1, flexBasis: 0 }} />
        </div>
    );
};
