import HeaderEstandar from "@/views/Estandares/Estandar8/Headers/HeaderEstandar";

import InputText from "@/components/Form/Components/InputText";
import type {Editor} from "@/types/tinymce";
import React, {useState} from "react";
import "./CrearNarrativa.css";
import axios from "axios";
import {SERVER_PATH} from "@/variables";

import Modal from "@/components/modals/Modal";
import {useHistory} from "react-router";
import ContentWrapper from "@/components/ContentWrapper";
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


type Props = {
    // Id del estandar del cual crear narrativas, por defecto `8`
    idEstandar?: number,
    // Nombre del estandar, por defecto "Estandar 8"
    nombreEstandar?: string,
}

/**
 * Componente generico para crear una narrativa. Se configura mediante los props.
 */
export default function CrearNarrativa(props: Props) {
    const {idEstandar = 8, nombreEstandar = "Estandar 8"} = props;

    const tinyEditorRef = React.useRef<Editor>();
    const textareaRef = React.createRef<HTMLTextAreaElement>();

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

            return () => {
                try {
                    // Esto deberia eliminar el editor, pero por alguna razon a veces no funciona
                    tinymce.remove(tinyEditorRef.current!);
                } catch (e) {
                    //
                } finally {
                    // Eliminar script de Tiny y volver a cargarlo,
                    // para "solucionar" error del editor al salir y volver a entrar
                    /*
                    const tinyel = document.querySelector(".tox-tinymce-aux")!;
                    tinyel.parentElement!.removeChild(tinyel);

                    // @ts-ignore
                    if (window.tinyElRef === undefined) {
                        const el = document.getElementById("tiny-script-ref")!;
                        el.parentElement!.removeChild(el);
                    } else {
                        // @ts-ignore
                        const el = window.tinyElRef;
                        el.parentElement!.removeChild(el);
                    }

                    const scriptEl = document.createElement("script");
                    scriptEl.src = "/tinymce.min.js";
                    scriptEl.id = "tiny-script-ref";

                    document.body.appendChild(scriptEl);
                    // @ts-ignore
                    window.tinyElRef = scriptEl;

                     */
                }
            };
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
        if (modalInfo.estado === "ok") history.go(-1);
    };

    const crearNarrativa = () => {
        const token = localStorage.getItem("access_token");

        const values = {
            // TODO: Usar el ID del estandar en vez de un valor fijo
            id_estandar: idEstandar,
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
            <HeaderEstandar
                titulo={`Crear Narrativa ${nombreEstandar}`}
                descripcion={`Crear una nueva narrativa del ${nombreEstandar}`}
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


                    <textarea ref={textareaRef} rows={20} />

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
