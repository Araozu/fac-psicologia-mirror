import React, {useMemo, useState} from "react";
import {Switch, Route, Redirect} from "react-router-dom";

// components
import CrearPM from "../views/Create/CrearPM";

export default function Crear() {
return(
    <>
        <Switch>
            <Route path="/crear/crearpm" exact component={CrearPM}/>
            <Redirect from="/crear" to="/admin/estandar8"/>
        </Switch>
    </>
)

}
