import { ModelData, Results } from "../src/types";

import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Legend, Line } from "recharts";
import { Tooltip as RechartTooltip } from "recharts";

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

export const ResultsChart = (props: ResultsChartProps) => {
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
                    top: 0,
                    right: 30,
                    left: 20,
                    bottom: 10,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" allowDecimals={false} dataKey="time" height={60} domain={["dataMin", "dataMax"]} />
                <YAxis domain={[caseData.ymin || "auto", caseData.ymax || "auto"]} />
                <RechartTooltip
                    formatter={(value, name, props) => (typeof value === "number" ? value.toFixed(3) : value)}
                />
                <Legend align="center" verticalAlign="top" height={30} />
                {caseData.vars.map((v, i) => {
                    let lineStyle: string | undefined = undefined;
                    switch (v.style) {
                        case "-.":
                            lineStyle = "7 1 1 1";
                            break;
                        case ".":
                            lineStyle = "1 2";
                            break;
                    }
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
