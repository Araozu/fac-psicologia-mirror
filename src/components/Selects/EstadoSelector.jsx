import React from "react";
import Select from "react-select";

export default function EstadoSelector(props) {
    const {
        title,
        onChange,
    } = props;
    const estados = [
        {
            value: "",
            label: "",
        },
        {
            value: "planificado",
            label: "Planificado",
        },
        {
            value: "programado",
            label: "Programado",
        },
        {
            value: "reprogramado",
            label: "Reprogramado",
        },
        {
            value: "enProceso",
            label: "En Proceso",
        },
        {
            value: "concluido",
            label: "Concluido",
        },
    ];

    return (<div>
        <label>
            {title}
        </label>

        <Select options={estados} onChange={onChange}/>
    </div>);
}
