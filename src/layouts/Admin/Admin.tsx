import React, {useMemo, useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

// components
// @ts-ignore
import AdminNavbar from "../../components/Navbars/AdminNavbar.jsx";
// @ts-ignore
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
// @ts-ignore
import FooterAdmin from "../../components/Footers/FooterAdmin.jsx";

// views
import Estandar8 from "../../views/Estandares/Estandar8/Estandar8";
import EditarNarrativa from "@/views/Estandares/Estandar8/Narrativa/EditarNarrativa";
import {useHistory} from "react-router";
import Detalle from "@/views/Estandares/Estandar8/PlanMejora/Detalle";
import CrearPlanMejora from "@/views/Estandares/Estandar8/PlanMejora/CrearPlanMejora";
import {Editar} from "@/views/Estandares/Estandar8/PlanMejora/Editar";
import CrearNarrativa from "@/views/Estandares/Estandar8/Narrativa/CrearNarrativa";
import DetalleNarrativa from "@/views/Estandares/Estandar8/Narrativa/DetalleNarrativa";

export default function Admin() {
    // Redirigir a inicio de sesion si no hay token de inicio de sesion
    const history = useHistory();
    const accessToken = localStorage.getItem("access_token");
    if (accessToken === null) {
        history.replace("/auth/");
    }

    const estandarList = {
        "8": {n: "Estandar8", titulo: "Estadar para la gestion de calidad"},
        "9": {n: "Estandar 9", titulo: "Estadar para la gestion de calidad"},
        "10": {n: "Estandar 10", titulo: "Estadar para la gestion de calidad"},
    };
    const [estandar, setEstandar] = useState(estandarList["8"]);
    const [isHidden, setIsHidden] = useState(false);

    // Manejar el cambio de estandar para mostrarlo encima
    const handleViewChange = (estandarN: string) => {
        // @ts-ignore
        setEstandar(estandarList[estandarN]);
    };

    const containerClass = useMemo(
        () => (isHidden ? "md:ml-12" : "md:ml-64"),
        [isHidden],
    );

    return (
        <>
            <Sidebar handleViewChange={handleViewChange} setIsHiddenParent={setIsHidden} />
            <div className={`relative ${containerClass} bg-blueGray-100`}>
                <AdminNavbar />
                {/* Header */}

                <div className="mx-auto w-full -m-24">
                    <Switch>
                        <Route path="/admin/estandar8" exact component={Estandar8} />

                        {/* Crear plan de mejora */}
                        <Route path="/admin/estandar8/plan-mejora/crear" exact component={CrearPlanMejora} />
                        {/* Ver plan de mejora */}
                        <Route path="/admin/estandar8/plan-mejora/detalle/:codigo" exact component={Detalle} />
                        {/* Editar plan de mejora */}
                        <Route path="/admin/estandar8/plan-mejora/editar/:codigo" exact component={Editar} />

                        {/* Crear narrativa */}
                        <Route path="/admin/estandar8/narrativa/crear" exact component={CrearNarrativa} />
                        {/* Ver narrativa */}
                        <Route path="/admin/estandar8/narrativa/detalle/:codigo" exact component={DetalleNarrativa} />
                        {/* Editar narrativa */}
                        <Route path="/admin/estandar8/narrativa/editar/:codigo" exact component={EditarNarrativa} />

                        <Redirect from="/admin" to="/admin/estandar8" />
                        <Redirect from="/admin/dashboard" to="/admin/estandar8" />
                    </Switch>
                    <FooterAdmin />
                </div>
            </div>
        </>
    );
}
