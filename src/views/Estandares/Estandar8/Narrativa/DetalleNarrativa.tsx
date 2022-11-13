import HeaderEstandar8 from "@/views/Estandares/Estandar8/Headers/HeaderEstandar8";
import React from "react";
import {SERVER_PATH} from "@/variables";
import {useParams} from "react-router-dom";

// Los datos que el servidor devuelve cuando se pide una narrativa
export type DataNarrativaServer = {
    id: number, // Id de la narrativa
    id_estandar: number,
    semestre: string, // 2022-A
    contenido: string, // El HTML de la narrativa
    created_at: string,
    updated_at: string,
}

export default function DetalleNarrativa() {
    const {codigo} = useParams<{codigo: string}>();
    const [data, setData] = React.useState<DataNarrativaServer | null>(null);
    const iframeRef = React.createRef<HTMLIFrameElement>();

    React.useEffect(() => {
        const token = localStorage.getItem("access_token");

        fetch(`${SERVER_PATH}/api/narrativa/${codigo}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((dataServer) => {
                setData(dataServer.data);
                iframeRef.current?.contentDocument?.write(dataServer.data.contenido);
            });
    }, []);

    return (
        <div>
            <HeaderEstandar8
                titulo="Detalle de Narrativa del Estandar 8"
            />

            <div className="relative px-4" style={{top: "-6rem"}}>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded px-5">
                    {data === null ? <></> : (
                        <h2 className="titulo-formulario">Narrativa {data.semestre}</h2>
                    )}
                    <hr />
                    <div className="contenedor-narrativa">
                        <iframe style={{width: "100%"}} ref={iframeRef} />
                    </div>
                    <div>&nbsp;</div>
                </div>
            </div>
        </div>
    );
}
