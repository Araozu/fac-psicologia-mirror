//IMPORTACIONES DE LIBRERIAS
import React, {useState, useEffect} from "react";
import {Formik, useFormik, ErrorMessage, isEmptyArray} from "formik";
import Label from "./Label/Label";

//IMPORTACIONES FUENTE PROPIA


//IMPORTACIONES ASSETS


export default function InputText(props: any) {
    /**
    Name: Se utiliza para el id y el name del componente input
    Label: Se utiliza para manejar la descripcion del componente
    Description: Se utiliza para mostrar el mensaje de ayuda
    Value: En caso se inicialize con un valor con defecto lo establecemos
     */
    const {name, label, description, placeholder, value = "", error = "", onChange, disabled} = props;

    /**MANEJO DINAMICO DE CLASES */
    const classes = `form-input-text ${error !== "" ? "form-input-error" : ""}`;

    const emessage = <p className='form-input-error-description'>{error}</p>;
    return (
        <>
            {/** ENCAPSULAR EN COMPONENTE */}
            <Label label={label} description={description} />
            {/** ENCAPSULAR EN COMPONENTE */}
            <div>
                <input
                    type="text"
                    disabled={disabled === true}
                    id={name}
                    name={name}
                    defaultValue={value}
                    className={classes}
                    placeholder={placeholder}
                    onChange={onChange}
                />
                {/**Si hay error muestra el mensaje, si no no muestra nada */}
                {error !== "" ? emessage : ""}
            </div>
        </>
    );
}
