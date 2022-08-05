import React from "react";
import "../../views/Create/CrearPM.css"
import Label from "../Labels/Label";

export default function IData(props){
    const {title,name, type,onChange,detalle} = props;
    return(<div>
        <Label title={title} detalle={detalle}/>
        <input  className="input-line" id={name} name={name} type={type} onChange={onChange}/>
    </div>)
}
