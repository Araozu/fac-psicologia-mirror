import HeaderEstandar from "@/views/Estandares/components/Headers/HeaderEstandar";
import React from "react";
import {SERVER_PATH} from "@/variables";
import {useParams} from "react-router-dom";
import {IframeActa} from "@/views/Estandares/components/Actas/IframeActa";
import {DataActa} from "@/views/Estandares/components/Cards/CardActas";


type Props = {
    // Nombre del estandar, por defecto "Estandar 8"
    nombreEstandar?: string,
}
export default function DetalleActa(props: Props) {
    const {nombreEstandar = "Estandar 8"} = props;

    const {codigo} = useParams<{codigo: string}>();
    const [data, setData] = React.useState<DataActa | null>(null);

    React.useEffect(() => {
        const token = localStorage.getItem("access_token");

        fetch(`${SERVER_PATH}/api/acta/${codigo}`, {
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

    const dateText = () => {
        if (data === null) {
            return "";
        } else {
            const date = new Date(data.fecha);
            return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
        }
    };

    return (
        <div>
            <HeaderEstandar
                titulo={`Detalle de Narrativa del ${nombreEstandar}`}
            />

            <div className="relative px-4" style={{top: "-6rem"}}>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded px-5">
                    {data === null ? <></> : (
                        <h2 className="titulo-formulario">Narrativa {dateText()}</h2>
                    )}
                    <hr />
                    <div className="contenedor-narrativa">
                        <IframeActa html={data?.descripcion ?? ""} />
                    </div>
                    <div>&nbsp;</div>
                </div>
            </div>
        </div>
    );
}
