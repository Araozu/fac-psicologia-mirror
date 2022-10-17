import HeaderEstandar8 from "@/views/Estandares/Estandar8/Headers/HeaderEstandar8";
// @ts-ignore
import EditarPM from "@/views/Estandares/Estandar8/Editar/EditarPM";
import {useParams} from "react-router-dom";

export function Editar() {
    const {codigo} = useParams<{codigo: string}>();

    return (
        <div>
            <HeaderEstandar8
                titulo="Editar Plan de Mejora"
                descripcion="En esta seccion puedes editar los detalles del plan de mejora"
                icono="fa-pen-to-square"
            />
            <div className="relative px-4" style={{top: "-6rem"}}>
                <EditarPM id={codigo} />
            </div>
        </div>
    );
}
