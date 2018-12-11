import React from "react";
import { Button, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
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
            console.log(`term = ${term}`);
            if (props.index && term != "") {
                let results = props.index.search(term);
                console.log(`# of hits: ${results.length}`);
                console.log(results);
                setHits(results.map(result => ({ title: props.titles[result.ref], href: result.ref })));
            } else {
                setHits([]);
            }
        },
        [term, props.index],
    );
    return (
        <div>
            <Button icon="search" onClick={() => setOpen(!open)} />
            <Dialog isOpen={open} onClose={() => setOpen(false)}>
                <div className="bp3-dialog-header">
                    <span className="bp3-icon-large bp3-icon-inbox" />
                    <h4 className="bp3-heading">Search Book</h4>
                    <Button icon="small-cross" onClick={() => setOpen(false)} />
                </div>
                <div className="bp3-dialog-body">
                    <FormGroup helperText="Enter search term" label="Search Term" labelFor="text-input">
                        <InputGroup
                            id="text-input"
                            placeholder="Search terms..."
                            value={term}
                            onChange={ev => setTerm(ev.target.value)}
                        />
                    </FormGroup>
                    {term == "" ? (
                        <p>Enter search term</p>
                    ) : !hits ? (
                        <p>No matches</p>
                    ) : (
                        <div>
                            {hits.map((hit, i) => (
                                <p key={i}>
                                    <a href={hit.href}>{hit.title}</a>
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            </Dialog>
        </div>
    );
};
