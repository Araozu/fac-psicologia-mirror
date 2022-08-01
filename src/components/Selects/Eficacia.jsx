import React, {useEffect, useState} from "react";

export default function Eficacia(props){
    const {title,setDt}=props;
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
        <label className="etiqueta">{title}</label>
        <select className="eficacia" onChange={(e) => selectEficacia(e)}>
            {efis.map((option, index) => (
                <option key={index} value={option.value}>{option.text}</option>
            ))}
        </select>
    </div>)
}
