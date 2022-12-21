import React, {FormEvent, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {defaultLoginFn} from "@/views/auth/functions";

import logoUnsa from "../../assets/img/logo unsa.png";
import {SERVER_PATH} from "@/variables";

type alertStyle = { display: "none" | "block" }

export function useAlertStyle() {
    return useState<alertStyle>({display: "none"});
}

export default function Login() {
    const loginFunction = defaultLoginFn;

    const [usuarioAlert, setUsuarioAlert] = useAlertStyle();
    const [contrasenaAlert, setContrasenaAlert] = useAlertStyle();
    const [loginAlert, setLoginAlert] = useAlertStyle();

    const [msgError, setMsgError] = useState("");

    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const history = useHistory();

    const login = async(ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        if (!usuario || usuario.length === 0) {
            setUsuarioAlert({display: "block"});
        }
        if (!contrasena || contrasena.length === 0) {
            setContrasenaAlert({display: "block"});
        }

        if (usuario && contrasena) {
            const response = await loginFunction({
                email: usuario,
                password: contrasena,
            });

            if (response.ok) {

                const token = response.json?.access_token ?? "";
                const nombre = response.json?.nombre ?? "";
                const apellido = response.json?.apellido ?? "";
                if (token.length !== 0) {
                    localStorage.setItem("access_token", token);
                    localStorage.setItem("nombre", nombre);
                    localStorage.setItem("apellido",apellido);
                }

                history.push("/admin/dashboard");
            } else {
                setMsgError(response.json?.message ?? "");
                setLoginAlert({display: "block"});

                // Retirar el msg de error tras un tiempo
                setTimeout(() => {
                    setMsgError("");
                    setLoginAlert({display: "none"});
                }, 5000);
            }
        }
    };

    return (
        <>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className=" relative w-full lg:w-4/12 px-4 py-4">
                        <div
                            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
                        >

                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                    <h6 className="text-blueGray-500 text-sm font-bold" />
                                </div>
                                <div className="btn-wrapper text-center">
                                    <button
                                        className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            window.location.href = `${SERVER_PATH}/api/login/google/`;
                                            console.log("Intenta logg con institucion");
                                        }}
                                    >
                                        <img
                                            alt="..."
                                            className="w-5 mr-1"
                                            src={logoUnsa}
                                        />
                                        Acceder con cuenta institucional
                                    </button>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                            </div>


                            

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
