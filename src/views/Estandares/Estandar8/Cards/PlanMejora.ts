enum EstadoPlanMejora {
    EnProceso,
    Concluido,
    Programado,
    Reprogramado,
    Planificado,
}

export interface PlanMejoraData {
    id: number,
    codigo: string,
    estandar: number,
    user_name: string,
    /** Se asume que siempre es un entero entre 0 y 100 */
    avance: number,
    estado: EstadoPlanMejora,
    estandar_name: string,
    isCreator: boolean,
}

export interface PlanMejoraServer {
    avance: number,
    codigo: string,
    estado: string,
    estandar_name: string,
    id: number,
    id_user: number,
    nombre: string
    user_name: string,
    esCreador: boolean
}

export function planMejoraServerToData(plan: PlanMejoraServer): PlanMejoraData {
    let estadoPlan: EstadoPlanMejora;
    switch (plan.estado) {
        case "Planificado": {
            estadoPlan = EstadoPlanMejora.Planificado;
            break;
        }
        case "Programado": {
            estadoPlan = EstadoPlanMejora.Programado;
            break;
        }
        case "Reprogramado": {
            estadoPlan = EstadoPlanMejora.Reprogramado;
            break;
        }
        case "En proceso": {
            estadoPlan = EstadoPlanMejora.EnProceso;
            break;
        }
        case "Concluido": {
            estadoPlan = EstadoPlanMejora.Concluido;
            break;
        }
        default: {
            console.error("Error al convertir datos del servidor a enum PlanMejoraServer (CardPlanesMejora.tsx)");
            console.error("Valor recibido:", plan.estado);
            console.error(plan);
            estadoPlan = EstadoPlanMejora.Programado;
        }
    }

    const codigoPlan = plan.codigo.startsWith("OM-") ? plan.codigo : `OM-${plan.codigo}`;

    return {
        id: plan.id,
        codigo: codigoPlan,
        estandar: 8,
        user_name: plan.user_name,
        avance: plan.avance,
        estado: estadoPlan,
        estandar_name: plan.estandar_name,
        isCreator: plan.esCreador,
    };
}

export function estadoPlanMejoraToString(estado: EstadoPlanMejora): string {
    switch (estado) {
        case EstadoPlanMejora.Reprogramado:
            return "Reprogramado";
        case EstadoPlanMejora.Programado:
            return "Programado";
        case EstadoPlanMejora.Planificado:
            return "Planificado";
        case EstadoPlanMejora.Concluido:
            return "Concluido";
        case EstadoPlanMejora.EnProceso:
            return "En Proceso";
        default:
            return "";
    }
}

export function estadoPlanMejoraToColor(estado: EstadoPlanMejora): [string, string] {
    switch (estado) {
        case EstadoPlanMejora.EnProceso:
            return ["#ef4444", "#FECACA"];
        case EstadoPlanMejora.Concluido:
            return ["#10B981", "#68d7b2"];
        case EstadoPlanMejora.Programado:
            return ["#FF8F0C", "#F7C78E"];
        case EstadoPlanMejora.Planificado:
            return ["#0f8dc4", "#25BAFA"];
        case EstadoPlanMejora.Reprogramado:
            return ["#F3F80C", "#FCFDB7"];
        default:
            return ["red", "blue"];
    }
}
