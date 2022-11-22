import React, {useState} from "react";
import type {Editor} from "@/types/tinymce";
import HeaderEstandar8 from "@/views/Estandares/Estandar8/Headers/HeaderEstandar8";

import InputText from "@/components/Form/Components/InputText";

import Modal from "@/components/modals/Modal";
import {useHistory} from "react-router";
import {SERVER_PATH} from "@/variables";
import {useParams} from "react-router-dom";
import {DataNarrativaServer} from "@/views/Estandares/Estandar8/Narrativa/DetalleNarrativa";
import axios from "axios";

export default function EditarNarrativa() {
    const tinyEditorRef = React.useRef<Editor>();
    const {codigo} = useParams<{codigo: string}>();
    const [narrativaId, setNarrativaId] = React.useState(-1);
    const [semestre, setSemestre] = React.useState("Cargando...");
    const history = useHistory();

    React.useEffect(() => {
        // Inicializar tinymcl
        tinymce.init({
            selector: "#tiny-editor",
            plugins: "anchor link image lists table",
            language: "es_MX",
            toolbar: "undo redo | fontfamily fontsize | bold italic underline forecolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent removeformat",
        })
            .then((editors) => {
                tinyEditorRef.current = editors[0];

                // Recuperar narrativa del servidor
                const token = localStorage.getItem("access_token");
                return fetch(`${SERVER_PATH}/api/narrativa/${codigo}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
            })
            .then((res) => res.json())
            .then((dataServer) => {
                const d = dataServer.data as DataNarrativaServer;
                setNarrativaId(d.id);
                setSemestre(d.semestre);
                tinyEditorRef.current?.setContent(d.contenido);
            });
    },[]);

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
        if (modalInfo.estado === "ok") history.push("/admin/estandar8");
    };

    const editarNarrativa = () => {
        const token = localStorage.getItem("access_token");

        const values = {
            id: narrativaId,
            contenido: tinyEditorRef.current?.getContent(),
        };
        axios.put(`${SERVER_PATH}/api/narrativa`, values, {
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
            <HeaderEstandar8 titulo="Editar Narrativa" />
            <div className="relative px-4" style={{top: "-6rem"}}>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded px-5">
                    <h2 className="titulo-formulario">Formulario de edición de Narrativa</h2>

                    <hr />

                    <div className="contenedor-form">
                        <InputText
                            name="semestre"
                            label="Semestre"
                            description="El semestre del plan de mejora."
                            value={semestre}
                            disabled
                        />
                    </div>

                    <textarea id="tiny-editor" rows={20} />

                    <div className="form-footer">
                        <button type="submit" onClick={editarNarrativa}>
                            <i className="fa-solid fa-floppy-disk" /> Guardar
                        </button>
                    </div>
                </div>
            </div>

            <Modal show={modal} type='info' onClose={onCloseModalHandle} title={modalInfo.title}>
                <div className='flex flex-col justify-center items-center'>
                    <i className={modalInfo.icon} />
                    {modalInfo.body}
                </div>
            </Modal>
        </div>
    );
}
