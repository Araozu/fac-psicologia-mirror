import {useHistory} from "react-router";
import {ChangeEventHandler, useState} from "react";

type Semestre = "Todos" | "A" | "B" | "C";

export default function CardNarrativas() {
    const history = useHistory();

    const [filtroAnio, setFiltroAnio] = useState(-1);
    const [filtroSemestre, setFiltroSemestre] = useState<Semestre>("Todos");

    const redirigirCrearNarrativa = () => history.push("/admin/estandar8/narrativa/crear");

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

            CardNarrativas
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
