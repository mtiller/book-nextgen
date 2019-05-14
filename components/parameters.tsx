import { ModelData } from "../src/types";
import { useState } from "react";
import { FormGroup, Intent, Tooltip, InputGroup, Button } from "@blueprintjs/core";

export interface ParameterPanelProps {
    running: boolean;
    onRun: (params: { [key: string]: string }) => void;
    modelData: ModelData;
}

export const ParameterPanel = (props: ParameterPanelProps) => {
    const params = props.modelData.categories.parameter || [];
    const defaults: { [key: string]: string } = params.reduce((d, key) => {
        d[key] = props.modelData.vars[key].start;
        return d;
    }, {});
    const [mods, setMods] = useState(defaults);
    const maxSize = params.reduce((size, v) => (v.length > size ? v.length : size), 0);
    const labelWidth = 1 + (2 * maxSize) / 3;
    return (
        <div
            style={{
                paddingTop: 5,
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "auto",
                marginBottom: "auto",
                minWidth: `${labelWidth + 5}em`,
            }}
        >
            <h4 style={{ marginTop: 5, marginBottom: 10 }}>Model Parameters</h4>
            {params.map(key => {
                const v = props.modelData.vars[key];
                return (
                    <FormGroup
                        key={key}
                        inline={true}
                        intent={Intent.NONE}
                        label={
                            <div
                                style={{
                                    display: "flex",
                                    width: `${labelWidth}em`,
                                    textAlign: "right",
                                }}
                            >
                                <div style={{ flexGrow: 1 }} />
                                <div>
                                    <Tooltip content={v.description}>
                                        <code>{key}</code>
                                    </Tooltip>
                                </div>
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
        </div>
    );
};
