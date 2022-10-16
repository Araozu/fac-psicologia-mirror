import HeaderPlanMejora from "@/views/Estandares/Estandar8/PlanMejora/HeaderPlanMejora";
// @ts-ignore
import FormPM from "@/components/Form/FormPM";

export default function Crear() {
    return (
        <div>
            <HeaderPlanMejora titulo="Crear Plan de Mejora para el Estandar 8" />
            <div className="relative px-4" style={{top: "-6rem"}}>
                <FormPM />
            </div>
        </div>
    );
}
