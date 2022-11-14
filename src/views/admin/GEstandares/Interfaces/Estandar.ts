export interface EstandarData {
    id: number,
    name: string,
    cabecera: string,
}

export interface EstandarServer {
    id: number,
    name: string,
    cabecera: string


}

export function estandarServerToData(estandar: EstandarServer): EstandarData {
    return {
        id: estandar.id,
        name: estandar.name,
        cabecera: estandar.cabecera,
    };
}
