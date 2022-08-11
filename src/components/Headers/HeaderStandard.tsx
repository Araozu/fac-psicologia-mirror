import React, {useEffect, useMemo, useState} from "react";

// components
// @ts-ignore
import CardStats from "../Cards/CardStats.jsx";
import {SERVER_PATH} from "@/variables";
import {PlanMejoraServer} from "@/components/Cards/CardPlanesMejora";

export default function HeaderStandard({estandar}: any) {
    const [cantidadPlanesMejora, setCantidadPlanesMejora] = useState(-1);
    const [cantidadCompletados, setCantidadCompletados] = useState(-1);
    const [cantidadEnCurso, setCantidadEnCurso] = useState(-1);

    const porcentajeCompletados = useMemo(
        () => {
            if (cantidadPlanesMejora === -1 || cantidadCompletados === -1) return "";
            const val = Math.round((cantidadCompletados / cantidadPlanesMejora) * 100);
            return val.toString();
        },
        [cantidadCompletados, cantidadPlanesMejora],
    );

    const porcentajeEnCurso = useMemo(
        () => {
            if (cantidadPlanesMejora === -1 || cantidadEnCurso === -1) return "";
            const val = Math.round((cantidadEnCurso / cantidadPlanesMejora) * 100);
            return val.toString();
        },
        [cantidadEnCurso, cantidadPlanesMejora],
    );

    useEffect(
        () => {
            const userToken = localStorage.getItem("access_token");
            if (userToken === null) return;

            fetch(`${SERVER_PATH}/api/plan`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`,
                },
            })
                .then((obj) => obj.json())
                .then((objF: { data: Array<PlanMejoraServer> }) => {
                    const planesMejora = objF.data;

                    // cantidad total de planes de mejora
                    setCantidadPlanesMejora(planesMejora.length);

                    // cantidad completados
                    setCantidadCompletados(planesMejora.filter((plan) => plan.estado === "concluido").length);

                    // cantidad en curso
                    setCantidadEnCurso(planesMejora.filter((plan) => plan.estado === "en proceso").length);
                });
        },
        [],
    );

    return (
        <>
            {/* Header */}
            <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12 flex justify-between">
                <div className="px-4 md:px-10">
                    <h1 className="text-4xl font-bold text-white">{estandar.n}</h1>
                    <p className="text-lg text-white">{estandar.titulo}</p>
                </div>
                <div className="flex w-full grow">
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <CardStats
                            statSubtitle="PLANES DE MEJORA"
                            statTitle={cantidadPlanesMejora === -1 ? "" : cantidadPlanesMejora.toString()}
                            statPercent=""
                            statDescripiron="Total de PMs"
                            statIconName="far fa-chart-bar"
                            statIconColor="bg-red-500"
                        />
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <CardStats
                            statSubtitle="COMPLETADOS"
                            statTitle={cantidadCompletados === -1 ? "" : cantidadCompletados.toString()}
                            statPercent={porcentajeCompletados}
                            statDescripiron="PM Completados"
                            statIconName="fas fa-chart-pie"
                            statIconColor="bg-orange-500"
                        />
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <CardStats
                            statSubtitle="EN CURSO"
                            statTitle={cantidadEnCurso === -1 ? "" : cantidadEnCurso.toString()}
                            statPercent={porcentajeEnCurso}
                            statDescripiron="PM en curso"
                            statIconName="fas fa-users"
                            statIconColor="bg-pink-500"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}