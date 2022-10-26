import React from "react";
import Select from "react-select";
import Label from "../Labels/Label";
import axios from "axios";
import {SERVER_PATH} from "@/variables";

export default function EstadoSelector(props) {
    const {
        title,
        onChange,
        detalle,
    } = props;
    const estados = [];

    axios.get(`${SERVER_PATH}/api/estados`)
        .then(function(response) {
            response.data.data.forEach((element, index) => estados.push({
                value: index,
                label: element.valor,
            }));
        });

    return (
        <div>
            <Label title={title} detalle={detalle} />

            <Select className="estandarS" options={estados} onChange={onChange} />
        </div>
    );
}
