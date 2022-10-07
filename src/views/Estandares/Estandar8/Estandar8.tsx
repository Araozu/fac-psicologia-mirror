import React from "react";

// components
import CardPlanesMejora from "@/components/Cards/CardPlanesMejora";
import HeaderStandard from "@/components/Headers/HeaderStandard";

export default function Estandar8() {
    return (
        <>
            <div className="w-full mb-12">
                <HeaderStandard titulo="Estandar 8" descripcion="Estándar para la gestión de calidad" />
                <div className="relative px-4" style={{top: "-6rem"}}>
                    <CardPlanesMejora />
                </div>
            </div>
        </>
    );
}
