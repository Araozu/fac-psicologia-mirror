import React, {useState} from "react";
import UserDropdown from "../Dropdowns/UserDropdown.jsx";
import {Link} from "react-router-dom";
import {useHistory} from "react-router";

export default function Navbar() {
    const nombre = localStorage.getItem("nombre");
    const apellido = localStorage.getItem("apellido");
    const history = useHistory();
    const foto = localStorage.getItem("FOTO");

    /**      <nav className="relative top-0 left-0 w-full z-10 bg-lightBlue-600 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                <div className="w-full flex items-center  justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                    {/* Brand *//*}
                    <Link
                        className="text-white text-sm uppercase hidden lg:inline-block font-semibold px-4"
                        to="/admin/estandar8"
                    >
                    <i class="fa-brands fa-ubuntu mr-2"></i>
                    Sistema Gestion de Calidad
                    </Link>
                    {/* User Info *//*}
                    <div className="flex flex-row justify-center items-center">
                        <span className="text-white inline-block mr-4 h6"> {`${nombre} ${apellido}`}</span>

                        {/* User *//*}
                        <ul className="flex-col md:flex-row list-none items-center hidden md:flex relative">
                            <UserDropdown />
                        </ul>
                    </div>
                </div>
            </nav> */

    return (
        <>
            <nav className="bg-lightBlue-600 flex items-center justify-between py-4"
                style={ {width: "-webkit-fill-available", position: "sticky", top: "0", left: "0", zIndex: "150"} }
            >
                <div>
                    <button className="p-2 ml-4 mr-2" onClick={() => {
                        history.goBack();
                    }}
                    >
                        <i class="fa-solid fa-arrow-left fa-lg text-white" />
                    </button>
                    <Link
                        className="text-white text-sm uppercase hidden lg:inline-block font-semibold px-4"
                        to="/admin/estandar8"
                    >
                        <i className="fa-brands fa-ubuntu mr-2" />
                            Sistema de gestion de calidad
                    </Link>
                </div>
                <div className="flex flex-row justify-center items-center px-4">
                    <span className="text-white text-sm opacity-75 inline-block mr-2"> {`${nombre} ${apellido}`}</span>
                    <ul className="flex-col md:flex-row list-none items-center hidden md:flex relative">
                        <UserDropdown />
                    </ul>
                </div>
            </nav>
        </>
    );
}
