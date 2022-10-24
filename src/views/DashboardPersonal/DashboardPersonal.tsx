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

export default function DashboardPersonal() {
    const [isHidden, setIsHidden] = useState(false);
    const nombre = localStorage.getItem("nombre");

    // Manejar el cambio de estandar para mostrarlo encima
    const handleViewChange = (estandarN: string) => {
        // @ts-ignore
        setEstandar(estandarList[estandarN]);
    };

    const containerClass = useMemo(
        () => (isHidden ? "md:ml-12" : "md:ml-64"),
        [isHidden],
    );

    useEffect(() => {
        const userToken = localStorage.getItem("access_token");
        if (userToken === null) return;

        fetch(`${SERVER_PATH}/api/plans/user`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`,
            },
        })
            .then((x) => x.json())
            .then(console.log);
    }, []);

    return (
        <>
            <Sidebar handleViewChange={handleViewChange} setIsHiddenParent={setIsHidden} />
            <div className={`relative ${containerClass} bg-blueGray-100`}>
                <AdminNavbar />
                <div className="mx-auto w-full -m-24">
                    <HeaderDashboardPersonal titulo="Dashboard personal" />

                    <h2>Estandares asignados</h2>
                    <CardPlanesMejora />
                </div>
            </div>
        </>
    );
}
