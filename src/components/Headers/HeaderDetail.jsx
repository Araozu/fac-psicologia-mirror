import React from "react";
import AdminNavbar from "../Navbars/AdminNavbar";

export default function HeaderCreate() {
    return (
        <>

            <div className="relative bg-lightBlue-600 md:pt-16 pb-16 pt-16 flex justify-between">
                <AdminNavbar />
                <div className="">
                    <h1 className="text-4xl font-bold text-white ">Detalle del plan de mejora</h1>
                </div>
            </div>
        </>
    );
}
