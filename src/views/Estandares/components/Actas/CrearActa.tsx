import HeaderEstandar from "@/views/Estandares/components/Headers/HeaderEstandar";

import type {Editor} from "@/types/tinymce";
import React, {useState} from "react";
import "./CrearActa.css";
import axios from "axios";
import {SERVER_PATH} from "@/variables";

import Modal from "@/components/modals/Modal";
import {useHistory} from "react-router";
import ContentWrapper from "@/components/ContentWrapper";
import Label from "@/components/Form/Components/Label/Label";

import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";



type Props = {
    // Id del estandar del cual crear actas, por defecto `8`
    idEstandar?: number,
    // Nombre del estandar, por defecto "Estandar 8"
    nombreEstandar?: string,
}

/**
 * Componente generico para crear una acta. Se configura mediante los props.
 */
export default function CrearActa(props: Props) {
    const {idEstandar = 8, nombreEstandar = "Estandar 8"} = props;

    const tinyEditorRef = React.useRef<Editor>();
    const textareaRef = React.createRef<HTMLTextAreaElement>();

    const [date, setDate] = useState(new Date());

    // Configurar tinymce al cargar el componente
    React.useEffect(
        () => {
            const token = localStorage.getItem("access_token");

            // Inicializar editor Tiny
            const promesaTiny = tinymce.init({
                target: textareaRef.current!,
                plugins: "anchor link image lists table",
                language: "es_MX",
                toolbar: "undo redo | fontfamily fontsize | bold italic underline forecolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent removeformat",
            });

            Promise.all([promesaTiny])
                .then(([editors]) => {
                    tinyEditorRef.current = editors[0];
                });

            return () => {
                try {
                    // Esto deberia eliminar el editor, pero por alguna razon a veces no funciona
                    tinymce.remove(tinyEditorRef.current!);
                } catch (e) {
                    //
                } finally {
                    // Eliminar script de Tiny y volver a cargarlo,
                    // para "solucionar" error del editor al salir y volver a entrar
                }
            };
        },
        [],
    );

    const history = useHistory();
    const [modal, setModal] = useState(false);

    const modalSuccess = {
        estado: "ok",
        icon: "fa-solid fa-circle-check icon-large success",
        title: "Operacion exitosa",
        body: "Se guardaron los cambios con exito",
        type: "info",
    };

    const modalError = {
        estado: "false",
        icon: "fa-solid fa-circle-exclamation icon-large error-icon",
        title: "Operacion fallida",
        body: "No se guardaron los cambios",
        type: "info",
    };

    const [modalInfo, setModalInfo] = useState(modalSuccess);

    const onCloseModalHandle = () => {
        setModal(false);
        if (modalInfo.estado === "ok") history.go(-1);
    };

    const crearActa = () => {
        const token = localStorage.getItem("access_token");

        const values = {
            id_estandar: idEstandar,
            fecha: `${date.toISOString()}`,
            descripcion: tinyEditorRef.current?.getContent().replaceAll("<a", "<a target=\"_blank\" rel=\"noopener noreferrer\""),
        };

        axios.post(`${SERVER_PATH}/api/acta`, values, {
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                setModalInfo(modalSuccess);
            })
            .catch(() => {
                setModalInfo(modalError);
            })
            .finally(() => {
                setModal(true);
            });
    };

    return (
        <div>
            <HeaderEstandar
                titulo={`Crear Acta ${nombreEstandar}`}
                descripcion={`Crear una nueva acta del ${nombreEstandar}`}
            />
            <ContentWrapper>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded px-5">
                    <h2 className="titulo-formulario">Formulario de creación de Acta</h2>

                    <hr />

                    <div className="contenedor-form" style={{position: "relative", zIndex: 10}}>
                        <Label label={"Fecha"} description={"La fecha del acta."} />
                        <DatePicker onChange={setDate} value={date} locale="es-ES" />
                    </div>


                    <textarea ref={textareaRef} rows={20} />

                    <div className="form-footer">
                        <button type="submit" onClick={crearActa}>
                            <i className="fa-solid fa-floppy-disk" /> Guardar
                        </button>
                    </div>
                </div>
            </ContentWrapper>

            <Modal show={modal} type='info' onClose={onCloseModalHandle} title={modalInfo.title}>
                <div className='flex flex-col justify-center items-center'>
                    <i className={modalInfo.icon} />
                    {modalInfo.body}
                </div>
            </Modal>
        </div>
    );
}
