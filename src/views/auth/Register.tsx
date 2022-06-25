import React, { FormEvent, useState } from "react";

export default function Register() {
    type nameAlertStyleType = { display: "none" | "block" }
    const [nameAlertStyle, setNameAlertStyle] = useState<nameAlertStyleType>({display: "none"});

    const register = (ev: FormEvent) => {
        ev.preventDefault();
        setNameAlertStyle({display: "block"});
    };

    return (
        <>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-6/12 px-4">
                        <div
                            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
                        >
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="text-blueGray-400 text-center mb-3 font-bold">
                                    <small>Sign up with credentials</small>
                                </div>
                                <form
                                    onSubmit={(ev) => {
                                        register(ev);
                                    }}
                                >
                                    <div className="relative w-full mb-3">
                                        <div className="text-red-500 font-bold" style={nameAlertStyle}>Name is empty</div>
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="user-name"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="email"
                                            id="user-name"
                                            name="user-name"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Name"
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="user-email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="user-email"
                                            name="user-email"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Email"
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="user-password"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="user-password"
                                            name="user-password"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Password"
                                        />
                                    </div>

                                    <div className="text-center mt-6">
                                        <input
                                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type="submit"
                                            value="Create Account"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
