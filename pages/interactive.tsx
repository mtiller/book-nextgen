import React from "react";
import { Injector } from "./types";
import { useState, useEffect } from "react";
import { Entity } from "siren-types";
import { SirenNav } from "siren-nav";
import { Button } from "@blueprintjs/core";

import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Legend, ResponsiveContainer } from "recharts";

export interface VariableDetails {
    style: "-" | "-.";
    scale: number;
    name: string;
    legend: string;
}

export interface CaseData {
    ymin: null | number;
    ymax: null | number;
    ylabel: string;
    legloc: string;
    name: string;
    mods: { [param: string]: number };
    title: string;
    stopTime: null | number;
    type: string;
    vars: Array<VariableDetails>;
}

export interface ModelData {
    casedata: CaseData;
}

export interface Results {
    title: string;
    params: { [key: string]: number };
    success: boolean;
    stdout: string;
    stderr: string;
    trajectories: { [key: string]: number[] };
}

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
        console.log("data = ", data);
        setModelData(data);
    };

    const runSimulation = async () => {
        setRunning(true);
        const result = await modelNav.performAction("run", {}).asSiren<Results>();
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
    if (results == null) {
        return (
            <div>
                <div>{props.content}</div>
                <Button disabled={running} onClick={() => runSimulation()}>
                    Run
                </Button>
            </div>
        );
    }
    return (
        <div>
            <h4 style={{ margin: 0 }}>{modelData.properties.casedata.title}</h4>
            <div style={{ width: "100%", height: 400 }}>
                <ResultsChart modelData={modelData.properties} results={results.properties} />
            </div>
            <Button disabled={running} onClick={() => runSimulation()}>
                Run
            </Button>
        </div>
    );
};

export interface ResultsChartProps {
    width?: number;
    height?: number;
    modelData: ModelData;
    results: Results;
}

const colors: string[] = ["#8884d8", "#82ca9d"];

const ResultsChart = (props: ResultsChartProps) => {
    const times = props.results.trajectories["time"];
    const caseData = props.modelData.casedata;
    console.log("caseData = ", caseData);
    let ymin: null | number = null;
    let ymax: null | number = null;
    const data = times.map((t, i) => {
        const ret: { [key: string]: number } = {};
        ret["time"] = t;
        caseData.vars.forEach(v => {
            const entry = props.results.trajectories[v.name];
            const val = Array.isArray(entry) ? entry[i] : entry;
            if (ymin == null || ymin > val) ymin = val;
            if (ymax == null || ymax < val) ymax = val;
            ret[v.name] = val;
        });
        return ret;
    });
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                style={{ margin: "auto" }}
                width={props.width || 500}
                height={props.height || 400}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 10,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" allowDecimals={false} dataKey="time" height={60} domain={["dataMin", "dataMax"]} />
                <YAxis domain={[caseData.ymin || "auto", caseData.ymax || "auto"]} />
                <Tooltip />
                <Legend align="center" verticalAlign="top" />
                {caseData.vars.map((v, i) => (
                    <Line key={i} type="monotone" dataKey={v.name} stroke={colors[i % colors.length]} name={v.legend} />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};
