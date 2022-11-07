import React, {useEffect, useState} from "react";

import {UserData} from "@/views/admin/Users/Interfaces/User";
import Modal from "@/components/modals/Modal";
import axios from "axios";


export function UserRow(props: { user: UserData }) {


    const [status, setStatus] = useState(false);
    const [names, setNames] = useState("");
    const [role, setRole] = useState("");
    const [id, setId] = useState(0);
    const [newRole, setNewRole] = useState(0);

    const token = localStorage.getItem("access_token");


    useEffect(() => {
        if (props.user.name === "null" && props.user.lastName === "null") {
            setNames("Invitación con respuesta pendiente");
        } else {
            setNames(props.user.name + " " + props.user.lastName);
        }
        setStatus(props.user.estado);
        setRole(props.user.rol);
        setId(props.user.id);
    }, [0]);
    const modalSuccess = {
        estado: "ok",
        icon: "fa-solid fa-circle-check icon-large success",
        title: "Operacion exitosa",
        body: "Se actualizó el usuario con éxito",
        type: "info",
    };

    const modalError = {
        estado: "false",
        icon: "fa-solid fa-circle-exclamation icon-large error-icon",
        title: "Operacion fallida",
        body: "No se pudo actualizar el usuario.Intentelo más tarde o contacte al área de soporte",
        type: "info",
    };
    const [modalEdit, setModalEdit] = useState(false);
    const [modalInfo, setModalInfo] = useState(modalSuccess);
    const [modal, setModal] = useState(false);


    const onCloseModalHandle = () => {
        setModalEdit(!modalEdit);

    };
    const onCloseModalAnswerHandle = () => {
        setModal(false);

    };

    const onConfirmHanlde = () => {
        setModalEdit(!modalEdit);
        callChange();
    };

    const callChange = () => {
        let rol = newRole;
        console.log("id", id);
        console.log("status", status);
        console.log(typeof (status));
        if (rol === 0) {
            role === "Admin" && (rol = 1);
            role === "User" && (rol = 2);
        }

        axios.put("http://gestion-calidad-rrii-api.herokuapp.com/api/update", {
            id,
            role: rol,
            estado: status,
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },

        })
            .then(function(response) {
                setModalInfo(modalSuccess);

            })
            .catch(function(error) {
                setModalInfo(modalError);

            })
            .then(function() {
                // always executed
                setModal(true);

            });
    };


    const selectStatus = (e: any) => {

        if (e.target.value === "true") {
            setStatus(true);
        } else if (e.target.value === "false") {
            setStatus(false);

        }


    };
    const selectRole = (e: any) => {
        setNewRole(e.target.value);
    };
    const efis = [
        {
            value: "",
            text: "",
        },
        {
            value: "true",
            text: "Activo",
        },
        {
            value: "false",
            text: "Inactivo",
        },
    ];

    const roles = [
        {
            value: "",
            text: "",
        },
        {
            value: 1,
            text: "Admin",
        },
        {
            value: 2,
            text: "Docente",
        },
    ];

    return (
        <>
            <tr
                className={"table-row"}
            >
                <th className="px-6 text-xs whitespace-nowrap p-4 text-left">
                    {names.toUpperCase()}
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {props.user.email}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {role.toUpperCase()}
                </td>

                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {status ? ("ACTIVO") : ("INACTIVO")}
                </td>
                <td>
                    {<i
                        className="fa-solid fa-pen py-2 px-1 cursor-pointer"
                        style={{color: "#009688"}}
                        onClick={() => setModalEdit(!modalEdit)}
                    />}
                </td>

            </tr>
            <Modal show={modalEdit} type="none" title={"Editar acciones de usuario"}>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                        Estado: {status ? ("ACTIVO") : ("INACTIVO")}
                        <select className="eficacia" onChange={(e) => selectStatus(e)}>
                            {efis.map((option, index) => (
                                <option key={index} value={option.value}>{option.text}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        Rol:{role.toUpperCase()}

                        <select className="eficacia" onChange={(e) => selectRole(e)}>
                            {roles.map((option, index) => (
                                <option key={index} value={option.value}>{option.text}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-row justify-center items-center">
                        <button type="button" style={{
                            padding: "10px 20px",
                            marginRight: "10px",
                            marginTop: "10px",
                            backgroundColor: "#FF4A4A",
                            color: "white",
                            borderRadius: "20px",
                            width: "50%",
                        }} onClick={onCloseModalHandle}> Cancelar
                        </button>
                        <button onClick={onConfirmHanlde} style={{
                            padding: "10px 20px",
                            marginTop: "10px",
                            backgroundColor: "#0284C7",
                            color: "white",
                            borderRadius: "20px",
                            width: "50%",
                        }}> Confirmar
                        </button>

                    </div>

                </div>
            </Modal>

            <Modal show={modal} type="info" onClose={onCloseModalAnswerHandle} title={modalInfo.title}>
                <div className="flex flex-col justify-center items-center">
                    <i className={modalInfo.icon}/>
                    {modalInfo.body}
                </div>
            </Modal>
        </>

    );

}
