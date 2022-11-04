import HeaderEstandar8 from "@/views/Estandares/Estandar8/Headers/HeaderEstandar8";
// @ts-ignore
import DetallePM from "@/views/Estandares/Estandar8/Detalle/DetallePM";
import {useParams} from "react-router-dom";
import ContentWrapper from "@/components/ContentWrapper";

export default function() {
    const {codigo} = useParams<{codigo: string}>();

    return (
        <div>
            <HeaderEstandar8
                titulo="Detalles del Plan de Mejora"
                descripcion="Aqui puedes observar los detalles del plan de mejora y sus evidencias"
            />
            <ContentWrapper>
                <DetallePM id={codigo} />
            </ContentWrapper>
        </div>
    );
}
