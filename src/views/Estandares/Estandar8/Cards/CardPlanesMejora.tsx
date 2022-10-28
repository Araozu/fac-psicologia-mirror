import React, {ChangeEventHandler, useEffect, useMemo, useState} from "react";
import {SERVER_PATH} from "@/variables";
import "@/assets/styles/CardPlanesMejora.css";
import {EstadoPlanMejora,PlanMejoraServer} from "@/views/Estandares/Estandar8/Cards/PlanMejora";
import {PlanMejora} from "@/views/Estandares/Estandar8/Cards/CardPlanesMejora/PlanMejora";
import Modal from "../../../../components/modals/Modal";
import CrearPM from "../Create/CrearPM";
import axios from "axios";
import lgif from "@/assets/img/loading-2.gif";


async function eliminarPlanMejoraDelServidor(codigo: number) {
    const userToken = localStorage.getItem("access_token");
    if (userToken === null) return;

    const response = await fetch(`${SERVER_PATH}/api/plan/${codigo}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`,
        },
    });
    return response.ok;
}

/**
 * Recupera todos los planes de mejora del servidor
 */
async function fetchTodosPlanMejora(): Promise<Array<PlanMejoraServer>> {
    const userToken = localStorage.getItem("access_token");
    if (userToken === null) throw new Error("CardPlanesMejora: Se intento recuperar planes sin usuario logeado");

    const raw = await fetch(`${SERVER_PATH}/api/plan`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`,
        },
    });
    const dataObj: { data: Array<PlanMejoraServer> } = await raw.json();
    return dataObj.data;
}


type CardPlanesMejoraProps = {
    /**
     * Una funcion que se usa para recuperar la lista de PM.
     *
     * Si no se pasa ninguna, la funcion por defecto recupera
     * todos los planes de mejora del servidor.
     */
    producerFn?: () => Promise<Array<PlanMejoraServer>>
}
export default function CardPlanesMejora(props: CardPlanesMejoraProps) {
    const [filtroCodigo, setFiltroCodigo] = useState("OM-");
    const [filtroEstado, setFiltroEstado] = useState<EstadoPlanMejora | "Todos">("Todos");
    const [filtroAnio, setFiltroAnio] = useState(-1);

    /**Modal configuration Asignar PM */
    const [showModalAsignar, setShowModalAsignar] = useState(false);
    const [isLoadingModal, setIsLoadingModal] = useState(false);

    const token = localStorage.getItem("access_token");

    const handleSumitForm = (value: any) => {

        setIsLoadingModal(true);
        axios.post(
            `${SERVER_PATH}/api/plan/asignar`, value,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            },
        ).then((res) => {
            setShowModalAsignar(false);
            setIsLoadingModal(false);
        });
    };

    /**FIN CONFIGURATION MODAL*/

    /** CONFIGURACION LOADING */
    const [isLoading, setIsLoading] = useState<boolean>(false);
    /** FIN CONFIGURACION LOADING */

    const [planesMejora, setPlanesMejora] = useState<Array<PlanMejoraServer>>([]);

    useEffect(() => {
        setIsLoading(true);
        (props.producerFn ?? fetchTodosPlanMejora)()
            .then((planesMejora: Array<PlanMejoraServer>) => {
                setPlanesMejora(planesMejora);
                setIsLoading(false);
            });
    }, []);

    const listaAnios = useMemo<Array<string>>(() => {
        const map: { [key: string]: boolean } = {};
        planesMejora.forEach((plan) => {
            map[plan.codigo.substring(6, 10)] = true;
        });
        return Object.keys(map);
    }, [planesMejora]);


    // Almacena el id de un PM que se desea eliminar. Si es null, no se quiere eliminar ningun PM.
    const [planAEliminar, setPlanAEliminar] = useState<number | null>(null);
    // Elimina un plan de mejora del state
    const eliminarPlanMejora = (planEliminar: PlanMejoraServer) => {
        setPlanAEliminar(planEliminar.id);
    };
    // Maneja el resultado del modal de eliminar
    const handleModalEliminar = async(result: "cancel" | "confirm") => {
        if (result === "cancel") {
            setPlanAEliminar(null);
        } else {
            const planEliminado = await eliminarPlanMejoraDelServidor(planAEliminar!);
            if (planEliminado) {
                setPlanesMejora((x) => x.filter((plan) => plan.id !== planAEliminar));
            }
            setPlanAEliminar(null);
        }
    };

    const planesMejoraEls = useMemo(
        () => planesMejora
            .filter((plan) => {
                const contieneCodigoPlan = plan.codigo.indexOf(filtroCodigo) !== -1;
                const contieneAnio = filtroAnio === -1 || plan.codigo.indexOf(filtroAnio.toString()) !== -1;
                const contieneEstado = filtroEstado === "Todos" || plan.estado === filtroEstado;

                return contieneCodigoPlan && contieneAnio && contieneEstado;
            })
            .map((plan, i) => <PlanMejora plan={plan} key={i} eliminar={() => eliminarPlanMejora(plan)} />),
        [filtroCodigo, filtroAnio, filtroEstado, planesMejora, planesMejora],
    );

    const rol = localStorage.getItem("ROL");

    // Si esta cargando devuelve el icono de carga
    if (isLoading) return (
        <div className="relative flex flex-col justify-center items-center min-h-10 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded py-5">
            <img src={lgif} alt="Loading data gif" className="loading-gif" />
        </div>
    );

    // SI NO HAY NINGUN PLAN DE MEJORA
    if (planesMejora.length === 0) return (
        <div className="relative flex flex-col justify-center items-center min-h-10 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded py-10"
            style={{color: "#AEAEAE", fontSize: "24px"}}
        >
            <i className="fa-brands fa-codepen my-2" style={ {fontSize: "5em"} } />
            {window.location.pathname.includes("estandar8") ? <h2>No hay planes de mejora creados</h2> : <h2>No tienes ningun plan de mejora asignado</h2>}
            {(rol?.toLowerCase() === "admin" && window.location.pathname.includes("estandar8")) &&
                <>
                    <p>Puedes empezar asignando un plan de mejora</p>
                    <button
                        className="bg-lightBlue-600 text-white active:bg-indigo-600 text-xs font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                        // h.push("/admin/estandar8/plan-mejora/crear");
                            setShowModalAsignar(true);
                            setIsLoadingModal(false);
                        }}
                    >
                        <i className="fa-solid fa-plus" /> Asignar PM
                    </button>
                </>
            }
        </div>
    );

    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded py-5">
            <div className="rounded-t mb-0 px-4 py-3 border-0 grid grid-cols-2"
                style={{gridTemplateColumns: "auto 12rem"}}
            >
                <div className="relative w-full max-w-full">
                    <h5 className="font-semibold text-sm text-blueGray-700 inline-block px-2">
                        Filtros
                    </h5>
                    <FiltroInput onChange={setFiltroCodigo} />
                    <FiltroAnio listaAnios={listaAnios} onChange={setFiltroAnio} />
                    <FiltroEstado onChange={setFiltroEstado} />
                </div>
                {
                    (rol?.toLowerCase() === "admin" && window.location.pathname.includes("estandar8")) && (
                        <div className="relative w-full px-4 max-w-full text-right">
                            <button
                                className="bg-lightBlue-600 text-white active:bg-indigo-600 text-xs font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                // h.push("/admin/estandar8/plan-mejora/crear");
                                    setShowModalAsignar(true);
                                    setIsLoadingModal(false);
                                }}
                            >
                                <i className="fa-solid fa-plus" /> Asignar PM
                            </button>
                        </div>
                    )
                }
            </div>
            <div className="block w-full">
                {/* Projects table */}
                <table className="w-full bg-transparent border-collapse table-auto">
                    <thead className="bg-blueGray-50 text-blueGray-500 text-left">
                        <tr>
                            <th className="px-6 align-middle py-3 text-xs uppercase font-semibold" style={{width: "6rem"}}>
                            Codigo
                            </th>
                            <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                            Estándar
                            </th>
                            <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                            Asignado a
                            </th>
                            <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                            Avance (%)
                            </th>
                            <th className="px-6 align-middle py-3 text-xs uppercase font-semibold" style={{width: "10rem"}}>
                            Estado
                            </th>
                            <td />
                            <td />
                        </tr>
                    </thead>
                    <tbody>
                        {planesMejoraEls}
                    </tbody>
                </table>
            </div>

            {/* Modal de asignacion de PM */}
            <Modal type='cancel' show={showModalAsignar} title="Asignar Plan de Mejora" onClose={(val:string) => {
                setShowModalAsignar(false);
            }}
            >
                {isLoadingModal
                    ? (
                        <div className="w-full h-full flex justify-content-center align-items-center">
                            <i className="fa-solid fa-spinner fa-spin-pulse fa-xl" />
                        </div>
                    )
                    : <CrearPM handleSubmit={handleSumitForm} />
                }
            </Modal>

            {/* Modal de confirmar eliminacion */}
            <Modal type="confirm" show={planAEliminar !== null} title="" onClose={handleModalEliminar}>
                <div style={{textAlign: "center"}}>
                    <i className="fas fa-solid fa-triangle-exclamation" style={{
                        fontSize: "4rem",
                        color: "#f24e1e",
                    }}
                    />
                    <br />
                    <br />
                    <div style={{
                        color: "#f24e1e",
                        fontWeight: "bold",
                    }}
                    >
                        ¿Esta seguro que desea eliminar?
                    </div>
                    <div>Esta acción no es reversible, confirme si está seguro</div>
                </div>
            </Modal>
        </div>
    );
}

function FiltroInput(props: { onChange: (_: string) => void }) {
    const [value, setValue] = useState("OM-");

    const handleChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
        let v = ev.target.value;
        if (!v.startsWith("OM-")) {
            v = "OM-";
        }
        setValue(v);
        props.onChange(v);
    };

    return (
        <span className="relative" style={ {paddingRight: "0.3em"} }>
            <span className="block absolute -top-8 left-4 text-xs opacity-75 font-medium">Codigo</span>
            <input value={value} onChange={handleChange} type="text" id="codigo-input"
                className="rounded-xl text-sm p-2 w-48"
            />
        </span>
    );
}

function FiltroEstado(props: { onChange: (_: EstadoPlanMejora | "Todos") => void }) {
    const [selected, setSelected] = useState<EstadoPlanMejora | "Todos">("Todos");

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (ev) => {
        const value = ev.target.value as EstadoPlanMejora | "Todos";
        props.onChange(value);
        setSelected(value);
    };

    return (
        <span className="relative" style={ {paddingRight: "0.3em"} }>
            <span className="block absolute -top-8 left-2 text-xs opacity-75 font-medium">Estado</span>
            <select value={selected} onChange={handleChange} name="estado" id="filtro-estado"
                className="rounded-xl text-sm p-2 w-48"
            >
                <option value="Todos">Todos</option>
                <option value="En proceso">En Proceso</option>
                <option value="Concluido">Concluido</option>
                <option value="Programado">Programado</option>
                <option value="Reprogramado">Reprogramado</option>
                <option value="Planificado">Planificado</option>
            </select>
        </span>
    );
}

function FiltroAnio(props: { listaAnios: Array<string>, onChange: (_: number) => void }) {
    const [selected, setSelected] = useState(-1);

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (ev) => {
        const value = parseInt(ev.target.value, 10);
        props.onChange(value);
        setSelected(value);
    };

    const opciones = props.listaAnios.map((x, i) => <option value={x} key={i}>{x}</option>);

    return (
        <span className="relative" style={ {paddingRight: "0.3em"} }>
            <span className="block absolute -top-8 left-2 text-xs opacity-75 font-medium">Año</span>
            <select value={selected} onChange={handleChange} name="anio" id="filtro-anio"
                className="rounded-xl text-sm p-2 w-48"
            >
                <option value="-1">Todos</option>
                {opciones}
            </select>
        </span>
    );
}

function FiltroEstandar(props: { onChange: (_: number) => void }) {
    const [selected, setSelected] = useState(8);

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (ev) => {
        const value = parseInt(ev.target.value, 10);
        props.onChange(value);
        setSelected(value);
    };

    return (
        <span className="relative" style={ {paddingRight: "0.3em"} }>
            <span className="block absolute -top-8 left-4 text-xs opacity-75 font-medium">Estandar</span>
            <select
                value={selected}
                onChange={handleChange}
                name="estado"
                id="filtro-estado"
                className="rounded-xl text-sm p-2 w-48"
            >
                <option value={8}>Estandar 8</option>
            </select>
        </span>
    );
}
