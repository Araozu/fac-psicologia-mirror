import React, {useEffect, useMemo, useState} from "react";
/// @ts-ignore
import Sidebar from "@/components/Sidebar/Sidebar";
/// @ts-ignore
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import HeaderDashboardPersonal from "@/views/DashboardPersonal/Headers/HeaderDashboardPersonal";
import CardPlanesMejora from "@/views/Estandares/Estandar8/Cards/CardPlanesMejora";
// @ts-ignore
import CardStats from "@/components/Cards/CardStats";
import {SERVER_PATH} from "@/variables";
import {PlanMejoraData, PlanMejoraServer, planMejoraServerToData} from "@/views/Estandares/Estandar8/Cards/PlanMejora";

type PlanMejora = {
    avance: number,
    codigo: string,
    estado: string,
    estandar_name: string,
    id: number,
    id_user: number,
    nombre: string,
    user_name: string,
}

type ServerData = {
    status: number,
    message: string,
    data?: Array<PlanMejora>,
}

async function fetchPlanMejoraUsuario(): Promise<Array<PlanMejoraData>> {
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
    const dataObj: { data: Array<PlanMejoraServer> } = await raw.json();
    return dataObj.data.map(planMejoraServerToData);
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
                <div className="w-full m-24">
                    <HeaderDashboardPersonal
                        titulo="Dashboard personal"
                        descripcion="Planes de mejora asignados para mi"
                    />

                    <div className="relative px-4" style={{top: "-6rem"}}>
                        <CardPlanesMejora producerFn={fetchPlanMejoraUsuario} />
                    </div>
                </div>
            </div>
        </div>
    );
}
