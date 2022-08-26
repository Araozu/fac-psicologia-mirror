import React, {useState} from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

//Componentes del formulario
import InputText from "./Components/InputText";
import InputTextCodigo from "./Components/InputTextCodigo";
import InputTextDinamics from "./Components/InputTextDinamics";
import InputSelectDinamics from "./Components/InputSelectDinamics";
import InputSelect from "./Components/InputSelect";
import InputSemestre from "./Components/InputSemestre";
import InputDuracion from "./Components/InputDuracion";
import InputAvance from "./Components/InputAvance";
import InputEficacia from "./Components/InputEficacia";
import InputEvidencias from "./Components/InputEvidencias";
import Label from './Components/Label/Label';

//Modal
import Modal from '../modals/Modal';
import { useHistory } from 'react-router';



export default function FormPM(props){

    //TODO: Agregar el modal de exito o fallo
    //TODO: Manejar estado de Loading
    //TODO: Validaciones especificas
    let {
        //Valor por defecto en caso no cargue un PM
        pm = {
            nombre: '',
            id_estandar: null,
            codigo: '',
            fuentes: [],
            problemas_oportunidades: [],
            causas_raices: [],
            oportunidad_plan: '',
            acciones_mejoras: [],
            semestre_ejecucion: '',
            duracion: 0,
            estado: null,
            avance: 0,
            evaluacion_eficacia: true,
            metas: [],
            observaciones: [],
            responsables: [],
            recursos: [],
        }, 
        editing=false} = props;


    //PARA MANEJAR EL MODAL
    const history = useHistory();
    const [modal, setModal] = useState(false);

    const modalSuccess = {
        estado: "ok",
        icon: "fa-solid fa-circle-check icon-large success",
        title: "Operacion exitosa",
        body: "Se guardaron los cambios con exito",
        type: "info"
    };

    const modalError = {
        estado: "false",
        icon: "fa-solid fa-circle-exclamation icon-large error-icon",
        title: "Operacion fallida",
        body: "No se guardaron los cambios",
        type: "info"
    }

    const [modalInfo, setModalInfo] = useState(modalSuccess);

    const onCloseModalHandle = (res) => {
        setModal(false);
        if(modalInfo.estado === 'ok')
            history.push('/admin/estandar8');
    }


    const handleSubmit = (values) => {
        const token = localStorage.getItem("access_token");
        const base_url = 'https://gestion-calidad-rrii-api.herokuapp.com/api/plan';
        let url = base_url + ( editing ? ('/'+pm.id) : '');

        //Validamos si estamos editando un PM o no
        if(editing){
            console.log(JSON.stringify(values,null,1));
            axios.put(url, values, {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            }).then( (res) => {
                setModalInfo(modalSuccess);
            }).catch( (err) => {
                setModalInfo(modalError);
            }).finally( () => { setModal(true) })
        }else{
            console.log(JSON.stringify(values,null,1));
            axios.post(url, values, {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            }).then( (res) => {
                setModalInfo(modalSuccess);
            }).catch( (err) => {
                setModalInfo(modalError);
            }).finally( () => { setModal(true) })
        }
    }

    //Objeto que contiene las validaciones
    const validationSchema = Yup.object().shape({
        id_estandar: Yup.number().required("No se escogio un estandar").typeError("No es escogio el Estandar"),
        nombre: Yup.string().required("Debe especificar el nombre del plan"),
        codigo: Yup.string().required('El codigo es requerido').trim().matches(/^OM+\-+[0-9]{2}\-+20[2-9][0-9]$/, 'El codigo debe tener el formato OM-XX-XXXX coloque solo los numeros con el guion'),
    });

    //Creamos el formulario con formik
    const formik = useFormik({
        initialValues: pm,
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
        validateOnChange: false,
        validateOnBlur: false
        /**
         * Obligatoriamente el codigo y el estandar
         * Verificar que no pueda poner 100% si existe algun campo vacio
         * Tampoco en estado concluido
         * porque no hay evidencias
         */
    });


    //Personalizamos el change en componentes propios
    const handleChangeEstandar = (value) => { formik.setFieldValue('id_estandar', value) }
    const handleChangeCodigo = (value) => { formik.setFieldValue('codigo', `OM-${value}`) }
    const handleChangeFuentes = (values) => { formik.setFieldValue('fuentes', values) }
    const handleChangePo = (values) => { formik.setFieldValue('problemas_oportunidades', values) } 
    const handleChangeCr = (values) => { formik.setFieldValue('causas_raices', values) }
    const handleChangeAmr = (values) => { formik.setFieldValue('acciones_mejoras', values) }
    const handleChangeSemestre = (value) => { formik.setFieldValue('semestre_ejecucion', value) }
    const handleChangeRecursos = (values) => { formik.setFieldValue('recursos', values) }
    const handleChangeMetas = (values) => { formik.setFieldValue('metas', values) }
    const handleChangeResponsables = (values) => { formik.setFieldValue('responsables', values) }
    const handleChangeObservaciones = (values) => { formik.setFieldValue('observaciones', values) }
    const handleChangeEstado = (value) => { formik.setFieldValue('estado', value) }

    return (
        <>
            <form className="form-container" onSubmit={formik.handleSubmit}>
                    {/** Titulo y componente de estandar */}
                    <div className="form-title">
                        <h3>FORMULARIO DE PLAN DE MEJORA</h3>
                        <div style={{display: 'flex'}}>
                            <InputSelect 
                                name="estandar"
                                label='ESTANDAR'
                                description='El estandar al que esta asociado el plan de mejora'
                                optionsRute='estandares'
                                initialValue={pm?.id_estandar}
                                disabled={editing}
                                error={formik.errors.id_estandar}
                                onChange={handleChangeEstandar}/>
                        </div>
                    </div>

                    <hr />

                    {/** Body del formulario con grid */}
                    <div className="form-body">

                        {/** NOMBRE PLAN DE MEJORA */}
                        <InputText 
                            name="nombre" 
                            label='NOMBRE DEL PLAN DE MEJORA' 
                            description='En esta sección debes ingresar el titulo de tu plan de mejora' 
                            value={pm?.nombre}
                            onChange={formik.handleChange}
                            error={formik.errors.nombre}/>
                        
                        {/**CODIGO DEL PLAN DE MEJORA */}
                        <InputTextCodigo 
                            name="codigo"
                            label="CODIGO (1)"
                            description="EN ESTA SECCION INTRODUCE EL CODIGO EN EL FORMATO OM-XX-XXXX"
                            prefix="OM-"
                            value={pm?.codigo?.substr(3, pm.codigo.length)}
                            onChange={handleChangeCodigo}
                            error={formik.errors.codigo}/>

                        {/**FUENTES DEL PLAN DE MEJORA */}
                        <InputSelectDinamics 
                            name='fuente'
                            label='FUENTES (2)'
                            description='EN ESTA SECCION ELIGE LA FUENTE DEL PLAN DE MEJORA O ESPECIFICA UNA'
                            optionsRute='fuentes'
                            onChange={handleChangeFuentes}
                            initialValues={pm?.fuentes}/>

                        {/**PROBLEMAS OPORTUNIDADES */}
                        <InputTextDinamics 
                            name='po'
                            label='PROBLEMA/OPORTUNIDAD (3)' 
                            description='En esta seccion registra los Problemas/Oportunidades que genera la mejora'
                            onChange={handleChangePo}
                            initialValues={pm?.problemas_oportunidades}/>

                        {/**CAUSAS RAICES */}
                        <InputTextDinamics
                            name='cr'
                            label='CAUSA/RAIZ (4)'
                            description='En esta seccion se registra las Causas/Raices del plan de mejora'
                            onChange={handleChangeCr}
                            initialValues={pm?.causas_raices} />

                        {/**OPORTUNIDAD DE MEJORA */}
                        <InputText 
                            name='oportunidad_plan'
                            label='OPORTUNIDAD DE MEJORA (5)'
                            description='Introduce la oportunidad de mejora que se ejecutara en el plan'
                            value={pm?.oportunidad_plan}
                            onChange={formik.handleChange}/>

                        {/**ACCIONES DE MEJORA */}
                        <InputTextDinamics 
                            name='amr'
                            label='ACCIONES DE MEJORA (6)'
                            description='Introduce las acciones que llevan a la mejora establecida'
                            onChange={handleChangeAmr}
                            initialValues={pm?.acciones_mejoras}/>

                        {/**SEMESTRE */}
                        <InputSemestre 
                            name='semestre'
                            label='SEMESTRE (7)'
                            description='Introduce el semestre en el que se ejecuta el plan de mejora'
                            onChange={handleChangeSemestre}
                            initialValue={pm?.semestre_ejecucion}/>


                        {/**DURACION */}
                        <InputDuracion 
                            name='duracion'
                            label='DURACION (8)'
                            descripcion='Introduce la duracion en meses del plan de mejora'
                            onChange={formik.handleChange}
                            initialValue={pm?.duracion}/>

                        {/**RECURSOS */}
                        <InputTextDinamics 
                            name='recursos'
                            label='RECURSOS (9)'
                            description='Registrar los recursos necesarios: Humanos, Tecnológicos, logísticos, otros'
                            onChange={handleChangeRecursos}
                            initialValues={pm?.recursos}/>

                        {/**METAS */}
                        <InputTextDinamics 
                            name='metas'
                            label='METAS (10)'
                            description='Registrar la meta que se espera lograr al termino del plan de mejora que atienda directamente la causa raíz del problema / mejora'
                            onChange={handleChangeMetas}
                            initialValues={pm?.metas}/>

                        {/**RESPONSABLES */}
                        <InputSelectDinamics 
                            name='responsables'
                            label='RESPONSABLES (11)'
                            descripcion='Registrar los responsables de la ejecución de las actividades registradas en el punto (5)'
                            optionsRute='responsables'
                            onChange={handleChangeResponsables}
                            initialValues={pm?.responsables}/> 

                        {/**OBSERVACIONES */}
                        <InputTextDinamics 
                            name='observaciones'
                            label='OBSERVACIONES (12)'
                            description='Registrar en esta sección las acciones vinculadas a las mejoras y en que circunstancias se están realizando o realizaran, que permita al lector del informe tener conocimiento de la OM'
                            onChange={handleChangeObservaciones}
                            initialValues={pm?.observaciones}/>

                        {/**ESTADO */}
                        <InputSelect 
                            name="pm-estado"
                            label='ESTADO (13)'
                            description='Registrar algunas de las siguientes alternativas: Planificado, Programado, Reprogramado, En proceso o Concluido'
                            optionsRute='estados'
                            onChange={handleChangeEstado}
                            initialValue={pm?.estado}/>

                        {/**EVIDENCIAS */}
                        { editing ? 
                            (<InputEvidencias 
                                name='pm-evidencias'
                                label='EVIDENCIAS (14)'
                                descripcion='Aca se gestionan las evidencias, estas se actualizan de manera inmendiata sin tener que dar en "Guardar"'
                                initialValues={pm?.evidencias}
                                idPM={pm?.id}/>) 
                            : (<>
                                <Label label={'EVIDENCIAS (14)'} descripcion='Las evidencias se gestionan en editar el PM' />
                                <span>Las evidencias se gestionan en editar plan de mejora</span>
                                </>)}

                        {/**AVANCE */}
                        <InputAvance 
                            name='avance'
                            label='AVANCE (15)'
                            description='Introduce el avance del plan de mejora'
                            onChange={formik.handleChange}
                            initialValue={pm?.avance}/>

                        {/**EFICACIA */}
                        <InputEficacia 
                            name='evaluacion_eficacia'
                            label='EFICACIA (16)'
                            descripcion='Selecciona si el plan de mejora es una eficacia'
                            onChange={formik.handleChange}
                            initialValue={pm?.evaluacion_eficacia}/>
                    </div>

                    {/** Form footer buttons and etc */}
                    <hr />
                    <div className="form-footer">
                        <button type="submit"> <i class="fa-solid fa-floppy-disk"></i> Guardar</button>
                    </div>

                </form>

                <Modal show={modal} type='info' onClose={onCloseModalHandle} title={modalInfo.title}>
                    <div className='flex flex-col justify-center items-center'>
                        <i className={modalInfo.icon}></i>
                        {modalInfo.body}
                    </div>
                </Modal>
        </>
    );

}