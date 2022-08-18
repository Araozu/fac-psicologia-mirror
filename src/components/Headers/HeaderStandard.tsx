import React, {useEffect, useMemo, useState} from "react";

// components
// @ts-ignore
import CardStats from "../Cards/CardStats.jsx";
import {SERVER_PATH} from "@/variables";
import {PlanMejoraServer} from "@/components/Cards/CardPlanesMejora";

/**
 * Devuelve que porcentaje de v2 es v1
 * ejm. porcentaje(4, 10) = 40%
 */
const porcentaje = (v1: number, v2: number) => Math.round((v1 / v2) * 100);

/**
 * Cuenta cuantos planes de mejora tienen como estado 'valor'
 * @param arr Array con planes de mejora
 * @param valor El estado de plan de mejora. Ejm: "concluido", "planificado"
 */
const filtrarYContarEstado = (arr: PlanMejoraServer[], valor: string): number => {
    const valorLowercase = valor.toLowerCase();
    return arr.filter((plan) => plan.estado.toLowerCase() === valorLowercase).length;
};

/**
 * Toma un array de planes de mejora, y devuelve:
 * - Cantidad de planes segun su estado
 * - Porcentaje de estos valores
 * @param planesMejora
 */
function useDatos(planesMejora: PlanMejoraServer[]) {
    const [cantidadPlanesMejora, setCantidadPlanesMejora] = useState(-1);
    const [cantidadConcluido, setCantidadConcluido] = useState(-1);
    const [cantidadEnProceso, setCantidadEnProceso] = useState(-1);
    const [cantidadProgramado, setCantidadProgramado] = useState(-1);
    const [cantidadReprogramado, setCantidadReprogramado] = useState(-1);
    const [cantidadPlanificado, setCantidadPlanificado] = useState(-1);

    useEffect(
        () => {
            setCantidadPlanesMejora(planesMejora.length);

            // cantidad concluido
            setCantidadConcluido(filtrarYContarEstado(planesMejora, "concluido"));

            // cantidad en proceso
            setCantidadEnProceso(filtrarYContarEstado(planesMejora, "en proceso"));

            // cantidad programado
            setCantidadProgramado(filtrarYContarEstado(planesMejora, "programado"));

            // cantidad reprogramado
            setCantidadReprogramado(filtrarYContarEstado(planesMejora, "reprogramado"));

            // cantidad planificado
            setCantidadPlanificado(filtrarYContarEstado(planesMejora, "planificado"));
        },
        [planesMejora],
    );

    const porcentajeConcluidos = useMemo(
        () => {
            if (cantidadPlanesMejora <= 0 || cantidadConcluido === -1) return "";
            return porcentaje(cantidadConcluido, cantidadPlanesMejora).toString();
        },
        [cantidadConcluido, cantidadPlanesMejora],
    );

    const porcentajeEnProceso = useMemo(
        () => {
            if (cantidadPlanesMejora <= 0 || cantidadEnProceso === -1) return "";
            return porcentaje(cantidadEnProceso, cantidadPlanesMejora).toString();
        },
        [cantidadEnProceso, cantidadPlanesMejora],
    );

    const porcentajeProgramado = useMemo(
        () => {
            if (cantidadPlanesMejora <= 0 || cantidadProgramado === -1) return "";
            return porcentaje(cantidadProgramado, cantidadPlanesMejora).toString();
        },
        [cantidadPlanesMejora, cantidadProgramado],
    );

    const porcentajeReprogramado = useMemo(
        () => {
            if (cantidadPlanesMejora <= 0 || cantidadReprogramado === -1) return "";
            return porcentaje(cantidadReprogramado, cantidadPlanesMejora).toString();
        },
        [cantidadPlanesMejora, cantidadReprogramado],
    );

    const porcentajePlanificado = useMemo(
        () => {
            if (cantidadPlanesMejora <= 0 || cantidadPlanificado === -1) return "";
            return porcentaje(cantidadPlanificado, cantidadPlanesMejora).toString();
        },
        [cantidadPlanesMejora, cantidadPlanificado],
    );

    return {
        porcentajeConcluidos,
        porcentajeEnProceso,
        porcentajeProgramado,
        porcentajeReprogramado,
        porcentajePlanificado,

        cantidadConcluido,
        cantidadEnProceso,
        cantidadProgramado,
        cantidadReprogramado,
        cantidadPlanificado,
    };
}

export default function HeaderStandard({estandar}: any) {
    const [planesMejora, setPlanesMejora] = useState<PlanMejoraServer[]>([]);

    const {
        porcentajeConcluidos,
        porcentajeEnProceso,
        porcentajeProgramado,
        porcentajeReprogramado,
        porcentajePlanificado,

        cantidadConcluido,
        cantidadEnProceso,
        cantidadProgramado,
        cantidadReprogramado,
        cantidadPlanificado,
    } = useDatos(planesMejora);


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
                    setPlanesMejora(planesMejora);
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
                            statSubtitle="CONCLUIDOS"
                            statTitle={cantidadConcluido === -1 ? "" : cantidadConcluido.toString()}
                            statPercent={porcentajeConcluidos}
                            statDescripiron="PM Completados"
                            statIconName="fas fa-chart-pie"
                            statIconColor="bg-orange-500"
                        />
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <CardStats
                            statSubtitle="EN PROCESO"
                            statTitle={cantidadEnProceso === -1 ? "" : cantidadEnProceso.toString()}
                            statPercent={porcentajeEnProceso}
                            statDescripiron="PM en curso"
                            statIconName="fas fa-users"
                            statIconColor="bg-pink-500"
                        />
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <CardStats
                            statSubtitle="PROGRAMADO"
                            statTitle={cantidadProgramado === -1 ? "" : cantidadProgramado.toString()}
                            statPercent={porcentajeProgramado}
                            statDescripiron="PM en curso"
                            statIconName="fas fa-users"
                            statIconColor="bg-pink-500"
                        />
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <CardStats
                            statSubtitle="REPROGRAMADO"
                            statTitle={cantidadReprogramado === -1 ? "" : cantidadReprogramado.toString()}
                            statPercent={porcentajeReprogramado}
                            statDescripiron="PM en curso"
                            statIconName="fas fa-users"
                            statIconColor="bg-pink-500"
                        />
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <CardStats
                            statSubtitle="PLANIFICADO"
                            statTitle={cantidadPlanificado === -1 ? "" : cantidadPlanificado.toString()}
                            statPercent={porcentajePlanificado}
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
