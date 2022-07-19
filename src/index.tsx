import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";

// layouts

// @ts-ignore
import Admin from "./layouts/Admin";
// @ts-ignore
import Auth from "./layouts/Auth";

// views without layouts

// @ts-ignore
import Landing from "./views/Landing";
// @ts-ignore
import Profile from "./views/Profile";

function require(url: string) {
    return new URL(url, import.meta.url).href;
}

/// @ts-ignore
window.require = require;

const rootTree = (
    <BrowserRouter>
        <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/auth" component={Auth} />
            {/* add routes without layouts*/}
            <Route path="/landing" exact component={Landing} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/" exact component={Auth} />
            {/* add redirect for first page*/}
            <Redirect from="*" to="/" />
        </Switch>
    </BrowserRouter>
);

ReactDOM
    .createRoot(document.getElementById("root")!)
    .render(rootTree);

/*
{/* add routes with layouts }
<Route path="/admin" component={Admin} />
<Route path="/auth" component={Auth} />
{/* add routes without layouts }
<Route path="/landing" exact component={Landing} />
<Route path="/profile" exact component={Profile} />
<Route path="/" exact component={Index} />
{/* add redirect for first page }
<Redirect from="*" to="/" />
 */
