import React from "react";
import Select from "react-select";

export  default function EstandarSelector(props){
    const {title, total,onChange} = props;
    const estandares=[{value:0, label:""}]
    for (let i=1; i<=total;i++){
        estandares.push({value:i,label:(i)})
    }

    return(<div>
        <label>
            {title}
        </label>

        <Select options={estandares} onChange={onChange}/>
    </div>);
}
