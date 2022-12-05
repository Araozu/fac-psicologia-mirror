import CardStats from "@/components/Cards/CardStats";
import React, {useEffect, useMemo, useState} from "react";
import {PlanMejoraServer} from "@/views/Estandares/components/PlanMejora";
import {SERVER_PATH} from "@/variables";
import {useHistory} from "react-router-dom";

type Props = {
    /**
     * Iniciales del estandar por el cual filtrar.
     *
     * Ejm: "E-1"
     */
    nombreEstandar: string,
}
export default function CardIndicadores(props: Props) {
    const {nombreEstandar} = props;

    const [planesMejora, setPlanesMejora] = useState<PlanMejoraServer[]>([]);
    const history = useHistory();

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
                .then((obj) => {
                    // Si se tiene error 401 eliminar token de localStorage y reiniciar
                    // TODO: Centralizar funcionalidad
                    if (!obj.ok && obj.status === 401) {
                        localStorage.removeItem("access_token");
                        history.replace("/auth/");
                    }

                    return obj.json();
                })
                .then((objF: { data: Array<PlanMejoraServer> }) => {
                    const planesMejora = objF.data;
                    if (nombreEstandar === "E-8") {
                        setPlanesMejora(planesMejora);
                    } else {
                        // Filtrar en las otras paginas
                        setPlanesMejora(planesMejora.filter((x) => x.estandar_name.startsWith(nombreEstandar)));
                    }
                })
                .catch((err) => {
                    console.log("Error: HeaderStandard");
                    console.log(err);
                });
        },
        [],
    );

    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <h2 className="font-medium text-xl m-4">Planes de mejora</h2>
            <div className="grid" style={{gridTemplateColumns: "repeat(5, 1fr)"}}>
                <div className="w-full px-2">
                    <CardStats
                        statSubtitle="CONCLUIDOS"
                        statTitle={cantidadConcluido === -1 ? "" : cantidadConcluido.toString()}
                        statPercent={porcentajeConcluidos}
                        statDescripiron="de Planes"
                        statIconName="fas fa-check"
                        statIconColor="bg-emerald-500"
                    />
                </div>
                <div className="w-full px-2">
                    <CardStats
                        statSubtitle="EN PROCESO"
                        statTitle={cantidadEnProceso === -1 ? "" : cantidadEnProceso.toString()}
                        statPercent={porcentajeEnProceso}
                        statDescripiron="de Planes"
                        statIconName="fas fa-spinner"
                        statIconColor="bg-cyan-500"
                    />
                </div>
                <div className="w-full px-2">
                    <CardStats
                        statSubtitle="PROGRAMADO"
                        statTitle={cantidadProgramado === -1 ? "" : cantidadProgramado.toString()}
                        statPercent={porcentajeProgramado}
                        statDescripiron="de Planes"
                        statIconName="fas fa-calendar-check"
                        statIconColor="bg-indigo-500"
                    />
                </div>
                <div className="w-full px-2">
                    <CardStats
                        statSubtitle="REPROGRAMADO"
                        statTitle={cantidadReprogramado === -1 ? "" : cantidadReprogramado.toString()}
                        statPercent={porcentajeReprogramado}
                        statDescripiron="de Planes"
                        statIconName="fas fa-clock-rotate-left"
                        statIconColor="bg-orange-500"
                    />
                </div>
                <div className="w-full pl-2 pr-4">
                    <CardStats
                        statSubtitle="PLANIFICADO"
                        statTitle={cantidadPlanificado === -1 ? "" : cantidadPlanificado.toString()}
                        statPercent={porcentajePlanificado}
                        statDescripiron="de Planes"
                        statIconName="fas fa-clock"
                        statIconColor="bg-pink-500"
                    />
                </div>
            </div>
            <div className="">&nbsp;</div>
        </div>
    );
}


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
    return arr.filter((plan) => plan.estado?.toLowerCase() === valorLowercase).length;
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
            if (cantidadPlanesMejora === 0) return "0";
            else if (cantidadPlanesMejora === -1 || cantidadConcluido === -1) return "";
            return porcentaje(cantidadConcluido, cantidadPlanesMejora).toString();
        },
        [cantidadConcluido, cantidadPlanesMejora],
    );

    const porcentajeEnProceso = useMemo(
        () => {
            if (cantidadPlanesMejora === 0) return "0";
            else if (cantidadPlanesMejora <= 0 || cantidadEnProceso === -1) return "";
            return porcentaje(cantidadEnProceso, cantidadPlanesMejora).toString();
        },
        [cantidadEnProceso, cantidadPlanesMejora],
    );

    const porcentajeProgramado = useMemo(
        () => {
            if (cantidadPlanesMejora === 0) return "0";
            else if (cantidadPlanesMejora <= 0 || cantidadProgramado === -1) return "";
            return porcentaje(cantidadProgramado, cantidadPlanesMejora).toString();
        },
        [cantidadPlanesMejora, cantidadProgramado],
    );

    const porcentajeReprogramado = useMemo(
        () => {
            if (cantidadPlanesMejora === 0) return "0";
            else if (cantidadPlanesMejora <= 0 || cantidadReprogramado === -1) return "";
            return porcentaje(cantidadReprogramado, cantidadPlanesMejora).toString();
        },
        [cantidadPlanesMejora, cantidadReprogramado],
    );

    const porcentajePlanificado = useMemo(
        () => {
            if (cantidadPlanesMejora === 0) return "0";
            else if (cantidadPlanesMejora <= 0 || cantidadPlanificado === -1) return "";
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

