import React, {FormEvent, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {defaultLoginFn} from "@/views/auth/functions";


type alertStyle = { display: "none" | "block" }

function useAlertStyle() {
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
                console.log("Login: respuesta.", response.json?.message);

                const token = response.json?.access_token ?? "";
                const nombre = response.json?.nombre ?? "";
                const apellido = response.json?.apellido ?? "";
                if (token.length !== 0) {
                    console.log("Token:", token);
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
                    <div className="w-full lg:w-4/12 px-4">
                        <div
                            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
                        >
                            {/*
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                    <h6 className="text-blueGray-500 text-sm font-bold" />
                                </div>
                                <div className="btn-wrapper text-center">
                                    <button
                                        className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            console.log("Intenta logg con institucion");
                                        }}
                                    >
                                        <img
                                            alt="..."
                                            className="w-5 mr-1"
                                            src={require("../../assets/img/logo unsa.png").default}
                                        />
                                        Acceder con cuenta institucional
                                    </button>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                            </div>
                            */}

                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="text-blueGray-400 text-center mb-3 font-bold">
                                    <small>Inicia sesión con tus credenciales de Usuario</small>
                                </div>
                                <form
                                    onSubmit={(ev) => {
                                        login(ev);
                                    }}
                                >
                                    <div className="relative w-full mb-3">
                                        <div className="text-red-500 font-bold" style={usuarioAlert}>
                                            "Email" está vacio.
                                        </div>

                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Email"
                                            value={usuario}
                                            onChange={(e) => setUsuario(e.target.value)}
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <div className="text-red-500 font-bold" style={contrasenaAlert}>
                                            "Contraseña" está vacio.
                                        </div>

                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Contraseña
                                        </label>
                                        <input
                                            type="password"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Contraseña"
                                            value={contrasena}
                                            onChange={(e) => setContrasena(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                id="customCheckLogin"
                                                type="checkbox"
                                                className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                            />
                                            <span className="ml-2 text-sm font-semibold text-blueGray-600">
                                                Recuerdame
                                            </span>
                                        </label>
                                    </div>

                                    <div className="text-center mt-6">
                                        <input
                                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type="submit"
                                            value="Iniciar Sesión"
                                        />
                                    </div>


                                    <div className="text-red-500 font-bold" style={loginAlert}>
                                        Error al iniciar sesión. {msgError}
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6 relative">

                            <div className="w-1/2">
                                <a
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    className="text-blueGray-200"
                                >
                                    <small/>
                                </a>
                            </div>

                            <div className="w-1/2 text-right">
                                <Link to="/auth/register" className="text-blueGray-200">
                                    <small>Crear nueva cuenta</small>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
