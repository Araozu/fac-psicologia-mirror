import HeaderEstandar from "@/views/Estandares/components/Headers/HeaderEstandar";
import React from "react";
import {SERVER_PATH} from "@/variables";
import {useParams} from "react-router-dom";
import {IframeActa} from "@/views/Estandares/components/Actas/IframeActa";

// Los datos que el servidor devuelve cuando se pide una narrativa
export type DataNarrativaServer = {
    id: number, // Id de la narrativa
    id_estandar: number,
    semestre: string, // 2022-A
    contenido: string, // El HTML de la narrativa
    created_at: string,
    updated_at: string,
}

type Props = {
    // Nombre del estandar, por defecto "Estandar 8"
    nombreEstandar?: string,
}
export default function DetalleActa(props: Props) {
    const {nombreEstandar = "Estandar 8"} = props;

    const {codigo} = useParams<{codigo: string}>();
    const [data, setData] = React.useState<DataNarrativaServer | null>(null);

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
            });
    }, []);

    return (
        <div>
            <HeaderEstandar
                titulo={`Detalle de Narrativa del ${nombreEstandar}`}
            />

            <div className="relative px-4" style={{top: "-6rem"}}>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded px-5">
                    {data === null ? <></> : (
                        <h2 className="titulo-formulario">Narrativa {data.semestre}</h2>
                    )}
                    <hr />
                    <div className="contenedor-narrativa">
                        <IframeActa html={data?.contenido ?? ""} />
                    </div>
                    <div>&nbsp;</div>
                </div>
            </div>
        </div>
    );
}
