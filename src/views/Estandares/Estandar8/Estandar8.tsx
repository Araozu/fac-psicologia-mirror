import React from "react";

// components
import HeaderStandard from "@/components/Headers/HeaderStandard";

import CardPlanesMejora from "../components/Cards/CardPlanesMejora";
import Tabs from "@/components/Tabs/Tabs";
import CardNarrativas from "@/views/Estandares/components/Cards/CardNarrativas";
import CardIndicadores from "@/views/Estandares/Estandar8/Cards/CardIndicadores";

export default function Estandar8() {
    const listTabs = ["narrativa", "planes de mejora", "indicadores"];
    const comp = [
        <CardNarrativas pathNarrativa="estandar8" idEstandar={8} />,
        <CardPlanesMejora nombreEstandar="E-8" />,
        <CardIndicadores />,
    ];

    return (
        <>
            <div className="w-full mb-12">
                <HeaderStandard titulo="Estandar 8" descripcion="Estándar para la gestión de calidad" />
                <Tabs headers={listTabs} components={comp} />
            </div>
        </>
    );
}
