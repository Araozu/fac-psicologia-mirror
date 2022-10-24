import {SERVER_PATH} from "@/variables";

/** Data of the user to register */
export interface LoginData {
    email: string,
    password: string,
}

/** Data of the user to register */
export interface RegistrationData {
    name: string,
    lastname: string,
    email: string,
    password: string,
}

/** Abstraction of the response of the server */
export interface ResponseData {
    /** Signals whether the response is in the range of HTTP 200-2009 */
    ok: boolean,
    /** The possible response of the server */
    json: {
        /** Response of the server. Should always be "registro exitoso" */
        message: string,
        [key: string]: string | undefined,
    }
}

export interface GoogleResponseData {
    ok: boolean,
    json: {
        message: string,
        access_token: string,
        image: string,
        role: string,
        user: {
            id: number,
            name: string,
            lastname: string,
            email: string,
        }
    }
}

type LoginFunction = (data: LoginData) => Promise<ResponseData>

export const defaultLoginFn: LoginFunction = (data) => new Promise((resolve) => {
    fetch(`${SERVER_PATH}/api/login`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password,
        }),
    })
        .then((res) => {
            console.log(res);
            res.json()
                .then((jsonObj) => {
                    resolve({
                        ok: res.ok,
                        json: jsonObj,
                    });
                });
        })
        .catch((err) => {
            console.error(err);
            resolve({
                ok: false,
                json: {
                    message: "Error interno (Google Login)",
                },
            });
        })
    ;
});

export const googleLoginFn = (searchParams: string) => new Promise<GoogleResponseData>((resolve) => {
    // const paramsEncoded = window.encodeURIComponent(searchParams);
    fetch(`${SERVER_PATH}/api/login/google/callback${searchParams}`)
        .then((res) => {
            console.log(res);
            res.json()
                .then((jsonObj) => {
                    resolve({
                        ok: res.ok,
                        json: jsonObj,
                    });
                });
        });
});

/**
 * A function that abstracts the process of communicating with the server to register.
 * The return promise should never reject. Instead, the error data should be sent
 * via the success payload.
 */
export type RegisterFunction = (data: RegistrationData) => Promise<ResponseData>


export const defaultRegisterFn: RegisterFunction = (data) => new Promise((resolve) => {
    fetch(`${SERVER_PATH}/api/register`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            password_confirmation: data.password,
        }),
    })
        .then((res) => {
            res.json()
                .then((jsonObj) => {
                    resolve({
                        ok: res.ok,
                        json: jsonObj,
                    });
                });
        });
});
