import React, {useEffect, useState} from "react";

import axios from "axios";
import Select from "react-select";

import Label from "./Label/Label";
import {SERVER_PATH} from "@/variables";
import {useHistory} from "react-router";


export default function InputSelectUsers(props: any) {
    //INITIAL VALUE RECIBE EL ID
    const {
        name,
        label,
        description,
        initialValue,
        onChange,
        disabled = false,
        error,
    } = props;

    const access_token = localStorage.getItem("access_token");

    const [options, setOptions] = useState([]);
    const [value, setValue] = useState({});

    useEffect(() => {
        axios.get(`${SERVER_PATH}/api/enabled_users`, {headers: {"Authorization": `Bearer ${access_token}`}})
            .then(function(response) {
                if (response.status === 401) {
                    localStorage.removeItem("access_token");
                    console.warn("401");
                    useHistory().push("/auth");
                }

                if (options.length > 0) return;
                const optionsResponse: any = [];

                response.data.data.forEach((item: any, index: number) => optionsResponse.push({
                    //TODO: CAMBIAR INDEX POR EL ID DEL ESTANDAR CUANNDO LO DEVUELVA LA RUTA
                    value: item.id,
                    label: `${item.name?.toUpperCase()} ${item.lastname?.toUpperCase()} - ${item.email?.toLowerCase()}`,
                }));
                setOptions(optionsResponse);

                if (props.initialValue) {
                    const labelInitialValue = optionsResponse.find((item: any) => item.value === props.initialValue)?.label;
                    const newValue = {
                        value: props.initialValue,
                        label: labelInitialValue,
                    };
                    setValue(newValue);
                }
            });
    }, []);


    const handleChange = (value: any) => {
        setValue(value);
        onChange(value.value);
    };

    const emessage = <p className="form-input-error-description">{error}</p>;

    return (
        <>
            <Label label={label} description={description} />
            <div>
                <Select name={`${name}-select`} options={options} value={value} onChange={handleChange}
                    isDisabled={disabled}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 10,
                    })}
                    className={"input-select-container"}
                    //styles={}

                />
                {/**Si hay error muestra el mensaje, si no no muestra nada */}
                {error !== "" ? emessage : ""}
            </div>
        </>
    );


}
const customStyles = {
    option: (provided: any, state: any) => ({
        ...provided,
        borderBottom: "1px dotted pink",
        //color: state.isSelected ? "red" : "blue",
        padding: 20,
    }),
    control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 300,
    }),
    container: () => ({
        width: 300,
    }),
};

