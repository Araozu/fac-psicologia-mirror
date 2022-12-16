import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

// components
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import Sidebar from "../../components/Sidebar/Sidebar";

// views
import EditarNarrativa from "@/views/Estandares/components/Narrativa/EditarNarrativa";
import {useHistory} from "react-router";
import Detalle from "@/views/Estandares/components/PlanMejora/Detalle";
import CrearPlanMejora from "@/views/Estandares/components/PlanMejora/CrearPlanMejora";
import {Editar} from "@/views/Estandares/components/PlanMejora/Editar";
import CrearNarrativa from "@/views/Estandares/components/Narrativa/CrearNarrativa";
import DetalleNarrativa from "@/views/Estandares/components/Narrativa/DetalleNarrativa";
import Users from "@/views/admin/Users/Users";
import GEstandares from "@/views/admin/GEstandares/Estandares";
import EstandarConfigurable from "@/views/Estandares/EstandarConfigurable";

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
            <Route path="/admin/estandar1" exact component={() => (
                <EstandarConfigurable
                    path="estandar1"
                    idEstandar={1}
                    nombreEstandar="E-1"
                    tituloEstandar="Estandar 1"
                    descripcionEstandar="Propositos Articulados"
                />
            )}
            />

            {/* Ver plan de mejora */}
            <Route path="/admin/estandar1/plan-mejora/detalle/:codigo" exact component={Detalle} />
            {/* Editar plan de mejora */}
            <Route path="/admin/estandar1/plan-mejora/editar/:codigo" exact component={Editar} />

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
            <Route path="/admin/estandar2" exact component={() => (
                <EstandarConfigurable
                    path="estandar2"
                    idEstandar={2}
                    nombreEstandar="E-2"
                    tituloEstandar="Estandar 2"
                    descripcionEstandar="Participación de los Grupos de Interés"
                />
            )}
            />

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
            <Route path="/admin/estandar3" exact component={() => (
                <EstandarConfigurable
                    path="estandar3"
                    idEstandar={3}
                    nombreEstandar="E-3"
                    tituloEstandar="Estandar 3"
                    descripcionEstandar="Revisión Periodica de las Políticas y Objetivos"
                />
            )}
            />

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
            <Route path="/admin/estandar4" exact component={() => (
                <EstandarConfigurable
                    path="estandar4"
                    idEstandar={4}
                    nombreEstandar="E-4"
                    tituloEstandar="Estandar 4"
                    descripcionEstandar="Sostenibilidad"
                />
            )}
            />

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
            <Route path="/admin/estandar5" exact component={() => (
                <EstandarConfigurable
                    path="estandar5"
                    idEstandar={5}
                    nombreEstandar="E-5"
                    tituloEstandar="Estandar 5"
                    descripcionEstandar="Pertinencia del Perfil de Egreso"
                />
            )}
            />

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
            <Route path="/admin/estandar6" exact component={() => (
                <EstandarConfigurable
                    path="estandar6"
                    idEstandar={6}
                    nombreEstandar="E-6"
                    tituloEstandar="Estandar 6"
                    descripcionEstandar="Revisión del Perfil de Egreso"
                />
            )}
            />

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
            <Route path="/admin/estandar7" exact component={() => (
                <EstandarConfigurable
                    path="estandar7"
                    idEstandar={7}
                    nombreEstandar="E-7"
                    tituloEstandar="Estandar 7"
                    descripcionEstandar="Sistema de Gestión de la Calidad"
                />
            )}
            />

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
            <Route path="/admin/estandar7/narrativa/editar/:codigo" exact component={EditarNarrativa} />



            {/*
             ========================
                   Estandar 8
             ========================
             */}
            <Route path="/admin/estandar8" exact component={() => (
                <EstandarConfigurable
                    path="estandar8"
                    idEstandar={8}
                    nombreEstandar="E-8"
                    tituloEstandar="Estandar 8"
                    descripcionEstandar="Estándar para la gestión de calidad"
                />
            )}
            />

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
