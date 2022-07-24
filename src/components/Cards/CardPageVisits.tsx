// TODO: formalizar con la base de datos, cuales son los valores correctos
enum EstadoPlanMejora {
    "EnProceso",
    Concluido,
    Programado,
    Reprogramado,
    Planificado,
}

interface PlanMejoraData {
    codigo: string,
    estandar: number,
    responsable: string,
    /** Se asume que siempre es un entero entre 0 y 100 */
    avance: number,
    estado: string,
}

function PlanMejora(props: { plan: PlanMejoraData }) {
    return (
        <tr>
            <th className="px-6 text-xs whitespace-nowrap p-4 text-left">
                {props.plan.codigo}
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                Estándar {props.plan.estandar}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {props.plan.responsable}
            </td>

            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <div className="grid" style={{gridTemplateColumns: "2.5rem auto"}}>
                    <span>{props.plan.avance}%</span>

                    <div className="relative w-full inline-block py-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-emerald-200">
                            <div
                                style={{width: `${props.plan.avance}%`}}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                            />
                        </div>
                    </div>
                </div>
            </td>

            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <i className="fas fa-circle text-emerald-500 mr-4" />
                {props.plan.estado}
            </td>
        </tr>
    );
}


const mockPlan1: PlanMejoraData = {
    estado: "Concluido",
    codigo: "OM-01-2020",
    estandar: 15,
    avance: 6,
    responsable: "Brayan Guillen",
};

const mockPlan2: PlanMejoraData = {
    estado: "Concluido",
    codigo: "OM-01-2020",
    estandar: 15,
    avance: 54,
    responsable: "Brayan Guillen",
};

const mockPlan3: PlanMejoraData = {
    estado: "Concluido",
    codigo: "OM-01-2020",
    estandar: 15,
    avance: 100,
    responsable: "Brayan Guillen",
};

export default function CardPageVisits() {

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-blueGray-700">
                                Filtros
                            </h3>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <button
                                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                            >
                                + Nuevo PM
                            </button>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="w-full bg-transparent border-collapse table-auto">
                        <thead className="bg-blueGray-50 text-blueGray-500 text-left">
                            <tr>
                                <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                                    Codigo
                                </th>
                                <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                                    Estándar
                                </th>
                                <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                                    Responsable Principal
                                </th>
                                <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                                    Avance (%)
                                </th>
                                <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                                    Estado
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <PlanMejora plan={mockPlan1} />
                            <PlanMejora plan={mockPlan2} />
                            <PlanMejora plan={mockPlan3} />
                            <PlanMejora plan={mockPlan1} />
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
