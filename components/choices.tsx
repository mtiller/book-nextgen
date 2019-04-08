import React, { useState } from "react";
import { Collapse, Icon } from "@blueprintjs/core";

export interface Choice {
    title: string;
    contents: JSX.Element;
}

export interface ChoicesProps {
    faqs: Choice[];
}

export const Choices = (props: ChoicesProps) => {
    const [open, setOpen] = useState(-1);
    const select = (x: number) => {
        setOpen(open == x ? -1 : x);
    };
    return (
        <div style={{ margin: 0 }}>
            {props.faqs.map((faq, i) => {
                return (
                    <div
                        key={i}
                        style={{
                            margin: 0,
                            borderBottom: i < props.faqs.length - 1 ? "1px solid #eee" : "none",
                            padding: 10,
                            paddingLeft: 20,
                        }}
                    >
                        <h3 onClick={() => select(i)} style={{ margin: 0, marginBottom: 0 }}>
                            <Icon
                                iconSize={18}
                                style={{ marginBottom: 4 }}
                                icon={open == i ? "caret-down" : "caret-right"}
                            />
                            {faq.title}
                        </h3>
                        <Collapse isOpen={open == i}>
                            <div style={{ paddingTop: 10, paddingLeft: 20 }}>{faq.contents}</div>
                        </Collapse>
                    </div>
                );
            })}
        </div>
    );
};
