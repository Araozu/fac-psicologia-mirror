import React from "react";

// components
import CardPlanesMejora from "@/views/Estandares/Estandar8/Cards/CardPlanesMejora";
import HeaderStandard from "@/components/Headers/HeaderStandard";
import CardNarrativas from "@/views/Estandares/Estandar8/Cards/CardNarrativas";

export default function Estandar8() {
    return (
        <>
            <div className="w-full mb-12">
                <HeaderStandard titulo="Estandar 8" descripcion="Estándar para la gestión de calidad" />
                <div className="relative px-4" style={{top: "-6rem"}}>
                    <CardNarrativas />
                </div>
            </div>
        </>
    );
}
