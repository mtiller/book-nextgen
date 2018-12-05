import { RouterProps } from "next/router";

export interface PageProps<Q> {
    router: RouterProps<Q>;
}

export interface SphinxJsonData {
    body: string;
    alabaster_version: string;
    display_toc: boolean;
    title: string;
    sourcename: string;
    customsidebar: null;
    metatags: string;
    current_page_name: string;
    next: { link: string; title: string };
    rellinks: Array<[string, string, string, string]>;
    meta: {};
    parents: Array<void>;
    sidebars: null;
    toc: string;
    prev: { link: string; title: string };
    page_source_suffix: string;
}
