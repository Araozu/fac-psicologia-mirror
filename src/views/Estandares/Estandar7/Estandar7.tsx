import React from "react";

// components
import HeaderStandard from "@/components/Headers/HeaderStandard";

import CardPlanesMejora from "../components/Cards/CardPlanesMejora";
import Tabs from "@/components/Tabs/Tabs";
import CardNarrativas from "@/views/Estandares/components/Cards/CardNarrativas";
import CardIndicadores from "@/views/Estandares/components/Cards/CardIndicadores";

export default function Estandar7() {
    const listTabs = ["narrativa", "planes de mejora", "indicadores"];
    const comp = [
        <CardNarrativas pathNarrativa="estandar7" idEstandar={7} />,
        <CardPlanesMejora nombreEstandar="E-7" />,
        <CardIndicadores nombreEstandar="E-7" />,
    ];

    // Los componentes del estandar 8 estan definidos en /src/layouts/Admin/Admin.tsx
    return (
        <>
            <div className="w-full mb-12">
                <HeaderStandard titulo="Estandar 7" descripcion="Sistema de Gestión de la Calidad" estandar={7} />
                <Tabs headers={listTabs} components={comp} />
            </div>
        </>
    );
}
