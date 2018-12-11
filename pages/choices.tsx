import React from "react";
import { Collapse, Icon } from "@blueprintjs/core";

export interface Choice {
    title: string;
    contents: JSX.Element;
}

export interface ChoicesProps {
    faqs: Choice[];
}

export interface ChoicesState {
    open: number;
}

export class Choices extends React.Component<ChoicesProps, ChoicesState> {
    constructor(props?: ChoicesProps) {
        super(props);
        this.state = {
            open: -1,
        };
    }

    select = (x: number) => {
        if (this.state.open == x) {
            this.setState({ ...this.state, open: -1 });
        } else {
            this.setState({ ...this.state, open: x });
        }
    };

    render() {
        return (
            <div style={{ margin: 0 }}>
                {this.props.faqs.map((faq, i) => {
                    return (
                        <div
                            key={i}
                            style={{
                                margin: 0,
                                borderBottom: i < this.props.faqs.length - 1 ? "1px solid #eee" : "none",
                                padding: 10,
                                paddingLeft: 20,
                            }}
                        >
                            <h3 onClick={() => this.select(i)} style={{ margin: 0, marginBottom: 0 }}>
                                <Icon
                                    iconSize={18}
                                    style={{ marginBottom: 4 }}
                                    icon={this.state.open == i ? "caret-down" : "caret-right"}
                                />
                                {faq.title}
                            </h3>
                            <Collapse isOpen={this.state.open == i}>
                                <div style={{ paddingTop: 10, paddingLeft: 20 }}>{faq.contents}</div>
                            </Collapse>
                        </div>
                    );
                })}
            </div>
        );
    }
}
