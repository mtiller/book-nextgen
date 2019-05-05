import React from "react";
import { Card, Elevation } from "@blueprintjs/core";
import { LandingPageData } from "../src/types";
import { Choices, Choice } from "../components/choices";
import { mailingList, faqs, buyBook } from "../components/quick_links";
import { SponsorView } from "../components/sponsors";
import { SearchDialog } from "../components/search";

const choices: Choice[] = [
    { title: "Sign up for mailing list", contents: mailingList },
    { title: "Purchase eBook", contents: buyBook },
    { title: "FAQs", contents: faqs },
];

export const LandingPage = (props: LandingPageData) => {
    return (
        <div>
            <div style={{ width: "100%", textAlign: "center", marginTop: "5px" }}>
                <img src="/static/images/TitleHeading.png" />
                <h3 style={{ marginTop: 0 }}>by Dr. Michael M. Tiller</h3>
            </div>
            <div style={{ display: "flex" }}>
                <Card elevation={Elevation.TWO} style={{ margin: 10, width: "55vw" }}>
                    <div style={{ float: "right" }}>
                        <SearchDialog titles={props.titles} />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: props.page.body }} />
                </Card>
                <div style={{ width: "45vw" }}>
                    <Card style={{ margin: 10, padding: 0 }} elevation={Elevation.TWO}>
                        <Choices faqs={choices} />
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
