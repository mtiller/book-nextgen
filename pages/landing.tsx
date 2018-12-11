import React from "react";
import { Card, Elevation, Collapse } from "@blueprintjs/core";
import { PageData } from "./types";
import { Choices, Choice } from "./choices";
import { MailingList, FAQs } from "./quick_links";

const faqs: Choice[] = [
    { title: "Sign up for mailing list", contents: <MailingList /> },
    { title: "Purchase eBook", contents: <span>Foo</span> },
    { title: "FAQs", contents: <FAQs /> },
];

export const LandingPage = (props: PageData) => {
    return (
        <div>
            <div style={{ width: "100%", textAlign: "center", marginTop: "5px" }}>
                <img src="/static/images/TitleHeading.png" />
                <h3 style={{ marginTop: 0 }}>by Dr. Michael M. Tiller</h3>
            </div>
            <div style={{ display: "flex" }}>
                <Card elevation={Elevation.TWO} style={{ margin: 10, width: "55vw" }}>
                    <div dangerouslySetInnerHTML={{ __html: props.page.body }} />
                </Card>
                <div style={{ width: "45vw" }}>
                    <Card style={{ margin: 10, padding: 0 }} elevation={Elevation.TWO}>
                        <Choices faqs={faqs} />
                    </Card>
                    <Card elevation={Elevation.TWO} style={{ margin: 10 }}>
                        Bar
                    </Card>
                </div>
            </div>
        </div>
    );
};
