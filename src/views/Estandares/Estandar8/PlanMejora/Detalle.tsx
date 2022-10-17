import HeaderEstandar8 from "@/views/Estandares/Estandar8/Headers/HeaderEstandar8";
// @ts-ignore
import DetallePM from "@/views/Estandares/Estandar8/Detalle/DetallePM";
import {useParams} from "react-router-dom";

export default function() {
    const {codigo} = useParams<{codigo: string}>();

    return (
        <div>
            <HeaderEstandar8 titulo="Detalle del Plan de Mejora" />
            <div className="relative px-4" style={{top: "-6rem"}}>
                <DetallePM id={codigo} />
            </div>
        </div>
    );
}
