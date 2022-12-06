import React from "react";

// components
import HeaderStandard from "@/components/Headers/HeaderStandard";

import CardPlanesMejora from "../components/Cards/CardPlanesMejora";
import Tabs from "@/components/Tabs/Tabs";
import CardNarrativas from "@/views/Estandares/components/Cards/CardNarrativas";
import CardIndicadores from "@/views/Estandares/components/Cards/CardIndicadores";

export default function Estandar3() {
    const listTabs = ["narrativa", "planes de mejora", "indicadores"];
    const comp = [
        <CardNarrativas pathNarrativa="estandar3" idEstandar={3} />,
        <CardPlanesMejora nombreEstandar="E-3" />,
        <CardIndicadores nombreEstandar="E-3" />,
    ];

    // Los componentes del estandar estan definidos en /src/layouts/Admin/Admin.tsx
    return (
        <>
            <div className="w-full mb-12">
                <HeaderStandard titulo="Estandar 3" descripcion="Revisión Periodica de las Políticas y Objetivos" estandar={3} />
                <Tabs headers={listTabs} components={comp} />
            </div>
        </>
    );
}
