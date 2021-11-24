import * as React from "react";
// @ts-ignore
import { createRoot } from "react-dom";
import { RemixBrowser } from "remix";

const root = createRoot(document, {hydrate: true});
root.render(<React.StrictMode><RemixBrowser /></React.StrictMode>);
