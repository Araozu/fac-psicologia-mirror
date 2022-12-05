import React, {useState} from "react";
import ItemEvidencia from "./ItemEvidencia";
import axios from "axios";

import Label from "./Label/Label";
import {SERVER_PATH} from "@/variables";

export default function InputEvidencias(props: any) {
    const {
        name,
        label,
        description,
        initialValues,
        idPM,
    } = props;
    //TODO: Usar el initialValues
    const [values, setValues] = useState(initialValues);

    const [loading, setLoading] = useState(false);

    //TODO: HANDLE ADD
    //TODO: MANEJAR ESTADO DE LOADING
    const handleAdd = () => {
        const inputDenominacion: any = document.getElementById(`${name}-deno`);
        const inputFile: any = document.getElementById(`${name}-file`);

        //Validamos que estan correctos los campos para mandar la peticion a axios
        if (inputFile.files[0] !== undefined || inputDenominacion.value.trim() !== "") {
            const token = localStorage.getItem("access_token");
            setLoading(true);
            const formData = new FormData();
            formData.append("id_plan", idPM);
            formData.append("codigo", "E-OM-01:2022-03");
            formData.append("denominacion", inputDenominacion.value);
            formData.append("adjunto", inputFile.files[0]);

            // Display the key/value pairs
            for (const pair of formData.entries()) {
                console.log(`${pair[0]}, ${pair[1]}`);
            }

            axios.post(
                `${SERVER_PATH}/api/evidencia`,
                formData, {
                    headers: {
                        //"Content-Type": 'multipart/form-data',
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
                .then(function(response) {

                    const evidencia = response.data.evidencia;
                    setValues([...values, {
                        id: evidencia?.id,
                        denominacion: evidencia?.denominacion,
                    }]);

                    setLoading(false);

                })
                .catch(function(error) {

                    setLoading(false);

                });
        }
    };

    const handleDelete = (id: any, index: any) => {
        //TODO: MANEJAR ESTADO DE LOADING MIENTRAS REALIZA CONSULTA A LA API
        setLoading(true);
        const token = localStorage.getItem("access_token");
        console.log(id);
        axios.delete(
            `https://pis-project-api.up.railway.app/api/evidencia/${id}`,
            {
                headers: {
                    //"Content-Type": 'multipart/form-data',
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            },
        )
            .then((res) => {
                const newValues = [...values];
                newValues.splice(index, 1);
                setValues(newValues);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <Label label={label} description={description} />
            <div>
                <div className="form-input-buttons-group">
                    <input type="text" id={`${name}-deno`} className="form-input-text"
                        placeholder="Ingresa una denominacion" disabled={loading}
                    />
                    {/**<input className="inline-block ml-1 w-full text-s text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400" id="small_size" type="file"/>*/}
                    <input
                        className="block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id={`${name}-file`} type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx" disabled={loading}
                    />
                    {/* @ts-ignore */}
                    <a className="form-icon-button form-add-button" onClick={handleAdd} disabled={loading}>
                        <i
                            className="fa-solid fa-plus"
                        />
                    </a>
                </div>
                <hr />
                <div className="input-list-container">
                    {values?.map((item: any, i: any) => (<ItemEvidencia key={item.id} id={item.id}
                        denominacion={item.denominacion} indexOnList={i}
                        onDelete={handleDelete}
                    />))}
                </div>
            </div>
        </>
    );
}
