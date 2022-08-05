import React from "react";
import Select from "react-select";
import "../../views/Create/CrearPM.css";

export default function EstandarSelector(props) {
    const {
        title,
        total,
        onChange,
    } = props;
    const estandares = [];
    for (let i = 1; i <= total; i++) {
        estandares.push({
            value: i,
            label: (i),
        });
    }

    return (<>
        <label className="etiqueta">
            {title}
        </label><Select className="estandarS" options={estandares} onChange={onChange}/>
    </>);
}
