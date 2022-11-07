import React, {useState, useEffect} from "react";
import axios from "axios";
import {useFormik} from "formik";
import * as Yup from "yup";

import InputTextCodigo from "../../../../components/Form/Components/InputTextCodigo";
import InputSelect from "../../../../components/Form/Components/InputSelect";

import "./CrearPM.css";



function CrearPM(props: any) {

    const pmInitialValues: any = {
        id_estandar: null,
        id_user: null,
        codigo: "",
    };
    const [pm, setPM] = useState(pmInitialValues)

    const handleSubmit = (values: any) => {
        
        formik.setFieldValue("id_estandar", '');
        formik.setFieldValue("id_user", '');
        formik.setFieldValue("codigo", '');
        formik.setTouched({}, false);
        setPM(pmInitialValues);
        props.handleSubmit(values);
        
    };
    
    const handleCancel = () => {
        
        formik.setFieldValue("id_estandar", '');
        formik.setFieldValue("id_user", '');
        formik.setFieldValue("codigo", '');
        formik.setTouched({}, false);
        setPM(pmInitialValues);
        props.handleCancel();
        
    }

    

    const validationSchema = Yup.object().shape({
        id_estandar: Yup.number().required("No se escogio un estandar")
            .typeError("No es escogio el Estandar"),
        id_user: Yup.number().required("No se escogio un estandar")
            .typeError("No es escogio el Estandar"),
        codigo: Yup.string().required("El codigo es requerido")
            .trim()
            .matches(/^OM+-+[0-9]{2}-+20[0-9]{2}$/, "El codigo debe tener el formato OM-XX-XXXX coloque solo los numeros con el guion"),
    });

    const formik = useFormik({
        initialValues: pm,
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
        /**
         * Obligatoriamente el codigo y el estandar
         * Verificar que no pueda poner 100% si existe algun campo vacio
         * Tampoco en estado concluido
         * porque no hay evidencias
         */
    });


    const handleChangeEstandar = (value:any) => {
        formik.setFieldValue("id_estandar", value);
    };
    const handleChangeUsuario = (value:any) => {
        formik.setFieldValue("id_user", value);
    };
    const handleChangeCodigo = (value:any) => {
        formik.setFieldValue("codigo", `OM-${value}`);
    };

    return (
        <>
            <div className="bg-content">
                <form className="form-container form-asignar-pm" onSubmit={formik.handleSubmit}>
                    <InputTextCodigo
                        name="codigo"
                        label="CODIGO"
                        description="EN ESTA SECCION INTRODUCE EL CODIGO EN EL FORMATO OM-XX-XXXX"
                        prefix="OM-"
                        value={''}
                        onChange={handleChangeCodigo}
                        error={formik.errors.codigo}
                        disabled={false}
                    />
                    <InputSelect
                        name="user"
                        label='USUARIO ENCARGADO'
                        description='SELECCIONA AL USUARIO QUE SE LE ASIGNARA EL PLAN DE MEJORA'
                        optionsRute='user'
                        initialValue={ {} }
                        disabled={false}
                        error={formik.errors.id_user}
                        onChange={handleChangeUsuario}
                    />
                    <InputSelect
                        name="estandar"
                        label='ESTANDAR'
                        description='SELECCIONA A QUE ESTANDAR ESTA ASOCIADO EL PLAN DE'
                        optionsRute='estandares'
                        initialValue={ {} }
                        disabled={false}
                        error={formik.errors.id_estandar}
                        onChange={handleChangeEstandar}
                    />
                    

                    <div style={{display: "flex",  marginTop: "3em", justifyContent: "space-around"}}>
                        <button type="button" style={{padding: "10px 20px", backgroundColor: "#FF4A4A", color: "white", borderRadius: "20px", width: "35%"}} onClick={handleCancel}>  CANCELAR</button>
                        <button type="submit" style={{padding: "10px 20px", backgroundColor: "#0284C7", color: "white", borderRadius: "20px", width: "60%"}}>  ASIGNAR PM</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CrearPM;

