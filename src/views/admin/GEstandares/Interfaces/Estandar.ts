export interface EstandarData {
    id: number,
    name: string,
    user_lastname: string,
    user_name: string,
    user_email: string
}

export interface EstandarServer {
    id: number,
    name: string,
    user_lastname: string,
    user_name: string,
    user_email: string

}

export function estandarServerToData(estandar: EstandarServer): EstandarData {
    return {
        id: estandar.id,
        name: estandar.name,
        user_lastname: estandar.user_lastname,
        user_name: estandar.user_name,
        user_email: estandar.user_email,
    };
}
