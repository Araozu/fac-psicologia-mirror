import HeaderEstandar from "@/views/Estandares/components/Headers/HeaderEstandar";
import FormPM from "@/components/Form/FormPM";

// Usar CrearPM.tsx

// TODO: Este componente ya no se usa, eliminar?
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
