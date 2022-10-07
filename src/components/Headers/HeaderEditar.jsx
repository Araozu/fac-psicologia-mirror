import React from "react";

export default function HeaderCreate(props) {
    return (
        <>
            <div className="relative bg-lightBlue-600 md:pt-16 pb-16 pt-12 flex justify-between">
                <div className="px-4 my-4 md:px-10 flex">
                    <i className="fa-regular fa-pen-to-square mr-1 text-5xl text-white" />
                    <div>
                        <h1 className="text-3xl font-bold text-white ">EDITAR PLAN DE MEJORA</h1>
                        <p className="text-white">En esta seccion puedes editar los detalles del plan de mejora</p>
                    </div>
                </div>
            </div>
        </>
    );
}
