import React from "react";
import { useState } from "react";

export interface TogglerProps {
    content: JSX.Element;
}

export const Toggler = (props: TogglerProps) => {
    const [open, setOpen] = useState(false);
    if (open) return <span onClick={() => setOpen(false)}>{props.content}</span>;
    else
        return (
            <span onClick={() => setOpen(true)}>
                {" "}
                <span style={{ border: "1px solid black" }}>...</span>
            </span>
        );
};
