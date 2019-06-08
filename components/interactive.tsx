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
    const figureId = `figure-${props.id}`;
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

    useEffect(() => {
        fetchDetails();
    }, [billboardUrl, props.id]);
    return (
        <div id={figureId} style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            <div style={{ flexGrow: 1, flexBasis: 0, display: "flex" }}>
                {modelData ? (
                    <ParameterPanel
                        figureId={figureId}
                        running={running}
                        onRun={runSimulation}
                        modelData={modelData.properties}
                    />
                ) : (
                    <div style={{ flexGrow: 1 }} />
                )}
            </div>
            {results ? (
                <div style={{ flexGrow: 0 }}>
                    <h4 style={{ margin: 0, marginTop: 10, marginBottom: 5 }}>{modelData.properties.casedata.title}</h4>
                    <div style={{ width: 600, height: 480, marginLeft: "auto", marginRight: "auto" }}>
                        <ResultsChart height={460} modelData={modelData.properties} results={results.properties} />
                    </div>
                </div>
            ) : (
                <div style={{ flexGrow: 0 }}>{props.content}</div>
            )}
            <div style={{ flexGrow: 1, flexBasis: 0 }} />
        </div>
    );
};
