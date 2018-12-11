import React from "react";
import { Card, Elevation, Collapse } from "@blueprintjs/core";
import { PageData } from "./types";
import { Choices, Choice } from "./choices";
import { MailingList, FAQs, BuyBook } from "./quick_links";
import { SponsorView } from "./sponsors";
import { Index } from "lunr";
import { SearchDialog } from "./search";

const faqs: Choice[] = [
    { title: "Sign up for mailing list", contents: <MailingList /> },
    { title: "Purchase eBook", contents: <BuyBook /> },
    { title: "FAQs", contents: <FAQs /> },
];

export const LandingPage = (props: PageData) => {
    const search = Index.load(props.serializedIndex);
    return (
        <div>
            <div style={{ width: "100%", textAlign: "center", marginTop: "5px" }}>
                <img src="/static/images/TitleHeading.png" />
                <h3 style={{ marginTop: 0 }}>by Dr. Michael M. Tiller</h3>
            </div>
            <div style={{ display: "flex" }}>
                <Card elevation={Elevation.TWO} style={{ margin: 10, width: "55vw" }}>
                    <div style={{ float: "right" }}>
                        <SearchDialog index={search} titles={props.titles} />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: props.page.body }} />
                </Card>
                <div style={{ width: "45vw" }}>
                    <Card style={{ margin: 10, padding: 0 }} elevation={Elevation.TWO}>
                        <Choices faqs={faqs} />
                    </Card>
                    <Card elevation={Elevation.TWO} style={{ margin: 10 }}>
                        <SponsorView sponsors={props.sponsors} />
                    </Card>
                </div>
            </div>
            <p style={{ float: "right", fontSize: "75%", color: "#888" }}>
                <span className="metadata">{props.global.release}</span>
            </p>
        </div>
    );
};
