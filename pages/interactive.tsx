import React from "react";
import { Injector } from "./types";
import { useState, useEffect } from "react";
import { Entity } from "siren-types";
import { SirenNav } from "siren-nav";
import {
    Button,
    Label,
    Classes,
    FormGroup,
    Intent,
    InputGroup,
    Card,
    Elevation,
    Position,
    Tooltip,
} from "@blueprintjs/core";

import { LineChart, CartesianGrid, XAxis, YAxis, Line, Legend, ResponsiveContainer } from "recharts";
import { Tooltip as RechartTooltip } from "recharts";

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

export interface VariableInfo {
    variability: "parameter" | "continuous";
    description: string;
    start: string;
}

export interface ModelData {
    casedata: CaseData;
    categories: { continuous: string[]; parameter?: string[] };
    vars: { [name: string]: VariableInfo };
}

export interface Results {
    title: string;
    params: { [key: string]: number };
    success: boolean;
    stdout: string;
    stderr: string;
    trajectories: { [key: string]: number[] };
}

const billboardUrl = "https://mbe-api.modelica.university";
// const billboardUrl = "http://localhost:3010";

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
    if (results == null) {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ flexGrow: 0 }}>{props.content}</div>
                {modelData && (
                    <ParameterPanel running={running} onRun={runSimulation} modelData={modelData.properties} />
                )}
            </div>
        );
    }
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ flexGrow: 0 }}>
                <h4 style={{ margin: 0 }}>{modelData.properties.casedata.title}</h4>
                <div style={{ width: 600, height: 480, marginLeft: "auto", marginRight: "auto" }}>
                    <ResultsChart height={460} modelData={modelData.properties} results={results.properties} />
                </div>
            </div>
            {modelData && <ParameterPanel running={running} onRun={runSimulation} modelData={modelData.properties} />}
        </div>
    );
};

export interface ParameterPanelProps {
    running: boolean;
    onRun: (params: { [key: string]: string }) => void;
    modelData: ModelData;
}

const ParameterPanel = (props: ParameterPanelProps) => {
    const params = props.modelData.categories.parameter || [];
    const defaults: { [key: string]: string } = params.reduce((d, key) => {
        d[key] = props.modelData.vars[key].start;
        return d;
    }, {});
    const [mods, setMods] = useState(defaults);
    return (
        <Card
            interactive={true}
            elevation={Elevation.TWO}
            style={{ paddingTop: 5, marginTop: "auto", marginBottom: "auto" }}
        >
            <p>Parameters</p>
            {params.map(key => {
                const v = props.modelData.vars[key];
                return (
                    <FormGroup
                        key={key}
                        inline={true}
                        intent={Intent.NONE}
                        label={
                            <div style={{ width: "5em" }}>
                                <Tooltip content={v.description}>
                                    <code>{key}</code>
                                </Tooltip>
                            </div>
                        }
                        labelFor={`param-${key}`}
                    >
                        <InputGroup
                            style={{ marginLeft: "auto" }}
                            id="text-input"
                            value={mods[key].toString()}
                            onChange={event => {
                                console.log("v = ", event.target.value);
                                const updated = { ...mods };
                                updated[key] = event.target.value;
                                setMods(updated);
                            }}
                            disabled={props.running}
                            intent={Intent.NONE}
                        />
                    </FormGroup>
                );
            })}
            <Button style={{ marginTop: 5 }} disabled={props.running} onClick={() => props.onRun(mods)}>
                Simulate
            </Button>
        </Card>
    );
};

export interface ResultsChartProps {
    width?: number;
    height?: number;
    modelData: ModelData;
    results: Results;
}

const colors: string[] = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf",
];

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
            const val = (Array.isArray(entry) ? entry[i] : entry) * v.scale;
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
                <RechartTooltip />
                <Legend align="center" verticalAlign="top" />
                {caseData.vars.map((v, i) => {
                    const lineStyle = v.style == "-" ? undefined : "3 4 5 2";
                    return (
                        <Line
                            strokeWidth={3}
                            key={i}
                            type="monotone"
                            dataKey={v.name}
                            strokeDasharray={lineStyle}
                            stroke={colors[i % colors.length]}
                            name={v.legend}
                        />
                    );
                })}
            </LineChart>
        </ResponsiveContainer>
    );
};
