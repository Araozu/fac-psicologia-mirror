import HeaderEstandar8 from "@/views/Estandares/Estandar8/Headers/HeaderEstandar8";
// @ts-ignore
import FormPM from "@/components/Form/FormPM";

export default function CrearPlanMejora() {
    return (
        <div>
            <HeaderEstandar8 titulo="Crear Plan de Mejora para el Estandar 8" />
            <div className="relative px-4" style={{top: "-6rem"}}>
                <FormPM />
            </div>
        </div>
    );
}
