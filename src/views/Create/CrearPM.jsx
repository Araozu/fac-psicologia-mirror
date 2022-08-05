import React, {useState, useEffect} from "react";
import {Formik, useFormik, ErrorMessage} from "formik";
import IData from "../../components/Inputs/IData";
import axios from "axios";
import EstandarSelector from "../../components/Selects/EstandarSelector";
import IDinamics from "../../components/Inputs/IDinamics";
import EstadoSelector from "../../components/Selects/EstadoSelector";
import Eficacia from "../../components/Selects/Eficacia";
import IDinamicsRes from "../../components/Inputs/IDinamicsRes";
import "./CrearPM.css";
import Duracion from "../../components/Selects/Duración";
import Semestre from "../../components/Selects/Semestre";
import SelectorFuente from "../../components/Selects/SelectorFuente";

export default function Crear() {
    const token = localStorage.getItem("access_token");

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
            axios.post("https://gestion-calidad-rrii-api.herokuapp.com/api/plan",
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
            ).then(function(response){
                console.log(response);
            }).catch(function(error){
                console.log(error);
            });
        },
        validate: (values) => {
            let errors = {};
            if (values.estandar === 0) {
                errors.estandar = "Se requiere especificar un Estándar";
            }
            if (values.codigo === "") {
                errors.codigo = "Especifique un código para el Plan de Mejora Formato (OM-XX-20XX)";
            } else if (!/^OM+\-+[0-9]{2}\-+20[2-9][0-9]$/i.test(values.codigo)) {
                errors.codigo = "El código necesita formato OM-XX-20XX";
            }
            if (values.nombre === "") {
                errors.nombre = "Es necesario nombrar el Plan de Mejora";
            }
            if (values.duracion > 12) {
                errors.duracion = "El tiempo de duración no puede ser más de 12 meses";
            }

            return errors;
        },

    });

    const setEficacia = (data) => {
        if (data === "true")
            formik.values.eficacia = true;
        else if (data === "false") {
            formik.values.eficacia = false;
        }
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

    const handleDuracionChange = (data) => {
        formik.values.duracion = data;
    };
    const handleSemestreChange = (data) => {
        formik.values.semestre = data;
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="div-title">
                <label className="title">Formulario de Creación de Planes de Mejora</label>
            </div>
            <div className="div-head">
                {/*nombre del PM*/}
                <IData title={"Nombra tu plan de Mejora"} name="nombre" type="text" onChange={formik.handleChange}/>
                {formik.errors.nombre ? <div className="error">{formik.errors.nombre}</div> : null}
                {/*selecciona el estandar*/}
                <EstandarSelector title={"Estandares"} total={30} onChange={handleSelectestandarChange}/>
                {formik.errors.estandar ? <div className="error">{formik.errors.estandar}</div> : null}
            </div>
            <div className="div-body">
                {/*Código*/}
                <IData title={"Código (1)"} name="codigo" type={"text"} onChange={formik.handleChange}/>
                {formik.errors.codigo ? <div className="error">{formik.errors.codigo}</div> : null}
                {/*Seleccion de fuente*/}
                <SelectorFuente title={"Fuentes (2)"} setData={setFuente}/>
                {/*fila problema oportunidad */}
                <IDinamics title={"Problema/Oportunidad (3)"} name={"po"} type={"text"} setDt={setPO}/>
                {/*Fila Causa Raiz*/}
                <IDinamics title={"Causa/Raiz (4)"} name={"cr"} type={"text"} setDt={setCR}/>
                {/*Fila oportunidad mejora*/}
                <IData title={"Oportunidad de Mejora (5)"} name="omr" type="text" onChange={formik.handleChange}/>
                {/*Acciones de mejora*/}
                <IDinamics title={"Acciones de Mejora (6)"} name={"amr"} type={"text"} setDt={setAM}/>

                {/*Fila semestre y año de Ejecución*/}
                <Semestre title={"Semestre (7)"} setData={handleSemestreChange}/>
                {formik.errors.semestre ? <div className="error">{formik.errors.semestre}</div> : null}

                {/*DUración*/}
                <Duracion title={"Duración (8)"} setData={handleDuracionChange}/>
                {formik.errors.duracion ? <div className="error">{formik.errors.duracion}</div> : null}

                {/*Recursos*/}
                <IDinamics title={"Recursos (9)"} name={"recursos"} type={"text"} setDt={setRecursos}/>
                {/*Metas*/}
                <IDinamics title={"Metas (10)"} name={"meta"} type={"text"} setDt={setMeta}/>
                {/*Responsables*/}
                <IDinamicsRes title={"Responsables (11)"} name={"responsables"} type={"text"} setDt={setResponsable}/>
                {/*Observaciones*/}
                <IDinamics title={"Observaciones (12)"} name={"observaciones"} type={"text"}
                           setDt={setObervaciones}/>
                {/*Estados*/}
                <EstadoSelector title={"Estado (13)"} onChange={handleStateChange}/>
                {/*Evidencias*/}
                <IData title={"Evidencias (14)"} name={"evidencias"} type={"text"}
                       onChange={formik.handleChange}/>
                {/*Avances*/}
                <IData title={"Avances"} name="avance" type="number" onChange={formik.handleChange}
                       value={formik.values.avance}/>
                {/*Eficacia*/}
                <Eficacia title={"Eficacia"} setDt={setEficacia}/>
            </div>

            <div className="div-save">
                <button className="button-save" type="submit">Guardar</button>
            </div>
        </form>);
}

