import React from "react";

// components
import HeaderStandard from "@/components/Headers/HeaderStandard";

import CardPlanesMejora from "../components/Cards/CardPlanesMejora";
import Tabs from "@/components/Tabs/Tabs";
import CardNarrativas from "@/views/Estandares/components/Cards/CardNarrativas";
import CardIndicadores from "@/views/Estandares/components/Cards/CardIndicadores";

export default function Estandar4() {
    const listTabs = ["narrativa", "planes de mejora", "indicadores"];
    const comp = [
        <CardNarrativas pathNarrativa="estandar4" idEstandar={4} />,
        <CardPlanesMejora nombreEstandar="E-4" />,
        <CardIndicadores nombreEstandar="E-4" />,
    ];

    // Los componentes del estandar estan definidos en /src/layouts/Admin/Admin.tsx
    return (
        <>
            <div className="w-full mb-12">
                <HeaderStandard titulo="Estandar 4" descripcion="Sostenibilidad" />
                <Tabs headers={listTabs} components={comp} />
            </div>
        </>
    );
}
