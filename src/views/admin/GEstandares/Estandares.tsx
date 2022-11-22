import React, {useEffect, useMemo, useState} from "react";
import ContentWrapper from "@/components/ContentWrapper";

import HeaderEstandar8 from "@/views/Estandares/Estandar8/Headers/HeaderEstandar8";

import {EstandarData, EstandarServer, estandarServerToData} from "@/views/admin/GEstandares/Interfaces/Estandar";
import {SERVER_PATH} from "@/variables";
import {ManagerRow} from "@/views/admin/GEstandares/Components/ManagerRow";


async function fetchTodoEstandares(): Promise<Array<EstandarData>> {
    const userToken = localStorage.getItem("access_token");

    const raw = await fetch(`${SERVER_PATH}/api/estandar-valores`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`,
        },
    });

    const dataObj: { data: Array<EstandarServer> } = await raw.json();
    return dataObj.data.map(estandarServerToData);
}

type EstandarProps = {
    producerFn?: () => Promise<Array<EstandarData>>
}

export default function(props: EstandarProps) {


    //seccion de tabla
    const [managers, setManagers] = useState<Array<EstandarData>>([]);
    const [reload, setReload] = useState(false);

    const loadManagers = () =>{
        setReload(true);
        (props.producerFn ?? fetchTodoEstandares)()
            .then((manager: Array<EstandarServer>)=>{
                setManagers(manager);
                setReload(false);
            });
    }
    useEffect(() => {
        loadManagers();
    }, []);
    const estandaresEls = useMemo(
        () => !reload && (managers.map((user, id) => < ManagerRow estandar={user} key={id}  reload={setReload} data={loadManagers}/>)), [managers],
    );
    console.log(reload);


    return (
        <div>
            <HeaderEstandar8 titulo={"ADMINISTRACIÓN DE ESTÁNDARES"}
                             descripcion={"Sección de asignación de responsables de los estándares"}/>
            <ContentWrapper>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded px-5">

                    <div className="flex flex-row items-center">
                        <h2 className="title_users">Encargados de estándares del sistema</h2>
                        <div className="relative w-full px-4 max-w-full text-right">

                        </div>
                    </div>
                    <div className="block w-full">
                        <table className="w-full bg-transparent border-collapse table-auto">
                            <thead className="bg-blueGray-50 text-blueGray-500 text-left">
                            <tr>
                                <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                                    Estándar
                                </th>
                                <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                                    Encargado
                                </th>
                                <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                                    Correo
                                </th>

                                <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                                    Acciones
                                </th>

                                <td/>
                            </tr>
                            </thead>
                            {!reload && (
                                <tbody>
                                {estandaresEls}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>

            </ContentWrapper>
        </div>
    );
}
