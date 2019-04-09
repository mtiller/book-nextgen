import React from "react";
import { Sponsors, SponsorData } from "../src/types";
import { Popover } from "@blueprintjs/core";

export interface SponsorViewProps {
    sponsors: Sponsors;
}

export interface SponsorRowProps {
    ids: string[];
    width: number;
    sponsors: SponsorData[];
    logoUrl: (sponsor: string, logo: string) => string;
}

export interface SponsorItemProps {
    sponsor: SponsorData;
    width: number;
    src: string;
}

export class SponsorItem extends React.Component<SponsorItemProps, {}> {
    render() {
        const content = (
            <div className="ui special popup">
                <div style={{ width: "400px", padding: "5px" }}>
                    <img width={this.props.width * 2} style={{ margin: "10px", float: "left" }} src={this.props.src} />
                    <h2>
                        <a href={this.props.sponsor.link}>{this.props.sponsor.name}</a>
                    </h2>
                    <p>{this.props.sponsor.profile}</p>
                    <p>
                        <a href={this.props.sponsor.link}>Visit {this.props.sponsor.name} website</a>
                    </p>
                </div>
            </div>
        );

        return (
            <div
                key={this.props.sponsor.name}
                className="blue item"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    marginLeft: "5px",
                    marginRight: "5px",
                }}
            >
                <Popover content={content}>
                    <img className="thumbshadow" width={this.props.width} src={this.props.src} />
                </Popover>
            </div>
        );
    }
}
export class SponsorRow extends React.Component<SponsorRowProps, {}> {
    render() {
        return (
            <div style={{ margin: "0px", paddingTop: "15px", paddingBottom: "5px", display: "flex", flexWrap: "wrap" }}>
                {this.props.sponsors.map((sponsor, i) => (
                    <SponsorItem
                        key={sponsor.name}
                        sponsor={sponsor}
                        width={this.props.width}
                        src={this.props.logoUrl(this.props.ids[i], sponsor.logo)}
                    />
                ))}
            </div>
        );
    }
}

export class SponsorView extends React.Component<SponsorViewProps, {}> {
    constructor(props: SponsorViewProps, context?: {}) {
        super(props, context);
    }

    render() {
        let logoUrl = (sponsor: string, logo: string) => `/static/sponsors/${sponsor}/${logo}`;
        let extract = (name: string) => {
            let data = this.props.sponsors.sponsorData[name];
            if (!data) {
                console.warn("No data for " + name);
            }
            return data;
        };
        let gold = this.props.sponsors.goldSponsors.map(extract);
        let silver = this.props.sponsors.silverSponsors.map(extract);
        let bronze = this.props.sponsors.bronzeSponsors.map(extract);
        return (
            <div style={{ display: "inline-block", width: "100%" }}>
                <div style={{ width: "100%" }}>
                    <div style={{ width: "100%", margin: 5 }}>
                        <h2 style={{ marginTop: 0, marginBottom: 10 }}>Gold Sponsors</h2>
                        <SponsorRow
                            width={76}
                            sponsors={gold}
                            ids={this.props.sponsors.goldSponsors}
                            logoUrl={logoUrl}
                        />
                    </div>
                    <div style={{ width: "100%", margin: 5 }}>
                        <h3 style={{ marginBottom: 10 }}>Silver Sponsors</h3>
                        <SponsorRow
                            width={61}
                            sponsors={silver}
                            ids={this.props.sponsors.silverSponsors}
                            logoUrl={logoUrl}
                        />
                    </div>
                    <div style={{ width: "100%", margin: 5 }}>
                        <h3 style={{ marginBottom: 10 }}>Bronze Sponsors</h3>
                        <SponsorRow
                            width={51}
                            sponsors={bronze}
                            ids={this.props.sponsors.bronzeSponsors}
                            logoUrl={logoUrl}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
