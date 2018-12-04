import React from "react";

export interface PageViewProps {
    number: number;
}

export default (props: PageProps<PageViewProps>) => {
    return <div>This is page number props {props.url.query.number}!</div>;
};
