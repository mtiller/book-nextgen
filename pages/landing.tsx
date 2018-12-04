import React from "react";
import { Card, Elevation } from "@blueprintjs/core";
import { PageProps } from "./types";

export interface LandingPageProps {}

export const LandingPage = (props: PageProps<LandingPageProps>) => {
    return (
        <div>
            <div style={{ width: "100%", textAlign: "center", marginTop: "5px" }}>
                <img src="http://book.xogeny.com/_static/images/TitleHeading.png" />
                <h3 style={{ marginTop: 0 }}>by Dr. Michael M. Tiller</h3>
            </div>
            <div style={{ display: "flex" }}>
                <Card elevation={Elevation.TWO} style={{ margin: 10, flexGrow: 6 }}>
                    Foo
                </Card>
                <div style={{ flexGrow: 4 }}>
                    <Card elevation={Elevation.TWO} style={{ margin: 10 }}>
                        Bar
                    </Card>
                    <Card elevation={Elevation.TWO} style={{ margin: 10 }}>
                        Bar
                    </Card>
                </div>
            </div>
        </div>
    );
};
