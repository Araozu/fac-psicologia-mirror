import React from "react"
import AdminNavbar from '../Navbars/AdminNavbar'

export default function HeaderCreate(props){
    return(
        <>
            
            <div className="relative bg-lightBlue-600 md:pt-16 pb-16 pt-12 flex justify-between">
                <AdminNavbar /> 
                <div className="px-4 my-4 md:px-10 flex">
                    <i class="fa-regular fa-pen-to-square mr-1 text-5xl text-white"></i>
                    <div>
                        <h1 className="text-3xl font-bold text-white ">EDITAR PLAN DE MEJORA</h1>
                        <p className="text-white">En esta seccion puedes editar los detalles del plan de mejora</p>
                    </div>
                </div>
            </div>
        </>
    )


}