import React, { useEffect } from "react";

import { Navbar, AnchorButton, Button, Dialog } from "@blueprintjs/core";
import { SphinxLink } from "../src/types";
import { Index } from "lunr";
import { SearchDialog } from "./search";
import { useState } from "react";

export interface HeadingProps {
    next: SphinxLink | null;
    prev: SphinxLink | null;
    parent: SphinxLink | null;
    searchUrl: string;
    titles: { [href: string]: string };
    toc: string;
}

export const Heading = (props: HeadingProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Navbar className="bp3-dark" style={{ display: "flex", justifyContent: "space-between" }} fixedToTop={true}>
                <Navbar.Group>
                    <Button
                        className="mp3-minimal"
                        icon="align-left"
                        onClick={() => setOpen(true)}
                        text="TOC"
                        accessKey="t"
                    />
                    <Dialog isOpen={open} onClose={() => setOpen(false)}>
                        <div className="bp3-dialog-header">
                            <span className="bp3-icon-large bp3-icon-align-left" />
                            <h4 className="bp3-heading">Table of Contents</h4>
                        </div>
                        <div className="bp3-dialog-body">
                            <div
                                style={{ margin: 10, marginLeft: 20 }}
                                dangerouslySetInnerHTML={{ __html: props.toc }}
                            />
                        </div>
                    </Dialog>
                    {props.prev && (
                        <AnchorButton
                            className="bp3-minimal"
                            icon="arrow-left"
                            accessKey="p"
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
                            accessKey="u"
                            text={props.parent.title}
                            href={props.parent.link}
                        />
                    )}
                    <AnchorButton
                        style={{ marginRight: 20 }}
                        className="bp3-minimal"
                        icon="home"
                        text="Home"
                        accessKey="h"
                        href="/"
                    />
                    <SearchDialog titles={props.titles} />
                </Navbar.Group>
                <Navbar.Group>
                    {props.next && (
                        <AnchorButton
                            className="bp3-minimal"
                            rightIcon="arrow-right"
                            accessKey="n"
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
