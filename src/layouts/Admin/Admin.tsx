import React, {useMemo, useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

// components
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import FooterAdmin from "../../components/Footers/FooterAdmin";

// views
import Estandar8 from "../../views/Estandares/Estandar8/Estandar8";
import EditarNarrativa from "@/views/Estandares/components/Narrativa/EditarNarrativa";
import {useHistory} from "react-router";
import Detalle from "@/views/Estandares/components/PlanMejora/Detalle";
import CrearPlanMejora from "@/views/Estandares/components/PlanMejora/CrearPlanMejora";
import {Editar} from "@/views/Estandares/components/PlanMejora/Editar";
import CrearNarrativa from "@/views/Estandares/components/Narrativa/CrearNarrativa";
import DetalleNarrativa from "@/views/Estandares/components/Narrativa/DetalleNarrativa";
import Users from "@/views/admin/Users/Users";
import GEstandares from "@/views/admin/GEstandares/Estandares";

export default function Admin() {
    // Redirigir a inicio de sesion si no hay token de inicio de sesion
    const history = useHistory();
    const accessToken = localStorage.getItem("access_token");
    if (accessToken === null) {
        history.replace("/auth/");
    }

    const Routes = () => (
        <Switch>
            {/*
             ========================
                   Estandar 8
             ========================
             */}
            <Route path="/admin/estandar8" exact component={Estandar8} />

            {/* Crear plan de mejora */}
            <Route path="/admin/estandar8/plan-mejora/crear" exact component={CrearPlanMejora} />
            {/* Ver plan de mejora */}
            <Route path="/admin/estandar8/plan-mejora/detalle/:codigo" exact component={Detalle} />
            {/* Editar plan de mejora */}
            <Route path="/admin/estandar8/plan-mejora/editar/:codigo" exact component={Editar} />

            {/* Crear narrativa. */}
            <Route
                path="/admin/estandar8/narrativa/crear"
                exact
                component={() => <CrearNarrativa idEstandar={8} nombreEstandar={"Estandar 8"} />}
            />
            {/* Ver narrativa. */}
            <Route
                path="/admin/estandar8/narrativa/detalle/:codigo"
                exact
                component={() => <DetalleNarrativa nombreEstandar="Estandar 8" />}
            />
            {/* Editar narrativa. */}
            <Route path="/admin/estandar8/narrativa/editar/:codigo" exact component={EditarNarrativa} />








            {/*Administración de Usuarios*/}
            {<Route path={"/admin/users"} exact component={Users} />}

            {/*Adminitración de Estándares*/}
            <Route path={"/admin/estandares"} exact component={GEstandares} />

            <Redirect from="/admin" to="/dashboard" />
            <Redirect from="/admin/dashboard" to="/admin/estandar8" />
        </Switch>
    );

    return (
        <>
            <div className="flex" style={ {minHeight: "100vh"} }>
                <Sidebar setIsHiddenParent={() => {}} />
                <div className="bg-blueGray-100 relative w-full">
                    <AdminNavbar />
                    <div className="w-full">
                        <Routes />
                    </div>
                </div>
            </div>
        </>
    );
}
