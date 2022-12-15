import axios from "axios";
import React from "react";
import {SERVER_PATH} from "@/variables";

export default function ItemEvidencia(props: any) {
    const {
        id,
        denominacion,
        indexOnList,
        onDelete,
    } = props;

    const download_url = `${SERVER_PATH}/api/evidencia/download/${id}`;

    const handleDownload = () => {
        const token = localStorage.getItem("access_token");


        axios({
            url: download_url, //your url
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`},
            responseType: "blob", // important
        })
            .then((response) => {
                //let mimeType = String(response.headers['content-type']);
                //const db = require('mime-db')
                //let extension = db['text/plain']?.extensions[0];
                //console.log(extension)
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `${denominacion}`); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="form-input-buttons-group secondary">
                <input
                    key={id} id={id} disabled value={`${denominacion}`} type="text"
                    className={"form-input-text"}
                />
                <a onClick={handleDownload} className="ml-2 mr-2 download-a" download>DESCARGAR</a>
                <a
                    className="form-icon-button form-delete-button"
                    onClick={(e) => {
                        onDelete(id, indexOnList);
                    }}
                >
                    <i className="fa-solid fa-trash" />
                </a>
            </div>
        </>
    );
}
