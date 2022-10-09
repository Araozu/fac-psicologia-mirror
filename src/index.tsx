import ReactDOM from "react-dom/client";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";

// layouts
// @ts-ignore
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";
// @ts-ignore
import Crear from "./layouts/Crear";
// @ts-ignore
import Detalle from "./layouts/Detalle";
// @ts-ignore
import Editar from "./layouts/Editar";

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
            <Route path="/crear" component={Crear} />
            <Route path="/detalle/:codigo" component={Detalle} />
            <Route path="/editar/:codigo" component={Editar} />

            {/* add routes without layouts*/}
            <Route path="/" exact component={Auth} />
            {/* add redirect for first page*/}
            <Redirect from="*" to="/" />
        </Switch>
    </BrowserRouter>
);

ReactDOM
    .createRoot(document.getElementById("root")!)
    .render(rootTree);
