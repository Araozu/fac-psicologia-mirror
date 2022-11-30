export interface UserData {
    id: number,
    name: string,
    lastname: string,
    email: string,
    rol:string
    estado: boolean
}

export interface UserServer {
    id: number,
    name: string,
    lastname: string,
    email: string,
    rol:string,
    estado:boolean
}

export function userServerToData(user:UserServer):UserData {
    return {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        rol: user.rol,
        estado:user.estado
    };
}
