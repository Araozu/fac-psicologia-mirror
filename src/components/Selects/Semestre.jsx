import React, {useEffect, useState} from "react";
import Select from "react-select";
import "../../views/Create/CrearPM.css";

export default function Semestre(props) {
    const {
        title,
        setData,
    } = props;
    const [year, setYear] = useState(new Date().getFullYear());
    const [semestre, setSemestre] = useState("");
    const data = [
        {
            value: "A",
            label: "A",
        },
        {
            value: "B",
            label: "B",
        },
        {
            value: "C",
            label: "Anual",
        },
    ];


    const handleChangeYear = (event) => {
        setYear(event.target.value);
    }

    const handleChangeSemestre = (event) => {
        setSemestre(event.value);
    };

    useEffect(() => {
        setData(`${year}-${semestre}`);
    }, [year, semestre]);

    return (
        <div>
            <label className={"etiqueta"}>{title}</label>
            <input className={"semestre"} type={"number"} value={year} onChange={handleChangeYear}
                   onWheel={(e) => e.target.blur()}/>
            <Select className={"estandarS"} options={data} onChange={handleChangeSemestre}/>
        </div>
    );
}
