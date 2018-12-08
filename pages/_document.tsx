import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { getInitialProps, parseGlobal } from "./data";
import { PageData } from "./types";

export default class MyDocument extends Document<PageData> {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
        // Doing this causes problems because sometimes "global" is there
        // and sometimes it isn't.  I don't know if this is run only "server
        // side" or if it is also done client side.  But one option could be
        // to read the file directly or figure out how to properly inject
        // the query field *consistently* for documents.

        // const g = parseGlobal(ctx);
        // return { ...initialProps, global: g };
    }

    render() {
        return (
            <html>
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    <meta name="generator" content="Next.js" />

                    <meta property="og:title" content="Modelica by Example" />
                    <meta property="og:type" content="books.book" />
                    <meta property="og:url" content="https://mbe.modelica.university/" />
                    <meta property="og:image" content="/static/images/TitleHeading.png" />

                    <meta
                        property="og:description"
                        content="A free HTML version of the book 'Modelica by Example', by Michael Tiller"
                    />
                    <meta property="og:site_name" content="Modelica by Example" />

                    <meta name="description" content="Modelica by Example" />

                    <meta property="article:author" content="https://modelica.university/about/" />
                    <meta property="article:tag" content="Modelica" />
                    <meta property="article:tag" content="modeling" />
                    <meta property="article:tag" content="simulation" />

                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:url" content="https://mbe.modelica.university/" />
                    <meta name="twitter:title" content="Modelica by Example" />
                    <meta
                        name="twitter:description"
                        content="A free HTML version of the book 'Modelica by Example', by Michael Tiller"
                    />
                    <meta name="twitter:image" content="/static/images/TitleHeading.png" />

                    <link rel="icon" href="/static/images/favicon.ico" />
                    <link
                        href="http://fonts.googleapis.com/css?family=Domine:400,700"
                        rel="stylesheet"
                        type="text/css"
                    />
                    <link
                        href="http://fonts.googleapis.com/css?family=Inconsolata:400,700"
                        rel="stylesheet"
                        type="text/css"
                    />
                    <link href="http://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css" />

                    <link href="https://unpkg.com/normalize.css@^7.0.0" rel="stylesheet" />
                    <link href="https://unpkg.com/@blueprintjs/core@^3.0.0/lib/css/blueprint.css" rel="stylesheet" />
                    <link
                        href="https://unpkg.com/@blueprintjs/icons@^3.0.0/lib/css/blueprint-icons.css"
                        rel="stylesheet"
                    />

                    <link rel="stylesheet" href="/static/xogeny.css" type="text/css" />
                    <link rel="stylesheet" href="/static/pygments.css" type="text/css" />
                    <link rel="stylesheet" href="/static/tweaks.css" type="text/css" />
                    <script async={true} src="//www.google-analytics.com/analytics.js" />
                    <script type="text/javascript" src="/static/jquery.js" />

                    <script
                        dangerouslySetInnerHTML={{
                            __html: `(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
      m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
  })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

  ga('create', 'UA-33034217-6', 'xogeny.com');
  ga('send', 'pageview');`,
                        }}
                    />
                </Head>
                <body className="custom_class">
                    <Main />
                    <NextScript />
                    <script type="text/javascript" src="/static/xogeny.js" />
                </body>
            </html>
        );
    }
}
