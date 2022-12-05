import {estadoPlanMejoraToColor, PlanMejoraServer} from "@/views/Estandares/components/PlanMejora";
import {useHistory} from "react-router";

export function PlanMejora(props: { plan: PlanMejoraServer, eliminar: () => void }) {
    const history = useHistory();
    const [colorFondo1, colorFondo2] = estadoPlanMejoraToColor(props.plan.estado);

    const redirectToDetail = (id: number) => {
        // TODO: Colocar todas las rutas en un objeto global, y referenciarlas
        //  para hacer redireccion
        const path = `/admin/estandar8/plan-mejora/detalle/${id}`;
        history.push(path);
    };

    const redirectToEdit = (id: string) => {
        // TODO: Colocar todas las rutas en un objeto global, y referenciarlas
        //  para hacer redireccion
        const path = `/admin/estandar8/plan-mejora/editar/${id}`;
        history.push(path);
    };
    const rol = localStorage.getItem("ROL");

    return (
        <tr onClick={(e) => {
            e.preventDefault();
            redirectToDetail(props.plan.id);
        }} className="table-row"
        >
            <th className="px-6 text-xs whitespace-nowrap p-4 text-left">
                {props.plan.codigo}
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {props.plan.estandar_name}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {props.plan.user_name}
            </td>

            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <div className="grid" style={{gridTemplateColumns: "2.5rem auto"}}>
                    <span>{props.plan.avance}%</span>

                    <div className="relative w-full inline-block py-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded"
                            style={{backgroundColor: colorFondo2}}
                        >
                            <div
                                style={{
                                    width: `${props.plan.avance}%`,
                                    backgroundColor: colorFondo1,
                                }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                            />
                        </div>
                    </div>
                </div>
            </td>

            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <i className="fas fa-circle mr-4" style={{color: colorFondo1}} />
                {props.plan.estado}
            </td>

            {(props.plan.esCreador || rol?.toLowerCase() === "admin") && (
                <td onClick={(e) => e.stopPropagation()} style={{position: "relative"}}>
                    <i
                        className="fa-solid fa-pen py-2 px-1 cursor-pointer"
                        style={{color: "#009688"}}
                        onClick={() => redirectToEdit(props.plan.id.toString())}
                    />
                </td>
            )}

            {(rol?.toLowerCase() === "admin") && (
                <td onClick={(e) => e.stopPropagation()} style={{position: "relative"}}>
                    <i
                        className="fa-solid fa-trash py-2 px-1 cursor-pointer"
                        style={{color: "#F44336"}}
                        onClick={props.eliminar}
                    />
                </td>
            )}
        </tr>
    );
}
