import React from "react";
import Select from "react-select";
import Label from "../Labels/Label";
import axios from "axios";

export default function EstadoSelector(props) {
    const {
        title,
        onChange,
        detalle
    } = props;
    let estados = [];

    axios.get("https://gestion-calidad-rrii-api.herokuapp.com/api/estados")
        .then(function(response) {
            response.data.data.forEach((element, index) => estados.push(
                {
                    value: index,
                    label: element["valor"],
                },
            ));
        })

    return (<div>
        <Label title={title} detalle={detalle}/>


        <Select className="estandarS" options={estados} onChange={onChange}/>
    </div>);
}
