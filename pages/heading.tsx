import React from "react";

import { Navbar, AnchorButton, Button, InputGroup } from "@blueprintjs/core";
import { SphinxLink } from "./types";
import { Index } from "lunr";
import { SearchDialog } from "./search";

export interface HeadingProps {
    next: SphinxLink | null;
    prev: SphinxLink | null;
    parent: SphinxLink | null;
    search: Index;
    titles: { [href: string]: string };
}
export const Heading = (props: HeadingProps) => {
    // const page = props.page;
    return (
        <div>
            <Navbar className="bp3-dark" style={{ display: "flex", justifyContent: "space-between" }} fixedToTop={true}>
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
                    {props.parent && (
                        <AnchorButton
                            className="bp3-minimal"
                            icon="arrow-up"
                            text={props.parent.title}
                            href={props.parent.link}
                        />
                    )}
                    <AnchorButton
                        style={{ marginRight: 20 }}
                        className="bp3-minimal"
                        icon="home"
                        text="Home"
                        href="/"
                    />
                    <SearchDialog index={props.search} titles={props.titles} />
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
            <div style={{ width: "100%", display: "flex", justifyContent: "space-around", marginTop: "60px" }}>
                <img src="/static/images/TitleHeading.png" />
            </div>
            <hr />
        </div>
    );
};
