import HeaderEstandar8 from "@/views/Estandares/Estandar8/Headers/HeaderEstandar8";
// @ts-ignore
import InputText from "@/components/Form/Components/InputText";
import type {Editor} from "@/types/tinymce";
import React, {useState} from "react";
import "./CrearNarrativa.css";
import axios from "axios";
import {SERVER_PATH} from "@/variables";
// @ts-ignore
import Modal from "@/components/modals/Modal";
import {useHistory} from "react-router";

export default function CrearNarrativa() {
    const tinyEditorRef = React.useRef<Editor>();

    // Configurar tinymce al cargar el componente
    React.useEffect(
        () => {
            tinymce.init({
                selector: "#tiny-editor",
                plugins: "anchor link image lists table",
                language: "es_MX",
                toolbar: "undo redo | fontfamily fontsize | bold italic underline forecolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent removeformat",
            })
                .then((editors) => {
                    tinyEditorRef.current = editors[0];
                });
        },
        [],
    );

    const [semestre, setSemestre] = React.useState("");
    const [errorSemestre, setErrorSemestre] = React.useState("");

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
        if (modalInfo.estado === "ok") history.push("/admin/estandar8");
    };

    // TODO: Input sanitization
    const crearNarrativa = () => {
        const token = localStorage.getItem("access_token");

        // Validar semestre
        // TODO: Usar Yup y formik?
        if (!/\d{4}-[ABC]$/.test(semestre.trim())) {
            setErrorSemestre("El semestre debe tener el formato 20XX-X.");
        }

        const values = {
            // TODO: Usar el ID del estandar en vez de un valor fijo
            id_estandar: 8,
            semestre,
            contenido: tinyEditorRef.current?.getContent(),
        };
        console.log(values);
        axios.post(`${SERVER_PATH}/api/narrativa`, values, {
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
            <HeaderEstandar8
                titulo="Crear Narrativa Estandar 8"
                descripcion="Crear una nueva narrativa del Estandar 8"
            />
            <div className="relative px-4" style={{top: "-6rem"}}>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded px-5">
                    <h2 className="titulo-formulario">Formulario de creación de Narrativa</h2>

                    <hr />

                    <div className="contenedor-form">
                        <InputText
                            name="semestre"
                            label="Semestre"
                            description="El semestre del plan de mejora. Ejm: 2022-B"
                            value={semestre}
                            error={errorSemestre}
                            onChange={(ev: any) => setSemestre(ev.target?.value)}
                        />
                    </div>


                    <textarea id="tiny-editor" rows={20} />

                    <div className="form-footer">
                        <button type="submit" onClick={crearNarrativa}>
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
