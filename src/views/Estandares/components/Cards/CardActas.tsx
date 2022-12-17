import {useHistory} from "react-router";
import React, {ChangeEventHandler, useEffect, useState} from "react";
import {SERVER_PATH} from "@/variables";
import "./CardNarrativas.css";
import {IframeActa} from "@/views/Estandares/components/Actas/IframeActa";

type ActaT = {
    id: number,
    descripcion: string,
    // Unix timestamp
    fecha: number,
    id_estandar: number,
}

type ActaProps = {
    acta: ActaT,
    eliminar: () => void,
    // Ruta configurada en el router. Ejm. "estandar8"
    pathNarrativa: string,
};
function Acta(props: ActaProps) {
    const history = useHistory();

    const redirigirEditarActa = () => history.push(`/admin/${props.pathNarrativa}/acta/editar/${props.acta.id}`);

    const eliminar = () => {
        const userToken = localStorage.getItem("access_token");
        fetch(`${SERVER_PATH}/api/acta/${props.acta.id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    props.eliminar();
                }
            });
    };

    const date = new Date(props.acta.fecha);

    return (
        <div className="contenedor-card-narrativa">
            <div className="card-narrativa_top">
                <div onClick={() => history.push(`/admin/${props.pathNarrativa}/acta/detalle/${props.acta.id}`)}>
                    <span className="card-narrativa_titulo">ACTAS</span>
                    <span className="card-narrativa_semestre">{date.getDay()}/{date.getMonth()}/{date.getFullYear()}</span>
                </div>

                <div style={{textAlign: "right"}}>
                    <button
                        className="bg-lightBlue-600 text-white active:bg-indigo-600 text-xs font-bold uppercase px-4 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={redirigirEditarActa}
                    >
                        Editar
                    </button>
                    <div
                        className="text-white p-1 mx-2 text-center inline-flex items-center justify-center w-6 h-6 shadow-lg rounded-full bg-red-500"
                        style={{cursor: "pointer"}}
                        onClick={eliminar}
                    >
                        <i className="fas fa-trash" />
                    </div>
                </div>
            </div>
            <hr />
            <br />
            <IframeActa html={props.acta.descripcion} />
        </div>
    );
}


type Props = {
    // Ruta configurada en el router. Ejm. "estandar8"
    pathActas: string,
    // Id del estandar, como este en la base de datos.
    idEstandar: number,
}
export default function CardActas(props: Props) {
    const history = useHistory();

    const [filtroFecha, setFiltroFecha] = useState(-1);
    const [actas, setActas] = useState<Array<ActaT>>([]);

    const redirigirCrearActa = () => history.push(`/admin/${props.pathActas}/acta/crear`);

    useEffect(() => {
        const userToken = localStorage.getItem("access_token");
        if (userToken === null) return;

        fetch(`${SERVER_PATH}/api/acta`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error();
                }

                return res.json();
            })
            .then((resp: {data: Array<ActaT>}) => {
                const actas = resp.data
                    .filter((x) => x.id_estandar === props.idEstandar)
                    .sort((x, y) => (x.fecha > y.fecha ? 1 : -1));

                setActas(actas);

                if (actas.length > 0) {
                    setFiltroFecha(actas[0].fecha);
                }
            })
            .catch(() => {});
    }, []);

    const eliminarActa = (acta: ActaT) => {
        const nuevasActas = actas.filter((x) => x.id !== acta.id);
        setActas(nuevasActas);
    };


    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded py-5">
            <div className="px-4 py-3 grid grid-cols-2" style={{gridTemplateColumns: "auto 16rem"}}>
                <div>
                    <h3 className="font-semibold text-base text-blueGray-700 inline-block px-2">
                            Filtros
                    </h3>
                    <FiltroFecha
                        values={actas}
                        initial={filtroFecha}
                        onChange={(nuevaFecha) => {
                            setFiltroFecha(nuevaFecha);
                        }}
                    />
                </div>
                <div className="relative w-full px-4 max-w-full text-right">
                    <button
                        className="bg-lightBlue-600 text-white active:bg-indigo-600 text-xs font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={redirigirCrearActa}
                    >
                            + Nueva Acta
                    </button>
                </div>
            </div>

            {/* Mostrar narrativa si existe */}
            {actas.length > 0 ? (
                <Acta
                    acta={actas[0]}
                    eliminar={() => eliminarActa(actas[0])}
                    pathNarrativa={props.pathActas}
                />
            ) : (
                <div className="relative flex flex-col justify-center items-center min-h-10 min-w-0 break-words bg-white w-full mb-6 rounded py-10"
                    style={{color: "#AEAEAE", fontSize: "24px"}}
                >
                    <i className="fa-brands fa-codepen my-2" style={ {fontSize: "5em"} } />
                    <h2>No se ha creado ninguna narrativa.</h2>
                </div>
            )}
        </div>
    );
}

function FiltroFecha(props: { initial: number, values: Array<ActaT>, onChange: (_: number) => void }) {
    const [selected, setSelected] = useState(-1);

    useEffect(() => {
        setSelected(props.initial);
    }, [props.initial]);

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (ev) => {
        const value = parseInt(ev.target.value, 10);
        props.onChange(value);
        setSelected(value);
    };

    const elements = props.values.map((acta) => {
        const date = new Date(acta.fecha);
        return (
            <option value={acta.fecha}>{date.getDay()}/{date.getMonth()}/{date.getFullYear()}</option>
        );
    });

    return (
        <span className="relative">
            <span className="block absolute -top-8 left-2 text-xs opacity-75 font-medium">Año</span>
            <select
                value={selected} onChange={handleChange} name="anio" id="filtro-anio"
                className="rounded-xl text-sm p-2 w-48"
            >
                {elements}
            </select>
        </span>
    );
}
