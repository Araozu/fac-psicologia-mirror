import React, {useState} from "react";
import UserDropdown from "../Dropdowns/UserDropdown.jsx";

export default function Navbar() {

    const nombre = localStorage.getItem("nombre");
    const apellido = localStorage.getItem("apellido");
    const foto = localStorage.getItem("FOTO");
    return (
        <>
            {/* Navbar */}
            <nav className="relative top-0 left-0 w-full z-10 bg-lightBlue-600 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                    {/* Brand */}
                    <a
                        className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                    >
                        { /*TODO: Enlazar con la propiedad de vista actual*/ }
              Sistema Gestion de Calidad
                    </a>
                    {/* User Info */}
                    <div className="flex flex-row justify-center items-center">
                        <span className="text-white inline-block mr-4"> {`${nombre} ${apellido}`}</span>

                        {/* User */}
                        <ul className="flex-col md:flex-row list-none items-center hidden md:flex relative">
                            <UserDropdown />
                        </ul>
                    </div>
                </div>
            </nav>
            {/* End Navbar */}
        </>
    );
}
