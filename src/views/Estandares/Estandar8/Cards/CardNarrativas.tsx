import {useHistory} from "react-router";
import React, {ChangeEventHandler, useEffect, useState, useMemo} from "react";
import {SERVER_PATH} from "@/variables";
import {DataNarrativaServer} from "@/views/Estandares/Estandar8/Narrativa/DetalleNarrativa";
import "./CardNarrativas.css";

type Semestre = "Todos" | "A" | "B" | "C";

function Narrativa(props: {narrativa: DataNarrativaServer, eliminar: () => void}) {
    const history = useHistory();
    const iframeRef = React.createRef<HTMLIFrameElement>();

    useEffect(() => {
        iframeRef.current?.contentDocument?.write(props.narrativa.contenido);
    }, []);

    const redirigirEditarNarrativa = () => history.push(`/admin/estandar8/narrativa/editar/${props.narrativa.id}`);

    const eliminar = () => {
        const userToken = localStorage.getItem("access_token");
        fetch(`${SERVER_PATH}/api/narrativa/${props.narrativa.id}`, {
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

    return (
        <div className="contenedor-card-narrativa">
            <div className="card-narrativa_top">
                <div>
                    <span className="card-narrativa_titulo">NARRATIVA</span>
                    <span className="card-narrativa_semestre">{props.narrativa.semestre}</span>
                </div>

                <div style={{textAlign: "right"}}>
                    <button
                        className="bg-lightBlue-600 text-white active:bg-indigo-600 text-xs font-bold uppercase px-4 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={redirigirEditarNarrativa}
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
            <iframe style={{width: "100%"}} ref={iframeRef} />
        </div>
    );
}

export default function CardNarrativas() {
    const history = useHistory();

    const [filtroAnio, setFiltroAnio] = useState(-1);
    const [filtroSemestre, setFiltroSemestre] = useState<Semestre>("Todos");
    const [narrativas, setNarrativas] = useState<Array<DataNarrativaServer>>([]);

    const redirigirCrearNarrativa = () => history.push("/admin/estandar8/narrativa/crear");

    useEffect(() => {
        const userToken = localStorage.getItem("access_token");
        if (userToken === null) return;

        fetch(`${SERVER_PATH}/api/narrativa`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`,
            },
        })
            .then((obj) => obj.json())
            .then((resp) => {
                setNarrativas(resp.data);
            });
    }, []);

    // Elimina narrativa del state
    const eliminarNarrativa = (narrativaAEliminar: DataNarrativaServer) => {
        setNarrativas((x) => x.filter((narrativa) => narrativa.id !== narrativaAEliminar.id));
    };

    const narrativasEls = narrativas
        .filter((narrativa) => {
            const contieneAnio = filtroAnio === -1 || narrativa.semestre.indexOf(filtroAnio.toString()) !== -1;
            const contieneSemestre = filtroSemestre !== "Todos" || narrativa.semestre.indexOf(filtroSemestre) !== 1;

            return contieneAnio && contieneSemestre;
        })
        .map((narrativa, i) => (
            <Narrativa narrativa={narrativa} key={i} eliminar={() => eliminarNarrativa(narrativa)} />
        ));

    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded py-5">
            <div className="px-4 py-3 grid grid-cols-2" style={{gridTemplateColumns: "auto 16rem"}}>
                <div>
                    <h3 className="font-semibold text-base text-blueGray-700 inline-block px-2">
                            Filtros
                    </h3>
                    <FiltroAnio onChange={setFiltroAnio} />
                    <FiltroSemestre onChange={setFiltroSemestre} />
                </div>
                <div className="relative w-full px-4 max-w-full text-right">
                    <button
                        className="bg-lightBlue-600 text-white active:bg-indigo-600 text-xs font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={redirigirCrearNarrativa}
                    >
                            + Nueva Narrativa
                    </button>
                </div>
            </div>

            {narrativasEls}
        </div>
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
            <select
                value={selected} onChange={handleChange} name="anio" id="filtro-anio"
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

function FiltroSemestre(props: { onChange: (_: Semestre) => void }) {
    const [selected, setSelected] = useState<Semestre>("Todos");

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (ev) => {
        const value = ev.target.value as Semestre;
        props.onChange(value);
        setSelected(value);
    };

    return (
        <span className="relative">
            <span className="block absolute -top-8 left-2 text-xs opacity-75 font-medium">Semestre</span>
            <select
                value={selected} onChange={handleChange} name="anio" id="filtro-anio"
                className="rounded-xl text-sm p-2 w-48"
            >
                <option value="Todos">Todos</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>
        </span>
    );
}
