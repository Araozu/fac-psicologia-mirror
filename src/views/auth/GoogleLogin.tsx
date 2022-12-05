import React, {useEffect, useState} from "react";

import logoUnsa from "../../assets/img/logo unsa.png";
import {SERVER_PATH} from "@/variables";
import {useHistory, useLocation} from "react-router";
import {googleLoginFn} from "@/views/auth/functions";
import {useAlertStyle} from "@/views/auth/Login";


export function GoogleLogin() {
    const location = useLocation();
    const history = useHistory();
    const paramsGoogle = location.search;

    const [msgError, setMsgError] = useState("");
    const [loginAlert, setLoginAlert] = useAlertStyle();

    useEffect(
        () => {
            if (paramsGoogle !== null && paramsGoogle !== "") {
                // Enviar parametros a backend
                googleLoginFn(paramsGoogle)
                    .then((response) => {
                        if (response.ok) {
                            const obj = response.json;
                            //console.log(obj);

                            const token = obj.access_token;
                            const foto = obj.image;
                            const nombre = obj.user.name;
                            const apellido = obj.user.lastname;
                            const rol = obj.role;

                            if (token.length !== 0) {
                                //console.log("Token:", token);
                                localStorage.setItem("access_token", token);
                                localStorage.setItem("nombre", nombre);
                                localStorage.setItem("apellido",apellido);
                                localStorage.setItem("FOTO", foto);
                                localStorage.setItem("ROL", rol);
                            }

                            history.push("/dashboard");
                        } else {
                            setMsgError(response.json.message);
                            setLoginAlert({display: "block"});

                            // Retirar el msg de error tras un tiempo
                            setTimeout(() => {
                                setMsgError("");
                                setLoginAlert({display: "none"});
                            }, 5000);
                        }
                    });
            }
        },
        [],
    );

    return (
        <>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="flex justify-start w-full lg:w-6/12 px-4">
                        <div
                            className="relative flex flex-column min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
                            style={ {borderRadius: "10em !important"} } 
                        >

                            <div className="rounded-t mb-0 px-6 py-6" style={ {backgroundColor: "#2793FF"} }>
                                <div className="mb-4">
                                    <h1 className="text-white text-4xl font-bold" >Bienvenido!</h1>
                                    <p className="text-white">Ingresa al sistema de gestion de estandares de calidad ingresando con tu correo instucional</p>
                                </div>
                                <div className="py-4"></div>
                                <div className="text-center mb-3">
                                    <h6 className="text-blueGray-500 text-sm font-bold" />
                                </div>
                                <div className="btn-wrapper text-center">
                                    <button
                                        className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            window.location.href = `${SERVER_PATH}/api/login/google/`;
                                        }}
                                    >
                                        <img
                                            alt="..."
                                            className="w-5 mx-1"
                                            src={logoUnsa}
                                        />
                                        <strong className="mx-2">Acceder con correo UNSA</strong>
                                    </button>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                                <div className="text-red-500 font-bold" style={loginAlert}>
                                    Error al iniciar sesión con Google. {msgError}
                                </div>
                            </div>

                            <div className="bg-white" style={{width: "300px"}}>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
