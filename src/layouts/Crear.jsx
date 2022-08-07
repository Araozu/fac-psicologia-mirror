import React, {useMemo, useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

// components
import CrearPM from "../views/Create/CrearPM";
import Sidebar from "../components/Sidebar/Sidebar";
import HeaderCreate from "../components/Headers/HeaderCreate";
import {useHistory} from "react-router";

export default function Crear() {
    // Redirigir a inicio de sesion si no hay token de inicio de sesion
    const history = useHistory();
    const accessToken = localStorage.getItem("access_token");
    if (accessToken === null) {
        history.replace("/auth/");
    }

    const [isHidden, setIsHidden] = useState(false);
    const handleViewChange = (estandarN) => {
        setEstandar(estandarList[estandarN]);
    };
    const containerClass = useMemo(
        () => (isHidden ? "md:ml-24" : "md:ml-64"),
        [isHidden],
    );
    return (
        <>
            <Sidebar handleViewChange={handleViewChange} setIsHiddenParent={setIsHidden} />
            <div className={`relative ${containerClass} bg-blueGray-100`}>
                <HeaderCreate estandar={"Estandar 8"} tipo ={"Plan de Mejora"} />
                <Switch>
                    <Route path="/crear/crearpm" exact component={CrearPM} />
                    <Redirect from="/crear" to="/admin" />
                </Switch>
            </div>

        </>
    );

}
