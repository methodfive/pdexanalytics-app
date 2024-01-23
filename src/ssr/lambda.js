import React from "react";
import ReactDOMServer from "react-dom/server";
import {StaticRouter} from "react-router-dom/server";
import {HelmetProvider} from 'react-helmet-async'
import fs from "fs";
import path from "path";
import App, {client} from "../App";
import {ApolloProvider} from "@apollo/client";

const handler = async function (event) {
    try {
        const url = event.Records[0].cf.request.uri;
        const helmetContext = {};
        const app = ReactDOMServer.renderToString(
            <StaticRouter location={url}>
                <HelmetProvider context={helmetContext}>
                    <ApolloProvider client={client}>
                        <App renderMode={"SSR"} />
                    </ApolloProvider>
                </HelmetProvider>
            </StaticRouter>
        );
        const { helmet } = helmetContext;

        let html = fs.readFileSync(path.resolve("./index.html"), {encoding:'utf8', flag:'r'});

        html = html.replace(`<html lang="en">`, `<html ${helmet.htmlAttributes.toString()}>`)
        html = html.replace(`<title></title>`, helmet.title.toString())
        html = html.replace(`<meta name="h-meta"/>`, helmet.meta.toString())
        html = html.replace(`<meta name="h-link"/>`, helmet.link.toString())
        html = html.replace('<div id="root"></div>', `<div id="root">${app}</div>`);

        const statusCode = (helmet.title.toString().includes("404")) ? "404" : "200";
        return {
            status: statusCode,
            statusDescription: "OK",
            headers: {
                "cache-control": [
                    {
                        key: "Cache-Control",
                        value: "max-age=100",
                    },
                ],
                "content-type": [
                    {
                        key: "Content-Type",
                        value: "text/html",
                    },
                ],
            },
            body: html,
        };
    } catch (error) {
        console.log(`Error ${error.message}`, error);
        return `Error ${error}`;
    }
};

export { handler };