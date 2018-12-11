import React from "react";
import { Button, Dialog, FormGroup, InputGroup, Popover, Position, Menu, MenuItem } from "@blueprintjs/core";
import { useState, useEffect } from "react";
import { Index } from "lunr";

export interface SearchDialogProps {
    index: Index;
    titles: { [href: string]: string };
}

interface SearchHit {
    title: string;
    href: string;
}

export const SearchDialog = (props: SearchDialogProps) => {
    const [open, setOpen] = useState(false);
    const [term, setTerm] = useState("");
    const [hits, setHits] = useState<SearchHit[]>([]);

    useEffect(
        () => {
            if (props.index && term != "") {
                let results = props.index.search(term);
                setHits(results.map(result => ({ title: props.titles[result.ref], href: result.ref })));
            } else {
                setHits([]);
            }
        },
        [term, props.index],
    );

    return (
        <div>
            <Popover
                content={
                    <Menu>
                        {hits.map((hit, i) => (
                            <MenuItem key={i} text={hit.title} href={hit.href} />
                        ))}
                    </Menu>
                }
                isOpen={hits.length > 0}
                position={Position.BOTTOM}
            >
                <InputGroup
                    id="text-input"
                    leftIcon="search"
                    placeholder="Search terms..."
                    value={term}
                    onChange={ev => setTerm(ev.target.value)}
                />
            </Popover>
        </div>
    );
};
