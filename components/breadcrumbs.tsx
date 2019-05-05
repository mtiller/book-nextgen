import * as React from "react";
import { IBreadcrumbProps, Breadcrumbs } from "@blueprintjs/core";
import { PageData } from "../src/types";

export const YouAreHere = (props: PageData) => {
    const parents: IBreadcrumbProps[] = props.page.parents.map(parent => ({ href: parent.link, text: parent.title }));
    const breadcrumbs: IBreadcrumbProps[] = [{ text: "Home", href: "/" }, ...parents, { text: props.page.title }];
    return (
        <div style={{ margin: 20 }}>
            <Breadcrumbs items={breadcrumbs} />
        </div>
    );
};
