import React, {useEffect, useState} from "react";

import axios from "axios";
import Select from "react-select";

import Label from "./Label/Label";


export default function InputSelect(props) {
    //INITIAL VALUE RECIBE EL ID
    let {
        name,
        label,
        description,
        optionsRute,
        initialValue,
        onChange,
        disabled = false,
        error,
    } = props;

    const [options, setOptions] = useState([]);
    const [value, setValue] = useState();

    useEffect(() => {
        axios.get("https://gestion-calidad-rrii-api.herokuapp.com/api/" + optionsRute)
            .then(function(response) {
                if (options.length > 0) return;
                let optionsResponse = [];

                response.data.data.forEach((item, index) => optionsResponse.push(
                    {
                        //TODO: CAMBIAR INDEX POR EL ID DEL ESTANDAR CUANNDO LO DEVUELVA LA RUTA
                        value: optionsRute === "estandares" ? item["id"] : item["valor"],
                        label: optionsRute === "estandares" ? item["name"] : item["valor"],
                    },
                ));
                setOptions(optionsResponse);

                if (initialValue) {
                    let labelInitialValue = optionsResponse.find(item => item.value == initialValue)?.label;
                    setValue({
                        value: initialValue,
                        label: labelInitialValue,
                    });
                }
            });
    }, []);


    const handleChange = (value) => {
        setValue(value);
        onChange(value.value);
    };

    let emessage = <p className="form-input-error-description">{error}</p>;

    return (
        <>
            <Label label={label} description={description}/>
            <div>
                <Select name={name + "-select"} options={options} value={value} onChange={handleChange}
                        isDisabled={disabled}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 10,
                        })}
                        className={"input-select-container"}
                        //styles={}

                />
                {/**Si hay error muestra el mensaje, si no no muestra nada */}
                {error != "" ? emessage : ""}
            </div>
        </>
    );


}
const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: "1px dotted pink",
        //color: state.isSelected ? "red" : "blue",
        padding: 20,
    }),
    control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 300,
    }),
    container:()=>({
        width:300
    })
};

