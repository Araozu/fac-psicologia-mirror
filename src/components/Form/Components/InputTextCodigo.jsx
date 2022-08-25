//IMPORTACIONES DE LIBRERIAS
import React, {useState, useEffect} from 'react';
import {Formik, useFormik, ErrorMessage, isEmptyArray} from "formik";
import Label from './Label/Label';

//IMPORTACIONES FUENTE PROPIA


//IMPORTACIONES ASSETS


export default function InputTextCodigo(props){
    /**
    Name: Se utiliza para el id y el name del componente input
    Label: Se utiliza para manejar la descripcion del componente
    Description: Se utiliza para mostrar el mensaje de ayuda
    Value: En caso se inicialize con un valor con defecto lo establecemos
     */
    let {name, label, description, placeholder, value='', error='', prefix, onChange} = props;

    /**MANEJO DINAMICO DE CLASES */
    let classes = 'form-input-text form-input-text-codigo ' + (error != '' ? 'form-input-error' : '');

    let emessage = <p className='form-input-error-description'>{error}</p>;
    return (
        <>
            <Label label={label} description={description} />
            <div>
                <span className="input-prefix-span">{prefix}</span>
                <input 
                    type="text" 
                    id={name} 
                    name={name+'text'} 
                    defaultValue={value}
                    className={classes}
                    placeholder={placeholder}
                    onChange={(e) => {onChange(e.target.value)}}/>
                {/**Si hay error muestra el mensaje, si no no muestra nada */}
                {error != '' ? emessage : ''}
            </div>
        </>
    );
}