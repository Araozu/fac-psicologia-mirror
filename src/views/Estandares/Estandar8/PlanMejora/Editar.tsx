import HeaderEstandar from "@/views/Estandares/Estandar8/Headers/HeaderEstandar";
import EditarPM from "@/views/Estandares/Estandar8/Editar/EditarPM";
import {useParams} from "react-router-dom";
import ContentWrapper from "@/components/ContentWrapper";

export function Editar() {
    const {codigo} = useParams<{codigo: string}>();

    return (
        <div>
            <HeaderEstandar
                titulo="Editar Plan de Mejora"
                descripcion="En esta seccion puedes editar los detalles del plan de mejora"
                icono="fa-pen-to-square"
            />
            <ContentWrapper>
                <EditarPM id={codigo} />
            </ContentWrapper>
        </div>
    );
}
