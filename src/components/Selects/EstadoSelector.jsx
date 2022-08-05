import React from "react";
import Select from "react-select";
import Label from "../Labels/Label";

export default function EstadoSelector(props) {
    const {
        title,
        onChange,
        detalle
    } = props;
    const estados = [
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
        <Label title={title} detalle={detalle}/>


        <Select className="estandarS" options={estados} onChange={onChange}/>
    </div>);
}
