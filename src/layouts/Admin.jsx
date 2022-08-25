import React, {useMemo, useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

// components
import AdminNavbar from "../components/Navbars/AdminNavbar.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import FooterAdmin from "../components/Footers/FooterAdmin.jsx";

// views
import Maps from "../views/admin/Maps.jsx";
import Settings from "../views/admin/Settings.jsx";
import Tables from "../views/admin/Tables.jsx";
import Estandar8 from "../views/Estandares/Estandar8.jsx";
import HeaderStandard from "../components/Headers/HeaderStandard";
import {useHistory} from "react-router";

export default function Admin() {
    // Redirigir a inicio de sesion si no hay token de inicio de sesion
    const history = useHistory();
    const accessToken = localStorage.getItem("access_token");
    if (accessToken === null) {
        history.replace("/auth/");
    }

    const estandarList = {
        "8": {n: "Estandar 8", titulo: "Estadar para la gestion de calidad"},
        "9": {n: "Estandar 9", titulo: "Estadar para la gestion de calidad"},
        "10": {n: "Estandar 10", titulo: "Estadar para la gestion de calidad"},
    };
    const [estandar, setEstandar] = useState(estandarList["8"]);
    const [isHidden, setIsHidden] = useState(false);

    // Manejar el cambio de estandar para mostrarlo encima
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
                <AdminNavbar />
                {/* Header */}
                <HeaderStandard estandar={estandar} />
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <Switch>
                        <Route path="/admin/maps" exact component={Maps} />
                        <Route path="/admin/settings" exact component={Settings} />
                        <Route path="/admin/tables" exact component={Tables} />
                        <Route path="/admin/estandar8" exact component={Estandar8} />

                        <Redirect from="/admin" to="/admin/estandar8" />
                        <Redirect from="/admin/dashboard" to="/admin/estandar8" />
                    </Switch>
                    <FooterAdmin />
                </div>
            </div>
        </>
    );
}
