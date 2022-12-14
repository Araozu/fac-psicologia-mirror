import React, {useState, useEffect} from "react";
import Select from "react-select";

import Label from "./Label/Label";


export default function InputSemestre(props: any) {

    const {name, label, description, initialValue, onChange} = props;
    const idinput = `${name}-input`;
    const [error, setError] = useState("");

    const semestre = initialValue ? initialValue.split("-") : [""];
    const [option, setOption] = useState(initialValue && {value: semestre[1], label: semestre[1]});

    //Separamos el año y el semestre en una variable

    const options = [
        {value: "A", label: "A"},
        {value: "B", label: "B"},
        {value: "Anual", label: "Anual"},
    ];



    const handleChange = (value: any) => {
        setOption(value);
        const el = document.getElementById(idinput) as HTMLInputElement;
        onChange(`${el.value}-${value.value}`);
    };

    const handleInputChange = (e: any) => {
        onChange(`${e.target.value}-${option.value}`);
    };

    const classes = `form-input-text form-input-text-semestre${error !== "" ? "form-input-error" : ""}`;
    const emessage = <p className='form-input-error-description'>{error}</p>;

    return (
        <>
            <Label label={label} description={description} />
            <div>
                <div style={{display: "flex"}}>
                    <input name={idinput} id={idinput} type="number" className={classes} defaultValue={semestre[0]} min='2000' max='3000' onChange={handleInputChange} />
                    <Select
                        name={`${name}-select`}
                        options={options}
                        value={option}
                        onChange={handleChange}
                    />
                </div>
                {/**Si hay error muestra el mensaje, si no no muestra nada */}
                {error !== "" ? emessage : ""}
            </div>
        </>
    );
}
