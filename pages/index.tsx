import React from "react";
import { Button, Card, Elevation } from "@blueprintjs/core";
import "./index.css";
import "@blueprintjs/core/lib/css/blueprint.css";
// import "@blueprintjs/icons/lib/css/blueprint-icons.css";

export default () => (
    <div>
        <h2>Welcome to Next.js with Blueprint.js!</h2>
        <Card interactive={true} elevation={Elevation.TWO}>
            <h5>
                <a href="#">Card heading</a>
            </h5>
            <p>Card content</p>
            <Button icon="refresh" />
            <Button>Submit</Button>
        </Card>
    </div>
);
