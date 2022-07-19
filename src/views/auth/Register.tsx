import React, {FormEvent, useState} from "react";
import {useHistory} from "react-router";

/** Data of the user to register */
export interface RegistrationData {
    name: string,
    email: string,
    password: string,
}

/** Abstraction of the response of the server */
export interface ResponseData {
    /** Signals whether the response is in the range of HTTP 200-2009 */
    ok: boolean,
    /** The possible response of the server, only if `ok` is `true` */
    json?: {
        /** Response of the server. Should always be "registro exitoso" */
        message: string
    }
}

/**
 * A function that abstracts the process of communicating with the server to register.
 * The return promise should never reject. Instead, the error data should be sent
 * via the success payload.
 */
type RegisterFunction = (data: RegistrationData) => Promise<ResponseData>

const SERVER_PATH = "http://127.0.0.1:8000";
const defaultRegisterFn: RegisterFunction = (data) => new Promise((resolve) => {
    fetch(`${SERVER_PATH}/api/register`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password,
        }),
    })
        .then((res) => {
            if (res.ok) {
                res.json().then((jsonObj) => {
                    resolve({
                        ok: true,
                        json: jsonObj,
                    });
                });
            } else {
                resolve({ok: false});
            }
        });
});

type alertStyle = { display: "none" | "block" }

function useAlertStyle() {
    return useState<alertStyle>({display: "none"});
}

export default function Register(props: { registerFn?: RegisterFunction }) {
    // Default values
    const registerFunction = props.registerFn ?? defaultRegisterFn;


    const [nameAlertStyle, setNameAlertStyle] = useAlertStyle();
    const [emailAlertStyle, setEmailAlertStyle] = useAlertStyle();
    const [passwordAlertStyle, setPasswordAlertStyle] = useAlertStyle();
    const [registrationErrorStyle, setRegistrationErrorStyle] = useAlertStyle();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const register = async(ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        if (!name || name.length === 0) {
            setNameAlertStyle({display: "block"});
        }

        if (!email || email.length === 0) {
            setEmailAlertStyle({display: "block"});
        }

        if (!password || password.length === 0) {
            setPasswordAlertStyle({display: "block"});
        }

        if (name && email && password) {
            const response = await registerFunction({name, email, password});
            if (response.ok) {
                history.push("/admin/dashboard");
            } else {
                setRegistrationErrorStyle({display: "block"});
            }
        }
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
                                        <div className="text-red-500 font-bold" style={nameAlertStyle}>Name is empty
                                        </div>
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="user-name"
                                        >
                                            Name
                                        </label>
                                        <input
                                            id="user-name"
                                            name="user-name"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(x) => setName(x.target.value)}
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <div className="text-red-500 font-bold" style={emailAlertStyle}>Email is empty
                                        </div>
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
                                            value={email}
                                            onChange={(x) => setEmail(x.target.value)}
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <div className="text-red-500 font-bold" style={passwordAlertStyle}>
                                            Password is empty
                                        </div>
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
                                            value={password}
                                            onChange={(x) => setPassword(x.target.value)}
                                        />
                                    </div>

                                    <div className="text-center mt-6">
                                        <input
                                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type="submit"
                                            value="Create Account"
                                        />
                                    </div>

                                    <div className="text-red-500 font-bold" style={registrationErrorStyle}>
                                        Registration error
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
