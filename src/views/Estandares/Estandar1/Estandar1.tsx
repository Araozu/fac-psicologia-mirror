import React from "react";

// components
import HeaderStandard from "@/components/Headers/HeaderStandard";

import CardPlanesMejora from "../components/Cards/CardPlanesMejora";
import Tabs from "@/components/Tabs/Tabs";
import CardNarrativas from "@/views/Estandares/components/Cards/CardNarrativas";
import CardIndicadores from "@/views/Estandares/components/Cards/CardIndicadores";

export default function Estandar1() {
    const listTabs = ["narrativa", "planes de mejora", "indicadores"];
    const comp = [
        <CardNarrativas pathNarrativa="estandar1" idEstandar={1} />,
        <CardPlanesMejora nombreEstandar="E-1" />,
        <CardIndicadores nombreEstandar="E-1" />,
    ];

    // Los componentes del estandar estan definidos en /src/layouts/Admin/Admin.tsx
    return (
        <>
            <div className="w-full mb-12">
                <HeaderStandard titulo="Estandar 1" descripcion="Propositos Articulados" estandar={1} />
                <Tabs headers={listTabs} components={comp} />
            </div>
        </>
    );
}
