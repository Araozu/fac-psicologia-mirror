import React, {useMemo, useState} from "react";
import {Switch, Route, Redirect} from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Estandar8 from "views/admin/Estandar8.js";
import HeaderStandard from "components/Headers/HeaderStandard";

export default function Admin() {

    const estandarList = {
        "8": {n: "Estandar 8", titulo: "Estadar para la gestion de calidad"},
        "9": {n: "Estandar 9", titulo: "Estadar para la gestion de calidad"},
        "10": {n: "Estandar 10", titulo: "Estadar para la gestion de calidad"},
    }
    const [estandar, setEstandar] = useState(estandarList["8"]);
    const [isHidden, setIsHidden] = useState(false);

    // Manejar el cambio de estandar para mostrarlo encima
    const handleViewChange = (estandarN) => {
        setEstandar(estandarList[estandarN]);
    }

    const containerClass = useMemo(
        () => isHidden ? "md:ml-24" : "md:ml-64",
        [isHidden]
    );

    return (
        <>
            <Sidebar handleViewChange={handleViewChange} setIsHiddenParent={setIsHidden}/>
            <div className={`relative ${containerClass} bg-blueGray-100`}>
                <AdminNavbar/>
                {/* Header */}
                <HeaderStandard estandar={estandar}/>
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <Switch>
                        <Route path="/admin/dashboard" exact component={Dashboard}/>
                        <Route path="/admin/maps" exact component={Maps}/>
                        <Route path="/admin/settings" exact component={Settings}/>
                        <Route path="/admin/tables" exact component={Tables}/>
                        <Route path="/admin/estandar8" exact component={Estandar8}/>
                        <Redirect from="/admin" to="/admin/dashboard"/>
                    </Switch>
                    <FooterAdmin/>
                </div>
            </div>
        </>
    );
}
