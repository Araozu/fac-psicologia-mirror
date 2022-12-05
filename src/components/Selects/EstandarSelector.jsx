import React from "react";
import Select from "react-select";
import "../../views/Estandares/components/PlanMejora/components/CrearPM.css";
import axios from "axios";
import Label from "../Labels/Label";
import {SERVER_PATH} from "@/variables";

export default function EstandarSelector(props) {
    const {
        title,
        total,
        onChange,
        detalle,
    } = props;
    const estandares = [];

    axios.get(`${SERVER_PATH}/api/estandares`)
        .then(function(response) {
            response.data.data.forEach((element, index) => estandares.push({
                value: index,
                label: element.name,
            }));
        })
        .catch(function(error) {
            console.log(error);
            aux();
        });


    const aux = () => {
        for (let i = 1; i <= total; i += 1) {
            estandares.push({
                value: i,
                label: (i),
            });
        }
    };
    return (
        <>
            <Label title={title} detalle={detalle} />
            <Select className="estandarS" options={estandares} onChange={onChange} />
        </>
    );
}
