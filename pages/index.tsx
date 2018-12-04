import React from "react";
import { LandingPage, LandingPageProps } from "./landing";
import { PageProps } from "./types";

export default (props: PageProps<LandingPageProps>) => <LandingPage {...props} />;
