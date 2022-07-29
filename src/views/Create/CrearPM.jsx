import React, {useState, useEffect} from "react";
import {Formik, useFormik} from "formik";
import IData from "../../components/Inputs/IData";
import axios from "axios";
import EstandarSelector from "../../components/Selects/EstandarSelector";
import IDinamics from "../../components/Inputs/IDinamics";
import EstadoSelector from "../../components/Selects/EstadoSelector";
import Eficacia from "../../components/Selects/Eficacia";


export default function Crear() {
    const token = localStorage.getItem("access_token")

    const formik = useFormik({
        initialValues: {
            nombre: "",
            estandar: 0,
            codigo: "",
            fuente: [],
            po: [],
            cr: [],
            omr: "",
            amr: [],
            semestre: "",
            duracion: 0,
            recursos: [],
            meta: [],
            responsables: [],
            observaciones: [],
            estado: "",
            evidencias: [],
            avance: 0,
            eficacia: true,
        },
        onSubmit: (values) => {
            //console.log(JSON.stringify(values, null, 1));
            /* const data = {
                 nombre: values.nombre,
                 oportunidad_plan: values.omr,
                 semestre_ejecucion: values.semestre,
                 duracion: values.duracion,
                 estado: values.estado,
                 avance: values.avance,
                 evaluacion_eficacia: values.eficacia,
                 estandar_id: values.estandar,
                 codigo: values.codigo,
                 metas: values.meta,
                 observaciones: values.observaciones,
                 problemas_oportunidades: values.po,
                 fuentes: values.fuente,
                 responsables: values.responsables,
                 causas_raices: values.cr,
                 recursos: values.recursos,
                 acciones_mejoras: values.amr,
                 evidencias_planes_mejoras: values.evidencias,
             };
             console.log(data);*/
            axios.post("",
                {
                    nombre: values.nombre,
                    oportunidad_plan: values.omr,
                    semestre_ejecucion: values.semestre,
                    duracion: values.duracion,
                    estado: values.estado,
                    avance: values.avance,
                    evaluacion_eficacia: values.eficacia,
                    estandar_id: values.estandar,
                    codigo: values.codigo,
                    metas: values.meta,
                    observaciones: values.observaciones,
                    problemas_oportunidades: values.po,
                    fuentes: values.fuente,
                    responsables: values.responsables,
                    causas_raices: values.cr,
                    recursos: values.recursos,
                    acciones_mejoras: values.amr,
                    evidencias_planes_mejoras: values.evidencias,
                }, {
                    headers: {
                        "Content-type":"application/json",
                        Accept:"application/json",
                        Authorization: "Bearer " + token,
                    },
                },
            ).then();


        },
        validate: (values) => {
            let errors = {};
            /*if (values.codigo === "") {
                errors.codigo = "Required";
            }*/

            return errors;
        },

    });

    const setEficacia = (data) => {
        formik.values.eficacia = data;
    };
    const setFuente = (data) => {
        formik.values.fuente = data;
    };
    //recursos
    const setRecursos = (data) => {
        formik.values.recursos = data;
    };
    //PO
    const setPO = (data) => {
        formik.values.po = data;
    };

    const setCR = (data) => {
        formik.values.cr = data;
    };

    const setAM = (data) => {
        formik.values.amr = data;
    };
    const setMeta = (data) => {
        formik.values.meta = data;
    };
    const setResponsable = (data) => {
        formik.values.responsables = data;
    };
    const setObervaciones = (data) => {
        formik.values.observaciones = data;
    };
    //estandares
    const handleSelectestandarChange = (event) => {
        formik.values.estandar = event.value;
    };

    const handleStateChange = (event) => {
        formik.values.estado = event.value;
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                <tr className={"flex-col border border-solid justify-center items-center px-3 py-3 uppercase text-lg border font-semibold border-l-0 border-r-0"}>
                    Formulario de Creación de Planes de Mejora

                </tr>
                </thead>
                <tbody>
                {/*nombre del PM*/}
                <tr>
                    <IData title={"Nombra tu plan de Mejora"} name="nombre" type="text" onChange={formik.handleChange}/>
                </tr>
                {/*selecciona el estandar*/}
                <tr>
                    <EstandarSelector title={"Estandares"} total={30} onChange={handleSelectestandarChange}/>
                </tr>
                {/*Código*/}
                <tr>
                    <IData title={"Código (1)"} name="codigo" type={"text"} onChange={formik.handleChange}/>
                </tr>
                {/*Seleccion de fuente*/}
                <tr>
                    <IDinamics title={"Fuentes (2)"} name={"fuentes"} type={"text"} setDt={setFuente}/>
                </tr>
                {/*fila problema oportunidad */}
                <tr>
                    <IDinamics title={"Problema/Oportunidad (3)"} name={"po"} type={"text"} setDt={setPO}/>
                </tr>
                {/*Fila Causa Raiz*/}
                <tr>
                    <IDinamics title={"Causa/Raiz (4)"} name={"cr"} type={"text"} setDt={setCR}/>
                </tr>
                {/*Fila oportunidad mejora*/}
                <tr>
                    <IData title={"Oportunidad de Mejora (5)"} name="omr" type="text" onChange={formik.handleChange}/>
                </tr>
                {/*Acciones de mejora*/}
                <tr>
                    <IDinamics title={"Acciones de Mejora (6)"} name={"amr"} type={"text"} setDt={setAM}/>
                </tr>
                {/*Fila semestre y año de Ejecución*/}
                <tr>
                    <IData title={"Año-Semestre de Ejecución (7)"} name={"semestre"} type={"text"}
                           onChange={formik.handleChange}/>
                </tr>
                {/*DUración*/}
                <tr>
                    <IData title={"Duración (8)"} name={"duracion"} type={"number"} onChange={formik.handleChange}/>
                </tr>
                {/*Recursos*/}
                <IDinamics title={"Recursos (9)"} name={"recursos"} type={"text"} setDt={setRecursos}/>
                {/*Metas*/}
                <tr>
                    <IDinamics title={"Metas (10)"} name={"meta"} type={"text"} setDt={setMeta}/>
                </tr>
                {/*Responsables*/}
                <tr>
                    <IDinamics title={"Responsables (11)"} name={"responsables"} type={"text"} setDt={setResponsable}/>
                </tr>
                {/*Observaciones*/}
                <tr>
                    <IDinamics title={"Observaciones (12)"} name={"observaciones"} type={"text"}
                               setDt={setObervaciones}/>
                </tr>
                {/*Estados*/}
                <EstadoSelector title={"Estado (13)"} onChange={handleStateChange}/>
                {/*Evidencias*/}
                <tr>
                    <IData title={"Evidencias (14)"} name={"evidencias"} type={"text"}
                           onChange={formik.handleChange}/>
                </tr>
                {/*Avances*/}
                <tr>
                    <IData title={"Avances"} name="avance" type="number" onChange={formik.handleChange}
                           value={formik.values.avance}/>
                </tr>
                {/*Eficacia*/}
                <tr>
                    <Eficacia title={"Eficacia"} setDt={setEficacia}/>
                </tr>
                </tbody>

            </table>

            <button type="submit" style={{
                width: "80px",
                height: "35px",
                backgroundColor: "white",
            }}>Guardar
            </button>
        </form>);
}

