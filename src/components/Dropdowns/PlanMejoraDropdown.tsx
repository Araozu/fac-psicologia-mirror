import React, {useRef, useState} from "react";
import Modal from "../modals/Modal.jsx";
import {useHistory} from "react-router";
import {SERVER_PATH} from "@/variables";
import {useClickOutside} from "@/components/Dropdowns/utils";

async function eliminarPM(codigo: string) {
    const userToken = localStorage.getItem("access_token");
    if (userToken === null) return;

    const response = await fetch(`${SERVER_PATH}/api/plan/${codigo}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`,
        },
    });
    return response.ok;
}


export function PlanMejoraDropdown(props: { codigo: string, eliminar: () => void }) {
    const ref = useRef(null);

    // dropdown props
    const [isShown, setIsShown] = useState(false);

    const history = useHistory();

    const [modalShow, setModalShow] = useState(false);
    const modalOnClose = async(result: "cancel" | "confirm") => {
        setModalShow(false);

        if (result === "cancel") return;

        const eliminado = await eliminarPM(props.codigo);
        if (eliminado) {
            props.eliminar();
        }
    };

    useClickOutside([ref], isShown, () => setIsShown(false));

    const redirectToEdit = (id: string) => {
        // TODO: Colocar todas las rutas en un objeto global, y referenciarlas
        //  para hacer redireccion
        const path = `/admin/estandar8/plan-mejora/editar/${id}`;
        history.push(path);
    };

    return (
        <>
            <a
                className="text-blueGray-500 py-1 px-3"
                onClick={(e) => {
                    e.preventDefault();
                    setIsShown((x) => !x);
                }}
            >
                <i className="fas fa-ellipsis-v" />
            </a>
            <div
                className={
                    `${isShown ? "block " : "hidden "
                    }bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48`
                }
                ref={ref}
                style={{
                    position: "absolute",
                    right: "2rem",
                    top: 0,
                }}
                onFocusCapture={() => console.log("D:")}
            >
                <a
                    className={
                        "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    }
                    onClick={(e) => {
                        e.preventDefault();
                        redirectToEdit(props.codigo);
                    }}
                >
                    <i className="fas fa-pen" /> Editar
                </a>
                <a
                    className={
                        "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    }
                    onClick={(e) => {
                        e.preventDefault();
                        setModalShow((x) => !x);
                    }}
                >
                    <i className="fas fa-trash" /> Eliminar
                </a>
            </div>

            <Modal type="confirm" show={modalShow} title="" onClose={modalOnClose}>
                <div style={{textAlign: "center"}}>
                    <i className="fas fa-solid fa-triangle-exclamation" style={{
                        fontSize: "4rem",
                        color: "#f24e1e",
                    }}
                    />
                    <br />
                    <br />
                    <div style={{
                        color: "#f24e1e",
                        fontWeight: "bold",
                    }}
                    >
                        ??Esta seguro que desea eliminar?
                    </div>
                    <div>Esta acci??n no es reversible, confirme si est?? seguro</div>
                </div>
            </Modal>
        </>
    );
}
