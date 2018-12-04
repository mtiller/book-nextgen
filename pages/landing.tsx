import React from "react";
import { Button, Card, Elevation } from "@blueprintjs/core";

export const LandingPage = () => {
    return (
        <div>
            <div style={{ width: "100%", textAlign: "center" }}>
                <img src="http://book.xogeny.com/_static/images/TitleHeading.png" />
                <h3 style={{ marginTop: 0 }}>by Dr. Michael M. Tiller</h3>
            </div>
            <div style={{ display: "flex" }}>
                <Card elevation={Elevation.TWO} style={{ margin: 10, flexGrow: 6 }}>
                    Foo
                </Card>
                <Card elevation={Elevation.TWO} style={{ margin: 10, flexGrow: 4 }}>
                    Bar
                </Card>
            </div>
        </div>
    );
};
