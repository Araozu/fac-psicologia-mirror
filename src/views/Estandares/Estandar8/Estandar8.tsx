import React from "react";

// components
import HeaderStandard from "@/components/Headers/HeaderStandard";

import CardPlanesMejora from "./Cards/CardPlanesMejora";
import Tabs from "@/components/Tabs/Tabs";
import CardNarrativas from "@/views/Estandares/Estandar8/Cards/CardNarrativas";

export default function Estandar8() {
    const listTabs = ["planes de mejora", "narrativa"];
    const comp = [<CardPlanesMejora />, <CardNarrativas />];

    return (
        <>
            <div className="w-full mb-12">
                <HeaderStandard titulo="Estandar 8" descripcion="Estándar para la gestión de calidad" />
                <Tabs headers={listTabs} components={comp} />
            </div>
        </>
    );
}
