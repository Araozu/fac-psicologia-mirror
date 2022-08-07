import React from "react";
import Select from "react-select";
import "../../views/Create/CrearPM.css";
import Label from "../Labels/Label";
export default function EstandarSelector(props) {
    const {
        title,
        total,
        onChange,
        detalle
    } = props;
    const estandares = [];
    for (let i = 1; i <= total; i++) {
        estandares.push({
            value: i,
            label: (i),
        });
    }

    return (<>
        <Label title={title} detalle={detalle}/>
        <Select className="estandarS" options={estandares} onChange={onChange}/>
    </>);
}
