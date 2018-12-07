import React from "react";
import { Navbar, AnchorButton, Button } from "@blueprintjs/core";
import { PageData } from "./types";

export const Heading2 = (props: any) => {
    return (
        <div>
            <pre>{JSON.stringify(props, null, 4)}</pre>
        </div>
    );
};
export const Heading = (props: PageData) => {
    return (
        <Navbar style={{ display: "flex", justifyContent: "space-between" }} fixedToTop={true}>
            <Navbar.Group>
                <Button className="bp3-minimal" icon="menu" text="Menu" />
                {props.prev && (
                    <AnchorButton
                        className="bp3-minimal"
                        icon="arrow-left"
                        text={props.prev.title}
                        href={props.prev.link}
                    />
                )}
            </Navbar.Group>
            <Navbar.Group>
                <AnchorButton className="bp3-minimal" icon="home" text="Home" href="/" />
            </Navbar.Group>
            <Navbar.Group>
                {props.next && (
                    <AnchorButton
                        className="bp3-minimal"
                        rightIcon="arrow-right"
                        text={props.next.title}
                        href={props.next.link}
                    />
                )}
            </Navbar.Group>
        </Navbar>
    );
};
