import {useHistory} from "react-router";
import {ChangeEventHandler, useEffect, useMemo, useState} from "react";
import {SERVER_PATH} from "@/variables";
import "@/assets/styles/CardPlanesMejora.css";
import {PlanMejoraDropdown} from "@/components/Dropdowns/PlanMejoraDropdown";

enum EstadoPlanMejora {
    EnProceso,
    Concluido,
    Programado,
    Reprogramado,
    Planificado,
}

interface PlanMejoraData {
    id: number,
    codigo: string,
    estandar: number,
    responsable: string,
    /** Se asume que siempre es un entero entre 0 y 100 */
    avance: number,
    estado: EstadoPlanMejora,
    estandar_name: string,
}

export interface PlanMejoraServer {
    avance: number,
    codigo: string,
    estado: string,
    estandar_name: string,
    id: number,
    user_name: string,
}

function planMejoraServerToData(plan: PlanMejoraServer): PlanMejoraData {
    let estadoPlan: EstadoPlanMejora;
    switch (plan.estado) {
        case "Planificado": {
            estadoPlan = EstadoPlanMejora.Planificado;
            break;
        }
        case "Programado": {
            estadoPlan = EstadoPlanMejora.Programado;
            break;
        }
        case "Reprogramado": {
            estadoPlan = EstadoPlanMejora.Reprogramado;
            break;
        }
        case "En proceso": {
            estadoPlan = EstadoPlanMejora.EnProceso;
            break;
        }
        case "Concluido": {
            estadoPlan = EstadoPlanMejora.Concluido;
            break;
        }
        default: {
            console.error("Error al convertir datos del servidor a enum PlanMejoraServer (CardPlanesMejora.tsx)");
            console.error("Valor recibido:", plan.estado);
            console.error(plan);
            estadoPlan = EstadoPlanMejora.Programado;
        }
    }

    const codigoPlan = plan.codigo.startsWith("OM-") ? plan.codigo : `OM-${plan.codigo}`;

    return {
        id: plan.id,
        codigo: codigoPlan,
        estandar: 8,
        responsable: plan.user_name,
        avance: plan.avance,
        estado: estadoPlan,
        estandar_name: plan.estandar_name,
    };
}

function estadoPlanMejoraToString(estado: EstadoPlanMejora): string {
    switch (estado) {
        case EstadoPlanMejora.Reprogramado:
            return "Reprogramado";
        case EstadoPlanMejora.Programado:
            return "Programado";
        case EstadoPlanMejora.Planificado:
            return "Planificado";
        case EstadoPlanMejora.Concluido:
            return "Concluido";
        case EstadoPlanMejora.EnProceso:
            return "En Proceso";
        default:
            return "";
    }
}

function estadoPlanMejoraToColor(estado: EstadoPlanMejora): [string, string] {
    switch (estado) {
        case EstadoPlanMejora.EnProceso:
            return ["#ef4444", "#FECACA"];
        case EstadoPlanMejora.Concluido:
            return ["#10B981", "#68d7b2"];
        case EstadoPlanMejora.Programado:
            return ["#FF8F0C", "#F7C78E"];
        case EstadoPlanMejora.Planificado:
            return ["#0f8dc4", "#25BAFA"];
        case EstadoPlanMejora.Reprogramado:
            return ["#F3F80C", "#FCFDB7"];
        default:
            return ["red", "blue"];
    }
}


function PlanMejora(props: { plan: PlanMejoraData, eliminar: () => void }) {
    const history = useHistory();
    const [colorFondo1, colorFondo2] = estadoPlanMejoraToColor(props.plan.estado);


    const redirectToDetail = (id: number) => {
        // TODO: Colocar todas las rutas en un objeto global, y referenciarlas
        //  para hacer redireccion
        const path = `/admin/estandar8/plan-mejora/detalle/${id}`;
        history.push(path);
    };

    return (
        <tr onClick={(e) => {
            e.preventDefault();
            redirectToDetail(props.plan.id);
        }} className="table-row"
        >
            <th className="px-6 text-xs whitespace-nowrap p-4 text-left">
                {props.plan.codigo}
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {props.plan.estandar_name}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {props.plan.responsable}
            </td>

            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <div className="grid" style={{gridTemplateColumns: "2.5rem auto"}}>
                    <span>{props.plan.avance}%</span>

                    <div className="relative w-full inline-block py-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded"
                            style={{backgroundColor: colorFondo2}}
                        >
                            <div
                                style={{
                                    width: `${props.plan.avance}%`,
                                    backgroundColor: colorFondo1,
                                }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                            />
                        </div>
                    </div>
                </div>
            </td>

            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <i className="fas fa-circle mr-4" style={{color: colorFondo1}} />
                {estadoPlanMejoraToString(props.plan.estado)}
            </td>

            <td onClick={(e) => e.stopPropagation()} style={{position: "relative"}}>
                <PlanMejoraDropdown codigo={props.plan.id.toString()} eliminar={props.eliminar} />
                {/*
                <i className="fa-solid fa-ellipsis-vertical py-2 px-4 cursor-pointer" />
                */}
            </td>
        </tr>
    );
}

export default function CardPlanesMejora() {
    const h = useHistory();
    const [filtroCodigo, setFiltroCodigo] = useState("OM-");
    const [filtroEstado, setFiltroEstado] = useState(-1);
    const [filtroAnio, setFiltroAnio] = useState(-1);

    const [planesMejora, setPlanesMejora] = useState<Array<PlanMejoraData>>([]);

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
                    const planesMejora = objF.data.map((x) => planMejoraServerToData(x));

                    setPlanesMejora(planesMejora);
                });
        },
        [],
    );

    // Elimina un plan de mejora del state
    const eliminarPlanMejora = (planEliminar: PlanMejoraData) => {
        setPlanesMejora((x) => x.filter((plan) => plan.id !== planEliminar.id));
    };

    const planesMejoraEls = useMemo(
        () => planesMejora
            .filter((plan) => {
                const contieneCodigoPlan = plan.codigo.indexOf(filtroCodigo) !== -1;
                const contieneAnio = filtroAnio === -1 || plan.codigo.indexOf(filtroAnio.toString()) !== -1;
                const contieneEstado = filtroEstado === -1 || plan.estado === filtroEstado;

                return contieneCodigoPlan && contieneAnio && contieneEstado;
            })
            .map((plan, i) => <PlanMejora plan={plan} key={i} eliminar={() => eliminarPlanMejora(plan)} />),
        [filtroCodigo, filtroAnio, filtroEstado, planesMejora],
    );

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded py-5">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="grid grid-cols-2" style={{gridTemplateColumns: "auto 12rem"}}>
                        <div className="relative w-full max-w-full">
                            <h3 className="font-semibold text-base text-blueGray-700 inline-block px-2">
                                Filtros
                            </h3>
                            <FiltroInput onChange={setFiltroCodigo} />
                            <FiltroAnio onChange={setFiltroAnio} />
                            <FiltroEstado onChange={setFiltroEstado} />
                        </div>
                        <div className="relative w-full px-4 max-w-full text-right">
                            <button
                                className="bg-lightBlue-600 text-white active:bg-indigo-600 text-xs font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                    h.push("/admin/estandar8/plan-mejora/crear");
                                }}
                            >
                                + Nuevo PM
                            </button>
                        </div>
                    </div>
                </div>
                <div className="block w-full">
                    {/* Projects table */}
                    <table className="w-full bg-transparent border-collapse table-auto">
                        <thead className="bg-blueGray-50 text-blueGray-500 text-left">
                            <tr>
                                <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                                Codigo
                                </th>
                                <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                                Estándar
                                </th>
                                <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                                Creador
                                </th>
                                <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                                Avance (%)
                                </th>
                                <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                                Estado
                                </th>
                                <td />
                            </tr>
                        </thead>
                        <tbody>
                            {planesMejoraEls}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
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
        <span className="relative px-2">
            <span className="block absolute -top-8 left-4 text-xs opacity-75 font-medium">Codigo</span>
            <input value={value} onChange={handleChange} type="text" id="codigo-input"
                className="rounded-xl text-sm p-2 w-48"
            />
        </span>
    );
}

function FiltroEstado(props: { onChange: (_: number) => void }) {
    const [selected, setSelected] = useState(-1);

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (ev) => {
        const value = parseInt(ev.target.value, 10);
        props.onChange(value);
        setSelected(value);
    };

    return (
        <span className="relative">
            <span className="block absolute -top-8 left-2 text-xs opacity-75 font-medium">Estado</span>
            <select value={selected} onChange={handleChange} name="estado" id="filtro-estado"
                className="rounded-xl text-sm p-2 w-48"
            >
                <option value="-1">Todos</option>
                <option value="0">En Proceso</option>
                <option value="1">Concluido</option>
                <option value="2">Programado</option>
                <option value="3">Reprogramado</option>
                <option value="4">Planificado</option>
            </select>
        </span>
    );
}

function FiltroAnio(props: { onChange: (_: number) => void }) {
    const [selected, setSelected] = useState(-1);

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (ev) => {
        const value = parseInt(ev.target.value, 10);
        props.onChange(value);
        setSelected(value);
    };

    return (
        <span className="relative">
            <span className="block absolute -top-8 left-2 text-xs opacity-75 font-medium">Año</span>
            <select value={selected} onChange={handleChange} name="anio" id="filtro-anio"
                className="rounded-xl text-sm p-2 w-48"
            >
                <option value="-1">Todos</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
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
        <span className="relative px-2">
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
