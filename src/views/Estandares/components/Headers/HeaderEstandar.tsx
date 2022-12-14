import React from "react";

export default function HeaderEstandar(props: {titulo: string, descripcion?: string, icono?: string}) {
    return (
        <>
            <div className="relative bg-lightBlue-600 pb-32 pt-12 flex justify-between">
                <div className="px-4 my-4 md:px-10 flex">
                    {props.icono
                        ? <i className={`fa-regular ${props.icono} mr-1 text-5xl text-white`} />
                        : <></>
                    }
                    <div>
                        <h1 className="text-3xl font-bold text-white ">{props.titulo}</h1>
                        <p className="text-white">{props.descripcion}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
