import { RouterProps } from "next/router";

export interface VariableDetails {
    style: "-" | "-." | ".";
    scale: number;
    name: string;
    legend: string;
}

export interface CaseData {
    ymin: null | number;
    ymax: null | number;
    ylabel: string;
    legloc: string;
    name: string;
    mods: { [param: string]: number };
    title: string;
    stopTime: null | number;
    type: string;
    vars: Array<VariableDetails>;
}

export interface VariableInfo {
    variability: "parameter" | "continuous";
    description: string;
    start: string;
}

export interface ModelData {
    casedata: CaseData;
    categories: { continuous: string[]; parameter?: string[] };
    vars: { [name: string]: VariableInfo };
}

export interface Results {
    title: string;
    params: { [key: string]: number };
    success: boolean;
    stdout: string;
    stderr: string;
    trajectories: { [key: string]: number[] };
}

export type Injector = (
    node: ParsedNode,
    children: JSX.Element[],
    index: number,
    def: (node: ParsedNode, children: JSX.Element[], index: number) => JSX.Element,
) => JSX.Element | null;

export interface TagNode {
    type: "tag";
    name: string;
    attribs: { [attr: string]: string };
    children: Node[];
    next: Node | null;
    parent: Node | null;
    prev: Node | null;
}

export interface TextNode {
    type: "text";
    data: string;
    next: Node | null;
    parent: Node | null;
    prev: Node | null;
}

export type ParsedNode = TagNode | TextNode;

export interface Sponsors {
    goldSponsors: string[];
    silverSponsors: string[];
    bronzeSponsors: string[];
    sponsorData: { [sponsor: string]: SponsorData };
}

export interface SponsorData {
    name: string;
    profile: string;
    link: string;
    logo: string;
}

export interface PageProps<Q> {
    router: RouterProps<Q>;
}

export interface SphinxLink {
    link: string;
    title: string;
}

export interface SphinxPage {
    title: string;
    toc: string;
    body: string;
    parents: Array<SphinxLink> | null;
    prev: SphinxLink | null;
    next: SphinxLink | null;
    meta: {};
    current_page_name: string;
    metatags: string;
    sourcename: string;
    display_toc: boolean;
    sidebars: null;
    page_source_suffix: string;
}

// This is in globalcontext.json
export interface GlobalData {
    shorttitle: string; // Includes git-describe
    docstitle: string; // ditto
    master_doc: string; // index
    copyright: string;
    project: string; // true title
    version: string; // version number
    release: string; // git-describe
    sphinx_version: string;
}

export interface IndexNode {
    category: string;
    self: string[];
    children: IndexNode[];
}

// This is in genindex.fjson
export interface IndexData {
    counts: number[];
    entries: IndexNode[];
}

// This is in searchindex.json
export interface SearchData {
    envversion: number;
    terms: { [term: string]: number | number[] };
    objtypes: {};
    docnames: string[];
    objnames: {};
    filenames: string[];
    titles: string[];
    objects: {};
    titleterms: { [term: string]: number | number[] };
}

export interface PageData {
    page: SphinxPage;
    global: GlobalData;
    sponsors: Sponsors;
    serializedIndex: {};
    titles: { [href: string]: string };
    toc: string;
}

export interface IndexPageData {
    index: IndexData;
    global: GlobalData;
    serializedIndex: {};
    titles: { [href: string]: string };
    toc: string;
}
