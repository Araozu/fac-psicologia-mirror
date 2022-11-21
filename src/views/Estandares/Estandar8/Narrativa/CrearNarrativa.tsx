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
import ContentWrapper from "@/components/ContentWrapper";
import InputSelect from "@/components/Form/Components/InputSelect";
import Label from "@/components/Form/Components/Label/Label";
import Select from "react-select";

function arrayAnios(initial: number): Array<number> {
    const current = new Date().getFullYear();
    const arr = [];
    for (let i = initial; i <= current + 1; i += 1) {
        arr.push(i);
    }
    return arr;
}

export default function CrearNarrativa() {
    const tinyEditorRef = React.useRef<Editor>();

    // Configurar tinymce al cargar el componente
    React.useEffect(
        () => {
            const token = localStorage.getItem("access_token");

            // Inicializar editor Tiny
            const promesaTiny = tinymce.init({
                selector: "#tiny-editor",
                plugins: "anchor link image lists table",
                language: "es_MX",
                toolbar: "undo redo | fontfamily fontsize | bold italic underline forecolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent removeformat",
            });

            // Cargar datos de la última narrativa
            /* TODO: Usar ID del estandar en vez de '8'
            const promesaUltimaNarrativa = axios.get(`${SERVER_PATH}/api/narrativa/ultima/9`, {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
             */

            Promise.all([promesaTiny])
                .then(([editors]) => {
                    tinyEditorRef.current = editors[0];
                    const contenido = localStorage.getItem("ultima-narrativa-contenido") ?? "";
                    editors[0].setContent(contenido);
                });
        },
        [],
    );

    const [anio, setAnio] = React.useState({value: "2022", label: "2022"});
    const [semestre, setSemestre] = React.useState({value: "A", label: "A"});

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

    const crearNarrativa = () => {
        const token = localStorage.getItem("access_token");

        const values = {
            // TODO: Usar el ID del estandar en vez de un valor fijo
            id_estandar: 8,
            semestre: `${anio.value}-${semestre.value}`,
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
            <ContentWrapper>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded px-5">
                    <h2 className="titulo-formulario">Formulario de creación de Narrativa</h2>

                    <hr />

                    <div className="contenedor-form" style={{position: "relative", zIndex: 10}}>
                        <Label label={"Año"} description={"El año del plan de mejora."} />
                        <Select
                            name={"anio-select"}
                            options={
                                /* @ts-ignore */
                                arrayAnios(2018).map((x) => ({label: x.toString(), value: x.toString()}))
                            }
                            value={anio}
                            onChange={(v) => {
                                // @ts-ignore
                                setAnio(v);
                            }}
                            isDisabled={false}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 10,
                            })}
                            className={"input-select-container"}
                        />

                        <Label label={"Semestre"} description={"El semestre del plan de mejora."} />
                        <Select
                            name={"semestre-select"}
                            options={
                                /* @ts-ignore */
                                [{value: "A", label: "A"}, {value: "B", label: "B"}]
                            }
                            value={semestre}
                            onChange={(v) => {
                                // @ts-ignore
                                setSemestre(v);
                            }}
                            isDisabled={false}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 10,
                            })}
                            className={"input-select-container"}
                        />
                    </div>


                    <textarea id="tiny-editor" rows={20} />

                    <div className="form-footer">
                        <button type="submit" onClick={crearNarrativa}>
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
