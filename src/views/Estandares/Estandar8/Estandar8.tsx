import React, {useEffect} from "react";

// components
import CardPlanesMejora from "@/views/Estandares/Estandar8/Cards/CardPlanesMejora";
import HeaderStandard from "@/components/Headers/HeaderStandard";

import Tabs from "@/components/Tabs/Tabs";
import CardNarrativas from "@/views/Estandares/Estandar8/Cards/CardNarrativas";
import {SERVER_PATH} from "@/variables";

export default function Estandar8() {
    useEffect(() => {
        fetch(`${SERVER_PATH}/api/estandares`)
            .then((x) => x.json())
            .then(console.log);
    }, []);


    const listTabs = ["planes de mejora", "narrativa", "acciones de mejora"];
    const comp = [<CardPlanesMejora/>, <CardNarrativas/>];

    return (
        <>
            <div className="w-full mb-12">
                <HeaderStandard titulo="Estandar 8" descripcion="Estándar para la gestión de calidad"/>
                <Tabs headers={listTabs} components={comp}/>
            </div>
        </>
    );
}
