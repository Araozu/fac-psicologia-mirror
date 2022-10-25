import React, {useEffect} from "react";

// components
import CardPlanesMejora from "@/views/Estandares/Estandar8/Cards/CardPlanesMejora";
import HeaderStandard from "@/components/Headers/HeaderStandard";

import Tabs from "@/components/Tabs/Tabs";
import CardNarrativas from "@/views/Estandares/Estandar8/Cards/CardNarrativas";
import {SERVER_PATH} from "@/variables";

export default function Estandar8() {;
    const listTabs = ["planes de mejora", "narrativa", "acciones de mejora"];
    const comp = [<CardPlanesMejora/>, <CardNarrativas/>, <></>];

    return (
        <>
            <div className="w-full mb-12 bg-blueGray-100">
                <HeaderStandard titulo="Estandar 8" descripcion="Gestion de planes de mejora"/>
                <Tabs headers={listTabs} components={comp}/>
            </div>
        </>
    );
}
