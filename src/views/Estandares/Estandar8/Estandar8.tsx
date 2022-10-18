import React from "react";


// components
import HeaderStandard from "@/components/Headers/HeaderStandard";
import CardPlanesMejora from "@/components/Cards/CardPlanesMejora";

export default function Estandar8() {
    const [openTab, setOpenTab] = React.useState(1);

    const listTabs = ["planes de mejora", "narrativa", "acciones de mejora"];
    const comp = [<CardPlanesMejora/>, "Narrativas","acciones de mejora"]

    return (
        <>
            <div className="w-full mb-12">
                <HeaderStandard titulo="Estandar 8" descripcion="Estándar para la gestión de calidad"/>
                <div>
                    <div className={"flex flex-wrap"}>
                        <div className={"w-full"}>
                            <ul
                                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                                role="tablist"
                            >
                                {listTabs.map((value,index)=>{
                                    return(
                                        <li className="-mb-px last:mr-0 flex-auto text-center">
                                            <a
                                                className={
                                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg  block leading-normal " + (openTab === index
                                                        ? "text-lightBlue-600  bg-white"
                                                        : "text-white bg-lightBlue-600")
                                                }
                                                onClick={e => {
                                                    e.preventDefault();
                                                    setOpenTab(index);
                                                }}
                                                data-toggle="tab"
                                                role="tablist"
                                            >
                                                {value}
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                            <div
                                className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                                <div className="px-4 py-5 flex-auto">
                                    <div className="tab-content tab-space">

                                        {comp.map((value,index)=>{
                                            return(
                                                <div className={openTab === index ? "block" : "hidden"} >
                                                    {value}
                                                </div>
                                            )
                                        })}

                                        {/* <div className={openTab === 0 ? "block" : "hidden"} >
                                            <CardNarrativa/>
                                        </div>
                                        <div className={openTab === 1 ? "block" : "hidden"} id="link2">
                                            <p>Estamos en narrativa</p>
                                        </div>
                                        <div className={openTab === 2 ? "block" : "hidden"} id="link3">
                                            <p>Estamos en ar</p>
                                        </div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


