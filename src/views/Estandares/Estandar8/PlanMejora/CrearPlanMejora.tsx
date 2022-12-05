import HeaderEstandar from "@/views/Estandares/Estandar8/Headers/HeaderEstandar";
import FormPM from "@/components/Form/FormPM";

export default function CrearPlanMejora() {
    return (
        <div>
            <HeaderEstandar titulo="Crear Plan de Mejora para el Estandar 8" />
            <div className="relative px-4" style={{top: "-6rem"}}>
                <FormPM />
            </div>
        </div>
    );
}
