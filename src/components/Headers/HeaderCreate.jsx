import React from "react"

export default function HeaderCreate(props){
    const {estandar, tipo} = props;
    return(
        <>
            <div className="relative bg-lightBlue-600 md:pt-16 pb-16 pt-12 flex justify-between">
                <div className="px-4 md:px-10">
                    <h1 className="text-4xl font-bold text-white "> Crear {tipo} para el {estandar}</h1>
                </div>
            </div>
        </>
    )


}
