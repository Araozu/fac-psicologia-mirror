import React from "react";

// components
import HeaderStandard from "@/components/Headers/HeaderStandard";

import CardPlanesMejora from "./components/Cards/CardPlanesMejora";
import Tabs from "@/components/Tabs/Tabs";
import CardNarrativas from "@/views/Estandares/components/Cards/CardNarrativas";
import CardIndicadores from "@/views/Estandares/components/Cards/CardIndicadores";
import CardActas from "@/views/Estandares/components/Cards/CardActas";

type Props = {
    /** Ruta del estandar en el router. Ejm: "estandar1" */
    path: string,

    /** Id del estandar como esté en la base de datos. Ejm: 1 */
    idEstandar: number,

    /**
     * Sección inicial del nombre del estandar, como este en la base de datos.
     *
     * La ruta `${SERVER_PATH}/api/estandares` devuelve una lista de estandares.
     * Por ejemplo, del estandar 1 devuelve:
     *
     * ```
     * {
     *     id: 1,
     *     name: "E-1 Propositos Articulados",
     *     ...
     * }
     * ```
     *
     * Para el estandar 1 el valor de este prop debe ser `E-1`. Para otros
     * estandares será entonces `E-2`, `E-3`, etc.
     */
    nombreEstandar: string,

    /** Título del estandar que se muestra en la interfaz. Ejm. "Estandar 1" */
    tituloEstandar: string,

    /** Descripción del estandar. Ejm. "Propositos Articulados" */
    descripcionEstandar: string,
}

/**
 * Este componente encapsula los componentes de los estándares.
 */
export default function EstandarConfigurable(props: Props) {
    const listTabs = ["narrativa", "planes de mejora", "indicadores", "actas"];
    const comp = [
        <CardNarrativas pathNarrativa={props.path} idEstandar={props.idEstandar} />,
        <CardPlanesMejora nombreEstandar={props.nombreEstandar} path={props.path} />,
        <CardIndicadores nombreEstandar={props.nombreEstandar} />,
        <CardActas pathActas={props.path} idEstandar={props.idEstandar} />,
    ];

    // Los componentes del estandar estan definidos en /src/layouts/Admin/Admin.tsx
    return (
        <>
            <div className="w-full mb-12">
                <HeaderStandard
                    titulo={props.tituloEstandar}
                    descripcion={props.descripcionEstandar}
                    estandar={props.idEstandar}
                />
                <Tabs headers={listTabs} components={comp} />
            </div>
        </>
    );
}
