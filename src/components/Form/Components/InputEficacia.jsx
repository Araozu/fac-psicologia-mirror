import React, {useState} from "react";

import Label from "./Label/Label";

export default function InputEficacia(props) {
    const {name, label, description, initialValue, onChange} = props;

    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
        setValue(document.getElementById(name).checked);
        onChange(e);
    };

    return (
        <>
            <Label label={label} description={description} />
            <div>
                <input name={name} style={{marginRight: "10px"}} id={name} className={`${name}-switch`} type="checkbox" checked={value} value={value} onChange={handleChange} />
                <span>{value ? "SI" : "NO"}</span>
            </div>
        </>
    );
}
