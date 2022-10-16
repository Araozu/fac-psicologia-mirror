import HeaderPlanMejora from "@/views/Estandares/Estandar8/PlanMejora/HeaderPlanMejora";
// @ts-ignore
import DetallePM from "@/views/Estandares/Estandar8/Detalle/DetallePM";
import {useParams} from "react-router-dom";

export default function() {
    const {codigo} = useParams<{codigo: string}>();

    return (
        <div>
            <HeaderPlanMejora titulo="Detalle del Plan de Mejora" />
            <div className="relative px-4" style={{top: "-6rem"}}>
                <DetallePM id={codigo} />
            </div>
        </div>
    );
}
