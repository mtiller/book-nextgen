import React from "react";
import { InputGroup, Popover, Position, Menu, MenuItem } from "@blueprintjs/core";
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

    useEffect(() => {
        if (props.index && term != "") {
            // This '*' matches potential characters the user could type
            let results = props.index.search(`${term}*`);
            console.log(results);
            const hits = results.map(result => {
                const md = result.matchData.metadata;
                const title = props.titles[result.ref];
                return {
                    title: `${title}`,
                    href: result.ref,
                };
            });
            setHits(hits);
        } else {
            setHits([]);
        }
    }, [term, props.index]);

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
