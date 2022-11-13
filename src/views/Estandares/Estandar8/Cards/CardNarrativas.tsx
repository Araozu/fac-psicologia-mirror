import {useHistory} from "react-router";
import React, {ChangeEventHandler, useEffect, useState, useMemo} from "react";
import {SERVER_PATH} from "@/variables";
import {DataNarrativaServer} from "@/views/Estandares/Estandar8/Narrativa/DetalleNarrativa";
import "./CardNarrativas.css";

type Semestre = "A" | "B";

function Narrativa(props: {narrativa: DataNarrativaServer, eliminar: () => void}) {
    const history = useHistory();

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
                <div onClick={() => history.push(`/admin/estandar8/narrativa/detalle/${props.narrativa.id}`)}>
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
            <div dangerouslySetInnerHTML={{__html: props.narrativa.contenido}} />
        </div>
    );
}

type AlmacenNarrativas = Map<number, Map<string, DataNarrativaServer>>;

function revisarSemestre(narrativas: AlmacenNarrativas, nuevoAnio: number, semestreActual: Semestre): Semestre {
    const mapAnio = narrativas.get(nuevoAnio)!;
    if (mapAnio.has(semestreActual)) {
        return semestreActual;
    } else {
        return [...mapAnio.keys()][0] as Semestre;
    }
}

export default function CardNarrativas() {
    const history = useHistory();

    const [filtroAnio, setFiltroAnio] = useState(-1);
    const [filtroSemestre, setFiltroSemestre] = useState<Semestre>("A");
    const [narrativas, setNarrativas] = useState<AlmacenNarrativas>(new Map());

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
                const narrativas: Array<DataNarrativaServer> = resp.data;
                const almacenNarrativas: AlmacenNarrativas = new Map();

                narrativas.forEach((narrativa) => {
                    const result = /(20\d\d)-([AB])/.exec(narrativa.semestre);
                    if (result === null) {
                        console.error(`Error extrayendo valores de narrativa, semestre: ${narrativa.semestre}`);
                        return;
                    }
                    const numAnio = parseInt(result[1], 10);
                    const letraSemestre = result[2];

                    if (!almacenNarrativas.has(numAnio)) {
                        almacenNarrativas.set(numAnio, new Map());
                    }

                    const narrativasAnio = almacenNarrativas.get(numAnio)!;

                    // Solo deberia existir 1 narrativa por semestre, asi que esto es seguro
                    narrativasAnio.set(letraSemestre, narrativa);
                });

                // Obtener los valores iniciales
                const anioMayor = [0, ...almacenNarrativas.keys()]
                    .reduce((previous, current) => (previous < current ? current : previous));
                setFiltroAnio(anioMayor);
                const semestreMayor = [...almacenNarrativas.get(anioMayor)!.keys()]
                    .sort()
                    .pop()! as "A" | "B";
                setFiltroSemestre(semestreMayor);

                setNarrativas(almacenNarrativas);
            });
    }, []);

    // Elimina narrativa del state
    const eliminarNarrativa = (narrativaAEliminar: DataNarrativaServer) => {
        const nuevoMap = new Map(narrativas);
        const [, anioStr, semestre] = /(20\d\d)-([AB])/.exec(narrativaAEliminar.semestre)!;
        const anio = parseInt(anioStr, 10);

        const mapaAnio = nuevoMap.get(anio)!;
        if (mapaAnio.size === 1) {
            nuevoMap.delete(anio);
        } else {
            mapaAnio.delete(semestre);
        }

        setNarrativas(nuevoMap);
    };

    const narrativaActual = [...narrativas]
        .find(([anio, narrativasAnio]) => anio === filtroAnio && narrativasAnio.has(filtroSemestre))
        ?.[1]
        ?.get(filtroSemestre);

    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded py-5">
            <div className="px-4 py-3 grid grid-cols-2" style={{gridTemplateColumns: "auto 16rem"}}>
                <div>
                    <h3 className="font-semibold text-base text-blueGray-700 inline-block px-2">
                            Filtros
                    </h3>
                    <FiltroAnio
                        values={[...narrativas.keys()]}
                        onChange={(nuevoAnio) => {
                            const nuevoSemestre = revisarSemestre(narrativas, nuevoAnio, filtroSemestre);
                            setFiltroAnio(nuevoAnio);
                            setFiltroSemestre(nuevoSemestre);
                        }}
                    />
                    <FiltroSemestre
                        initial={filtroSemestre}
                        narrativas={narrativas}
                        anioActual={filtroAnio}
                        onChange={setFiltroSemestre}
                    />
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

            {narrativaActual && <Narrativa narrativa={narrativaActual} eliminar={() => eliminarNarrativa(narrativaActual)} />}
        </div>
    );
}

function FiltroAnio(props: { values: Array<number>, onChange: (_: number) => void }) {
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
                {props.values.map((v) => <option value={v}>{v}</option>)}
            </select>
        </span>
    );
}

function FiltroSemestre(props: { initial: Semestre, anioActual: number, narrativas: AlmacenNarrativas, onChange: (_: Semestre) => void }) {
    const [selected, setSelected] = useState<Semestre>(props.initial);

    const semestresValidos = [...(props.narrativas.get(props.anioActual)?.keys() ?? [])];

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
                {semestresValidos.map((x) => <option value={x}>{x}</option>)}
            </select>
        </span>
    );
}
