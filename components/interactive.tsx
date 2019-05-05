import React from "react";
import { ModelData, Results } from "../src/types";
import { useState, useEffect } from "react";
import { Entity } from "siren-types";
import { SirenNav } from "siren-nav";
import { ParameterPanel } from "./parameters";
import { ResultsChart } from "./results";

const billboardUrl = "https://mbe-api.modelica.university";
// const billboardUrl = "http://localhost:3010";

const nav = SirenNav.create(billboardUrl, billboardUrl, undefined, { withCredentials: false });
export const Interactive = (props: { id: string; content: JSX.Element }) => {
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
        const mn = await nav.performAction("find", { model: props.id }).followLocation();
        setModelNav(mn);
        const data = await mn.get().asSiren<ModelData>();
        setModelData(data);
    };

    const runSimulation = async (mods: { [key: string]: string }) => {
        setRunning(true);
        const result = await modelNav.performAction("run", mods).asSiren<Results>();
        setResults(result);
        setRunning(false);
        console.log("Result = ", result);
    };

    // TODO: Go to billboard, find the particular model we are interested
    // in (by id), download the model information (parameters, etc) to render in
    // the application and also the action to trigger for simulation.

    useEffect(() => {
        fetchDetails();
    }, [billboardUrl, props.id]);
    return (
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            <div style={{ flexGrow: 1, flexBasis: 0, display: "flex" }}>
                <div style={{ flexGrow: 1 }} />
                {modelData && (
                    <ParameterPanel running={running} onRun={runSimulation} modelData={modelData.properties} />
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
