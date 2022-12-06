import React, {useEffect, useMemo, useState} from "react";

// components
import {SERVER_PATH} from "@/variables";
import {PlanMejoraServer} from "@/views/Estandares/components/PlanMejora";
import {useHistory} from "react-router-dom";
import "./HeaderStandard.css";

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
            if (cantidadPlanesMejora <= 0 || cantidadConcluido === -1) return "";
            return porcentaje(cantidadConcluido, cantidadPlanesMejora)
                .toString();
        },
        [cantidadConcluido, cantidadPlanesMejora],
    );

    const porcentajeEnProceso = useMemo(
        () => {
            if (cantidadPlanesMejora <= 0 || cantidadEnProceso === -1) return "";
            return porcentaje(cantidadEnProceso, cantidadPlanesMejora)
                .toString();
        },
        [cantidadEnProceso, cantidadPlanesMejora],
    );

    const porcentajeProgramado = useMemo(
        () => {
            if (cantidadPlanesMejora <= 0 || cantidadProgramado === -1) return "";
            return porcentaje(cantidadProgramado, cantidadPlanesMejora)
                .toString();
        },
        [cantidadPlanesMejora, cantidadProgramado],
    );

    const porcentajeReprogramado = useMemo(
        () => {
            if (cantidadPlanesMejora <= 0 || cantidadReprogramado === -1) return "";
            return porcentaje(cantidadReprogramado, cantidadPlanesMejora)
                .toString();
        },
        [cantidadPlanesMejora, cantidadReprogramado],
    );

    const porcentajePlanificado = useMemo(
        () => {
            if (cantidadPlanesMejora <= 0 || cantidadPlanificado === -1) return "";
            return porcentaje(cantidadPlanificado, cantidadPlanesMejora)
                .toString();
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

export default function HeaderStandard(props: { titulo: string, descripcion: string, icono?: string, estandar: number }) {
    const [planesMejora, setPlanesMejora] = useState<PlanMejoraServer[]>([]);
    const history = useHistory();
    const [cabecera, setCabecera] = useState<string>("Cargando cabecera...");
    const [isEditingCabecera, setIdEditingCabecera] = useState<boolean>(false);
    const [isManager, setIsManager] = useState<boolean>(false);
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
                    if (!obj.ok && obj.status === 401) {
                        localStorage.removeItem("access_token");
                        history.replace("/auth/");
                    }

                    return obj.json();
                })
                .then((objF: { data: Array<PlanMejoraServer> }) => {
                    const planesMejora = objF.data;
                    setPlanesMejora(planesMejora);
                })
                .catch((err) => {
                    console.log("Error: HeaderStandard");
                    console.log(err);
                });
        },
        [],
    );

    useEffect(() => {
        const userToken = localStorage.getItem("access_token");
        if (userToken === null) return;
        fetch(`${SERVER_PATH}/api/estandar/${props.estandar}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`,
            },
        })
            .then((res: any) => res.json())
            .then((res: { data: { cabecera: string } }) => {
                //trae data
                setIsManager(res.data.esEncargado);
                setCabecera(res.data.cabecera);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const updateCabecera = () => {
        const cabeceraText = document.getElementById("cabecera-input");
        const userToken = localStorage.getItem("access_token");
        if (isEditingCabecera) {

            const data = {
                "name": "E-8 PLANES DE MEJORA",
                "cabecera": cabecera,
                "id_user": 5,
            };
            fetch(`${SERVER_PATH}/api/estandar/${props.estandar}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`,
                },
                body: JSON.stringify(data),
            })
                .then((res: any) => res.json())
                .then((res: { data: { cabecera: string } }) => {
//                    console.log("cabecera",res.data.cabecera);
                    setCabecera(res.data.cabecera);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const [message, setMessage] = useState("");

    const handleMessageChange = (event: any) => {
        // 👇️ access textarea value
        setMessage(event.target.value);
        setCabecera(event.target.value);
    };
    //console.log(isManager);

    return (
        <>
            {/* Header */}
            <div className="relative bg-lightBlue-600 flex flex-wrap justify-start"
                 style={{
                     paddingBottom: "2em",
                     paddingTop: "2em",
                 }}
            >

                <div className="px-4 md:pl-10 md:pr-4">
                    {props.icono
                        ? <i className={`fa-regular ${props.icono} mr-1 text-5xl text-white`}/>
                        : <></>
                    }
                    <h1 className="text-4xl font-bold text-white">{props.titulo}</h1>
                    <p className="text-lg text-white">{props.descripcion}</p>

                </div>
                <div>
                    <div className="w-full p-2" style={{
                        textAlign: "left",
                        backgroundColor: "white",
                        marginLeft: "5em",
                        borderRadius: "0.5em",
                    }}>
                        <div className="flex justify-start mb-2">
                            <h2 className="text-xl font-bold mr-2">CABECERAs</h2>
                            {isManager &&
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-xs px-4 rounded-full"
                                        onClick={() => {
                                            updateCabecera();
                                            setIdEditingCabecera(!isEditingCabecera);
                                        }}
                                > {isEditingCabecera ? "Guardar" : "Editar cabecera"}
                                </button>}
                        </div>
                        <textarea onChange={handleMessageChange} id="cabecera-input" style={{width: "100%"}}
                                  disabled={!isEditingCabecera} value={cabecera}
                                  className={isEditingCabecera ? "header editable-header" : "header"}/>
                    </div>
                </div>
            </div>
        </>
    );
}
