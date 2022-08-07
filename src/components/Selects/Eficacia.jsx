import React, {useEffect, useState} from "react";
import Label from "../Labels/Label";

export default function Eficacia(props){
    const {title,setDt,detalle}=props;
    const[eficacia,setEficacia] = useState(true);
    const selectEficacia = (e) => {
        setEficacia(e.target.value);
    };
    const efis = [
        {
            value: "",
            text: "",
        },
        {
            value: true,
            text: "Si",
        },
        {
            value: false,
            text: "No",
        },
    ];
    useEffect(()=>{
        setDt(eficacia)
    },[eficacia])
    return(<div>
        <Label title={title} detalle={detalle}/>
        <select className="eficacia" onChange={(e) => selectEficacia(e)}>
            {efis.map((option, index) => (
                <option key={index} value={option.value}>{option.text}</option>
            ))}
        </select>
    </div>)
}
