import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import HeaderDashboardPersonal from "@/views/DashboardPersonal/Headers/HeaderDashboardPersonal";
import CardPlanesMejora from "@/views/Estandares/components/Cards/CardPlanesMejora";
import CardStats from "@/components/Cards/CardStats";
import {SERVER_PATH} from "@/variables";
import {PlanMejoraServer} from "@/views/Estandares/components/PlanMejora";
import ContentWrapper from "@/components/ContentWrapper";
import {useHistory} from "react-router";


/**
 * Recupera los planes del mejora solo del usuario actualmente logeado
 */
async function fetchPlanMejoraUsuario(): Promise<Array<PlanMejoraServer>> {
    const userToken = localStorage.getItem("access_token");
    if (userToken === null) throw new Error("DashboardPersonal: Se intento recuperar planes sin usuario logeado");

    const raw = await fetch(`${SERVER_PATH}/api/plans/user`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`,
        },
    });

    if (raw.ok) {
        const dataObj: { data: Array<PlanMejoraServer> } = await raw.json();
        return dataObj.data;
    } else {
        if (raw.status === 401) {
            localStorage.removeItem("access_token");
            console.warn("401");
            useHistory().push("/auth");
        }

        throw new Error();
    }
}

export default function DashboardPersonal() {
    // Manejar el cambio de estandar para mostrarlo encima
    const handleViewChange = (estandarN: string) => {
        // @ts-ignore
        setEstandar(estandarList[estandarN]);
    };

    return (
        <div className="flex" style={ {minHeight: "100vh"} }>
            <Sidebar handleViewChange={handleViewChange} setIsHiddenParent={() => {}} />
            <div className="bg-blueGray-100 relative w-full">
                <AdminNavbar />
                <div className="w-full">
                    <HeaderDashboardPersonal
                        titulo="Mis planes de mejora"
                        descripcion="Aqui se muestra los planes de mejora que te asignaron"
                        icono="fa-bookmark"
                    />

                    <ContentWrapper>
                        {/* Usar E-8 como nombre de estandar para que se muestren
                            todos los planes en el dashboard personal */}
                        <CardPlanesMejora path="estandar8" producerFn={fetchPlanMejoraUsuario} nombreEstandar="E-8" />
                    </ContentWrapper>
                </div>
            </div>
        </div>
    );
}
