import React, {useState, useEffect} from "react";
import {Formik, useFormik, ErrorMessage, isEmptyArray} from "formik";
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
import { useHistory } from "react-router";
import Modal from '../../components/modals/Modal'
import SelectoreResponsables from "../../components/Selects/SelectoreResponsables";

export default function Crear() {
    const token = localStorage.getItem("access_token");
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [modalInfo, setModalInfo] = useState({
        estado: "ok",
        title: "Operacion exitosa",
        body: "Se creo con exito el plan de mejora"
    });

    const onCloseHandle = (res) => {
        setShow(false);
        if(modalInfo.estado === 'ok')
            history.push('/admin/estandar8');
    }

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
            //console.log(JSON.stringify(values,null,1));
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
                        "Content-type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                },
            ).then(function(response){

                setModalInfo({
                    estado: "ok",
                    title: "Operacion exitosa",
                    body: "Se creo con exito el plan de mejora"
                });

                setShow(true);

                console.log(response);
            }).catch(function(error){

                setModalInfo({
                    estado: "error",
                    title: "Operacion fallida",
                    body: "No se pudo crear el plan de mejora, revise los datos"
                });

                setShow(true);
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
            if (values.avance < 0) {
                errors.avance = "El porcentaje de avance no puede ser menor a 0";
            } else if (isEmptyArray(values.evidencias) && values.avance === 100) {
                errors.avance = "El porcentaje no puede ser 100 porque no se han llenado evidencias";
            } else if (isEmptyArray(values.fuente) && values.avance === 100) {
                errors.avance = "El porcentaje no puede ser 100 porque no se han llenado fuentes";
            } else if (isEmptyArray(values.po) && values.avance === 100) {
                errors.avance = "El porcentaje no puede ser 100 porque no se han llenado problema oportunidad";
            } else if (isEmptyArray(values.cr) && values.avance === 100) {
                errors.avance = "El porcentaje no puede ser 100 porque no se han llenado causa raiz";
            } else if (isEmptyArray(values.amr) && values.avance === 100) {
                errors.avance = "El porcentaje no puede ser 100 porque no se han llenado Acciones de mejora";
            } else if (isEmptyArray(values.recursos) && values.avance === 100) {
                errors.avance = "El porcentaje no puede ser 100 porque no se han llenado recursos";
            } else if (isEmptyArray(values.metas) && values.avance === 100) {
                errors.avance = "El porcentaje no puede ser 100 porque no se han llenado metas";
            }else if (isEmptyArray(values.responsables) && values.avance === 100) {
                errors.avance = "El porcentaje no puede ser 100 porque no se han llenado responsables";
            } else if (isEmptyArray(values.observaciones) && values.avance === 100) {
                errors.avance = "El porcentaje no puede ser 100 porque no se han llenado observaciones";
            } else if ( values.avance > 100){
                errors.avance = "El porcentaje no puede ser mayor a 100";
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
        formik.values.estado = event.label;
    };

    const handleDuracionChange = (data) => {
        formik.values.duracion = data;
    };
    const handleSemestreChange = (data) => {
        formik.values.semestre = data;
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="div-title">
                    <label className="title">Formulario de Creación de Planes de Mejora</label>
                </div>
                <div className="div-head">
                    {/*nombre del PM*/}
                    <IData title={"Nombra tu plan de Mejora"} name="nombre" type="text" detalle={"En esta sección debes ingresar el título de tu plan de mejora"} onChange={formik.handleChange}/>
                    {formik.errors.nombre ? <div className="error">{formik.errors.nombre}</div> : null}
                    {/*selecciona el estandar*/}
                    <EstandarSelector title={"Estandares"} total={30}  detalle={"Selecciona el estándar al que pertenece el Plan de Mejora"} onChange={handleSelectestandarChange}/>
                    {formik.errors.estandar ? <div className="error">{formik.errors.estandar}</div> : null}
                </div>
                <div className="div-body">
                    {/*Código*/}
                    <IData title={"Código (1)"} detalle={"Registrar en la columna el código de la acción de la mejora continua, por ejemplo: OM – 01:2020, que refiere a la oportunidad de mejora 01 correspondiente al año 2020."}name="codigo" type={"text"} onChange={formik.handleChange}/>
                    {formik.errors.codigo ? <div className="error">{formik.errors.codigo}</div> : null}
                    {/*Seleccion de fuente*/}
                    <SelectorFuente title={"Fuentes (2)"} detalle={"Registrar si la fuente de la Mejora proviene de: (Usar el selector)"} setData={setFuente}/>
                    {/*fila problema oportunidad */}
                    <IDinamics title={"Problema/Oportunidad (3)"} detalle={"Registre el problema / oportunidad que genera la mejora "} name={"po"} type={"text"} setDt={setPO}/>
                    {/*Fila Causa Raiz*/}
                    <IDinamics title={"Causa/Raiz (4)"} detalle={"Registre la causa raíz, producto de un análisis (utilice, la técnica de los 5 porqués, Ishikawa, Pareto, entre otros)"} name={"cr"} type={"text"} setDt={setCR}/>
                    {/*Fila oportunidad mejora*/}
                    <IData title={"Oportunidad de Mejora (5)"} detalle={"Registre la denominación de la Oportunidad de mejora o el Plan de mejora"} name="omr" type="text" onChange={formik.handleChange}/>
                    {/*Acciones de mejora*/}
                    <IDinamics title={"Acciones de Mejora (6)"} detalle={"Registre las acciones necesarias para ejecutar el plan de mejora registrado en el (4)"} name={"amr"} type={"text"} setDt={setAM}/>

                    {/*Fila semestre y año de Ejecución*/}
                    <Semestre title={"Semestre (7)"} detalle={"Registre si las actividades se realizaran en el semestre A o B"} setData={handleSemestreChange}/>
                    {formik.errors.semestre ? <div className="error">{formik.errors.semestre}</div> : null}

                    {/*DUración*/}
                    <Duracion title={"Duración (8)"} detalle={"Registrar la duración en meses"} setData={handleDuracionChange}/>
                    {formik.errors.duracion ? <div className="error">{formik.errors.duracion}</div> : null}

                {/*Recursos*/}
                <IDinamics title={"Recursos (9)"}
                           detalle={"Registrar los recursos necesarios: Humanos, Tecnológicos, logísticos, otros."}
                           name={"recursos"} type={"text"} setDt={setRecursos}/>
                {/*Metas*/}
                <IDinamics title={"Metas (10)"}
                           detalle={"Registrar la meta que se espera lograr al termino del plan de mejora que atienda directamente la causa raíz del problema / mejora"}
                           name={"meta"} type={"text"} setDt={setMeta}/>
                {/*Responsables*/}
                {/*<IDinamicsRes title={"Responsables (11)"} detalle={"Registrar los responsables de la ejecución de las actividades registradas en el punto (5)"} name={"responsables"} type={"text"} setDt={setResponsable}/>*/}
                <SelectoreResponsables title={"Responsables (11)"}
                                       detalle={"Registrar los responsables de la ejecución de las actividades registradas en el punto (5)"}
                                       setData={setResponsable}/>

                {/*Observaciones*/}
                <IDinamics title={"Observaciones (12)"}
                           detalle={"Registrar en esta sección las acciones vinculadas a las mejoras y en que circunstancias se están realizando o realizaran, que permita al lector del informe tener conocimiento de la OM"}
                           name={"observaciones"} type={"text"}
                           setDt={setObervaciones}/>
                {/*Estados*/}
                <EstadoSelector title={"Estado (13)"}
                                detalle={"Registrar algunas de las siguientes alternativas: Planificado, Programado, Reprogramado, En proceso o Concluido."}
                                onChange={handleStateChange}/>
                {/*Evidencias*/}
                <IData title={"Evidencias (14)"} detalle={"Registrar el código de la evidencia (s)"} name={"evidencias"}
                       type={"text"}
                       onChange={formik.handleChange}/>
                {/*Avances*/}
                <IData title={"Avances (15)"}
                       detalle={"Planificado  de 0% a 10%; Reprogramado de 0% a 5%; En Desarrollo  de 11% a 99%, Concluido 100%"}
                       name="avance" type="number"
                       onChange={formik.handleChange}

                       value={formik.values.avance}/>
                {formik.errors.avance ? <div className="error">{formik.errors.avance}</div> : null}
                {/*Eficacia*/}
                <Eficacia title={"Eficacia (16)"}
                          detalle={"Registrar el calificativo de la evaluación categóricamente: Sí o No"}
                          setDt={setEficacia}/>
            </div>

                <div className="div-save">
                    <button className="button-save" type="submit">Guardar</button>
                </div>
            </form>
            <Modal show={show} type='info' onClose={onCloseHandle} title={modalInfo.title}>
                {modalInfo.body}
            </Modal>
        </>
        );
}

