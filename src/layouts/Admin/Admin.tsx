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
import Estandar7 from "@/views/Estandares/Estandar7/Estandar7";
import Estandar1 from "@/views/Estandares/Estandar1/Estandar1";
import Estandar2 from "@/views/Estandares/Estandar2/Estandar2";
import Estandar3 from "@/views/Estandares/Estandar3/Estandar3";
import Estandar4 from "@/views/Estandares/Estandar4/Estandar4";
import Estandar5 from "@/views/Estandares/Estandar5/Estandar5";
import Estandar6 from "@/views/Estandares/Estandar6/Estandar6";

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
                   Estandar 1
             ========================
             */}
            <Route path="/admin/estandar1" exact component={Estandar1} />

            {/* Ver plan de mejora */}
            <Route path="/admin/estandar7/plan-mejora/detalle/:codigo" exact component={Detalle} />
            {/* Editar plan de mejora */}
            <Route path="/admin/estandar7/plan-mejora/editar/:codigo" exact component={Editar} />

            {/* Crear narrativa. */}
            <Route
                path="/admin/estandar1/narrativa/crear"
                exact
                component={() => <CrearNarrativa idEstandar={1} nombreEstandar={"Estandar 1"} />}
            />
            {/* Ver narrativa. */}
            <Route
                path="/admin/estandar1/narrativa/detalle/:codigo"
                exact
                component={() => <DetalleNarrativa nombreEstandar="Estandar 1" />}
            />
            {/* Editar narrativa. */}
            <Route path="/admin/estandar1/narrativa/editar/:codigo" exact component={EditarNarrativa} />



            {/*
             ========================
                   Estandar 2
             ========================
             */}
            <Route path="/admin/estandar2" exact component={Estandar2} />

            {/* Ver plan de mejora */}
            <Route path="/admin/estandar2/plan-mejora/detalle/:codigo" exact component={Detalle} />
            {/* Editar plan de mejora */}
            <Route path="/admin/estandar2/plan-mejora/editar/:codigo" exact component={Editar} />

            {/* Crear narrativa. */}
            <Route
                path="/admin/estandar2/narrativa/crear"
                exact
                component={() => <CrearNarrativa idEstandar={2} nombreEstandar={"Estandar 2"} />}
            />
            {/* Ver narrativa. */}
            <Route
                path="/admin/estandar2/narrativa/detalle/:codigo"
                exact
                component={() => <DetalleNarrativa nombreEstandar="Estandar 2" />}
            />
            {/* Editar narrativa. */}
            <Route path="/admin/estandar2/narrativa/editar/:codigo" exact component={EditarNarrativa} />






            {/*
             ========================
                   Estandar 3
             ========================
             */}
            <Route path="/admin/estandar3" exact component={Estandar3} />

            {/* Ver plan de mejora */}
            <Route path="/admin/estandar3/plan-mejora/detalle/:codigo" exact component={Detalle} />
            {/* Editar plan de mejora */}
            <Route path="/admin/estandar3/plan-mejora/editar/:codigo" exact component={Editar} />

            {/* Crear narrativa. */}
            <Route
                path="/admin/estandar3/narrativa/crear"
                exact
                component={() => <CrearNarrativa idEstandar={3} nombreEstandar={"Estandar 3"} />}
            />
            {/* Ver narrativa. */}
            <Route
                path="/admin/estandar3/narrativa/detalle/:codigo"
                exact
                component={() => <DetalleNarrativa nombreEstandar="Estandar 3" />}
            />
            {/* Editar narrativa. */}
            <Route path="/admin/estandar3/narrativa/editar/:codigo" exact component={EditarNarrativa} />


            {/*
             ========================
                   Estandar 4
             ========================
             */}
            <Route path="/admin/estandar4" exact component={Estandar4} />

            {/* Ver plan de mejora */}
            <Route path="/admin/estandar4/plan-mejora/detalle/:codigo" exact component={Detalle} />
            {/* Editar plan de mejora */}
            <Route path="/admin/estandar4/plan-mejora/editar/:codigo" exact component={Editar} />

            {/* Crear narrativa. */}
            <Route
                path="/admin/estandar4/narrativa/crear"
                exact
                component={() => <CrearNarrativa idEstandar={4} nombreEstandar={"Estandar 4"} />}
            />
            {/* Ver narrativa. */}
            <Route
                path="/admin/estandar4/narrativa/detalle/:codigo"
                exact
                component={() => <DetalleNarrativa nombreEstandar="Estandar 4" />}
            />
            {/* Editar narrativa. */}
            <Route path="/admin/estandar4/narrativa/editar/:codigo" exact component={EditarNarrativa} />



            {/*
             ========================
                   Estandar 5
             ========================
             */}
            <Route path="/admin/estandar5" exact component={Estandar5} />

            {/* Ver plan de mejora */}
            <Route path="/admin/estandar5/plan-mejora/detalle/:codigo" exact component={Detalle} />
            {/* Editar plan de mejora */}
            <Route path="/admin/estandar5/plan-mejora/editar/:codigo" exact component={Editar} />

            {/* Crear narrativa. */}
            <Route
                path="/admin/estandar5/narrativa/crear"
                exact
                component={() => <CrearNarrativa idEstandar={5} nombreEstandar={"Estandar 5"} />}
            />
            {/* Ver narrativa. */}
            <Route
                path="/admin/estandar5/narrativa/detalle/:codigo"
                exact
                component={() => <DetalleNarrativa nombreEstandar="Estandar 5" />}
            />
            {/* Editar narrativa. */}
            <Route path="/admin/estandar5/narrativa/editar/:codigo" exact component={EditarNarrativa} />



            {/*
             ========================
                   Estandar 6
             ========================
             */}
            <Route path="/admin/estandar6" exact component={Estandar6} />

            {/* Ver plan de mejora */}
            <Route path="/admin/estandar6/plan-mejora/detalle/:codigo" exact component={Detalle} />
            {/* Editar plan de mejora */}
            <Route path="/admin/estandar6/plan-mejora/editar/:codigo" exact component={Editar} />

            {/* Crear narrativa. */}
            <Route
                path="/admin/estandar6/narrativa/crear"
                exact
                component={() => <CrearNarrativa idEstandar={6} nombreEstandar={"Estandar 6"} />}
            />
            {/* Ver narrativa. */}
            <Route
                path="/admin/estandar6/narrativa/detalle/:codigo"
                exact
                component={() => <DetalleNarrativa nombreEstandar="Estandar 6" />}
            />
            {/* Editar narrativa. */}
            <Route path="/admin/estandar6/narrativa/editar/:codigo" exact component={EditarNarrativa} />



            {/*
             ========================
                   Estandar 7
             ========================
             */}
            <Route path="/admin/estandar7" exact component={Estandar7} />

            {/* Ver plan de mejora */}
            <Route path="/admin/estandar7/plan-mejora/detalle/:codigo" exact component={Detalle} />
            {/* Editar plan de mejora */}
            <Route path="/admin/estandar7/plan-mejora/editar/:codigo" exact component={Editar} />

            {/* Crear narrativa. */}
            <Route
                path="/admin/estandar7/narrativa/crear"
                exact
                component={() => <CrearNarrativa idEstandar={7} nombreEstandar={"Estandar 7"} />}
            />
            {/* Ver narrativa. */}
            <Route
                path="/admin/estandar7/narrativa/detalle/:codigo"
                exact
                component={() => <DetalleNarrativa nombreEstandar="Estandar 7" />}
            />
            {/* Editar narrativa. */}
            <Route path="/admin/estandar1/narrativa/editar/:codigo" exact component={EditarNarrativa} />



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
