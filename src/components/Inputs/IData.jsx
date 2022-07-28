import React from "react";


export default function IData(props){
    const {title,name, type,onChange} = props;
    return(<div>
        <label>{title}</label>
        <input id={name} name={name} type={type} onChange={onChange}/>
    </div>)
}
