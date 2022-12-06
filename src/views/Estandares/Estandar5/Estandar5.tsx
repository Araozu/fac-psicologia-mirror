import React from "react";

// components
import HeaderStandard from "@/components/Headers/HeaderStandard";

import CardPlanesMejora from "../components/Cards/CardPlanesMejora";
import Tabs from "@/components/Tabs/Tabs";
import CardNarrativas from "@/views/Estandares/components/Cards/CardNarrativas";
import CardIndicadores from "@/views/Estandares/components/Cards/CardIndicadores";

export default function Estandar5() {
    const listTabs = ["narrativa", "planes de mejora", "indicadores"];
    const comp = [
        <CardNarrativas pathNarrativa="estandar5" idEstandar={5} />,
        <CardPlanesMejora nombreEstandar="E-5" />,
        <CardIndicadores nombreEstandar="E-5" />,
    ];

    // Los componentes del estandar estan definidos en /src/layouts/Admin/Admin.tsx
    return (
        <>
            <div className="w-full mb-12">
                <HeaderStandard titulo="Estandar 5" descripcion="Pertinencia del Perfil de Egreso" estandar={5} />
                <Tabs headers={listTabs} components={comp} />
            </div>
        </>
    );
}
