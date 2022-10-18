import React from "react";


// components
import HeaderStandard from "@/components/Headers/HeaderStandard";
import CardPlanesMejora from "@/components/Cards/CardPlanesMejora";
import Tabs from "@/components/Tabs/Tabs";

export default function Estandar8() {

    const listTabs = ["planes de mejora", "narrativa", "acciones de mejora"];
    const comp = [<CardPlanesMejora/>, "Narrativas"];

    return (
        <>
            <div className="w-full mb-12">
                <HeaderStandard titulo="Estandar 8" descripcion="Estándar para la gestión de calidad"/>
                <Tabs headers={listTabs} components={comp}/>
            </div>
        </>
    );
}


