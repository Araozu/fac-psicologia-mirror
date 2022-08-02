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
// @ts-ignore
import Crear from "./layouts/Crear";
// @ts-ignore
import Detalle from "./layouts/Detalle";


// views without layouts

// @ts-ignore
import Landing from "./views/Landing";
// @ts-ignore
import Profile from "./views/Profile";

function require(url: string) {
    try {
        return new URL(url, import.meta.url).href;
    } catch (e) {}
}

/// @ts-ignore
window.require = require;

const rootTree = (
    <BrowserRouter>
        <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/auth" component={Auth} />
            <Route path="/crear" component={Crear} />
            <Route path="/detalle/:codigo" component={Detalle} />

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
