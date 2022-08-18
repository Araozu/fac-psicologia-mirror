import React, {useEffect, useState} from "react";

import logoUnsa from "../../assets/img/logo unsa.png";
import {SERVER_PATH} from "@/variables";

type alertStyle = { display: "none" | "block" }

function useAlertStyle() {
    return useState<alertStyle>({display: "none"});
}

export function GoogleLogin() {
    const [loginUrl, setLoginUrl] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${SERVER_PATH}/api/login/google/`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Something went wrong!");
            })
            .then((data) => setLoginUrl(data.url))
            .catch((error) => console.error(error));
    }, []);



    return (
        <>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div
                            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
                        >

                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-blueGray-400 text-center mb-3 font-bold">
                                    <small>Inicia sesión con tus cuenta institucional</small>
                                </div>
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
