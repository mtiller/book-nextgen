import { RouterProps } from "next/router";

export interface PageProps<Q> {
    router: RouterProps<Q>;
}

export interface Link {
    link: string;
    title: string;
}

export interface SphinxJsonData {
    body: string;
    // alabaster_version: string;
    display_toc: boolean;
    title: string;
    sourcename: string;
    customsidebar: null;
    // metatags: string;
    current_page_name: string;
    next: Link | null;
    rellinks: Array<[string, string, string, string]>;
    meta: {};
    parents: Array<Link>;
    sidebars: null;
    toc: string;
    prev: Link | null;
    // page_source_suffix: string;
}

export interface PageData extends SphinxJsonData {
    global: GlobalData;
}

export interface GlobalData {
    release: string;
}
