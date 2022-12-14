import React, {useState} from "react";

import Label from "./Label/Label";

export default function InputAvance(props: any) {
    const {name, label, description, initialValue, onChange} = props;

    const [value, setValue] = useState(initialValue ? initialValue : 0);

    const handleChange = (e: any) => {
        setValue(e.target.value);
        onChange(e);
    };

    return (
        <>
            <Label label={label} description={description} />
            <div>
                {/**
                <InputRange
                    maxValue={100}
                    minValue={0}
                    value={value}
                    onChange={handleChange}/> */}
                <input name={name} type="range" min="0" max="100" defaultValue={value} className="slider" id="myRange" onChange={handleChange} style={{marginRight: "5px"}} />
                <input disabled type='text' id={name} value={value} className='form-input-text form-input-text-semestre' />
            </div>
        </>
    );

}
