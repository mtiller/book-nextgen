import React from "react";
import { InputGroup, Popover, Position, Menu, MenuItem } from "@blueprintjs/core";
import { useState, useEffect } from "react";
import { Index } from "lunr";

const searchUrl = "/static/lunr.json";

export interface SearchDialogProps {
    titles: { [href: string]: string };
}

interface SearchHit {
    title: string;
    href: string;
}

export function useSearch(): Index | null {
    const url = searchUrl;
    const [index, setIndex] = useState<Index | null>(null);
    useEffect(() => {
        fetch(url)
            .then(v => v.json())
            .then(index => {
                setIndex(Index.load(index));
            });
    }, [url]);
    return index;
}

export const SearchDialog = (props: SearchDialogProps) => {
    const [open, setOpen] = useState(false);
    const [term, setTerm] = useState("");
    const [hits, setHits] = useState<SearchHit[]>([]);
    const index = useSearch();

    useEffect(() => {
        if (index && term != "") {
            // This '*' matches potential characters the user could type
            let results = index.search(`${term}*`);
            const hits = results.map(result => {
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
    }, [term, index]);

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
                    disabled={index == null}
                    accessKey="s"
                    id="text-input"
                    leftIcon="search"
                    placeholder={index ? "Search terms..." : "Loading index..."}
                    value={term}
                    onChange={ev => setTerm(ev.target.value)}
                />
            </Popover>
        </div>
    );
};
