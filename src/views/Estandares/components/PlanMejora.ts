export type EstadoPlanMejora =
    | "Planificado"
    | "Programado"
    | "Reprogramado"
    | "En proceso"
    | "Concluido";

export interface PlanMejoraServer {
    /** Identificador del PM */
    id: number,
    /** Nombre del PM */
    nombre: string,
    /** Codigo del PM: OM-XX-XXXX */
    codigo: string,
    /**
     * Porcentaje de avance del PM.
     * Deberia ser un numero entre 0 y 100.
     */
    avance: number,
    /**
     * Estado del PM. Puede ser:
     *
     * `"Planificado" | "Programado" | "Reprogramado" | "En proceso" | "Concluido";`
     */
    estado: EstadoPlanMejora,
    /** Nombre del PM. Ejm. `"E-8 Planes de Mejora"` */
    estandar_name: string,
    /** Nombre del usuario creador. Ejm. `"FERNANDO ENRIQUE"` */
    user_name: string,
    /** Indica si el usuario actualmente logeado es el creador de este PM */
    esCreador: boolean,
}

/**
 * Dado un estado de PM devuelve su color.
 * @param estado
 * @return Un color principal y un color secundario en formato HEX
 */
export function estadoPlanMejoraToColor(estado: EstadoPlanMejora): [string, string] {
    switch (estado) {
        case "En proceso":
            return ["#ef4444", "#FECACA"];
        case "Concluido":
            return ["#10B981", "#68d7b2"];
        case "Programado":
            return ["#FF8F0C", "#F7C78E"];
        case "Planificado":
            return ["#0f8dc4", "#25BAFA"];
        case "Reprogramado":
            return ["#F3F80C", "#FCFDB7"];
        default:
            return ["red", "blue"];
    }
}
