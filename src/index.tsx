import ReactDOM from "react-dom/client";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
//import 'bootstrap/dist/css/bootstrap.min.css';


// layouts
import Admin from "./layouts/Admin/Admin";
import Auth from "./layouts/Auth/Auth";
import DashboardPersonal from "@/views/DashboardPersonal/DashboardPersonal";

function require(url: string) {
    try {
        return new URL(url, import.meta.url).href;
    } catch (e) {
        console.error("require: error.", e);
    }
}

/// @ts-ignore
window.require = require;

// Para redirigir a inicio de sesion si no se inicio,
//  cada componente en el router debe tener el codigo necesario
const rootTree = (
    <BrowserRouter>
        <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/auth" component={Auth} />

            {/* Dashboard personal */}
            <Route path="/dashboard" component={DashboardPersonal} />

            {/* add routes without layouts*/}
            <Route path="/" exact component={Auth} />
            {/* add redirect for first page*/}
            <Redirect from="*" to="/dashboard" />
        </Switch>
    </BrowserRouter>
);


ReactDOM
    .createRoot(document.getElementById("root")!)
    .render(rootTree);
