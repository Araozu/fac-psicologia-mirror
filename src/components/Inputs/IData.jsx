import React from "react";
import "../../views/Create/CrearPM.css"

export default function IData(props){
    const {title,name, type,onChange} = props;
    return(<div>
        <label className="etiqueta">{title}</label>
        <input  className="input-line" id={name} name={name} type={type} onChange={onChange}/>
    </div>)
}
