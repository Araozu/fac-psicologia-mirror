import React, {useEffect, useMemo, useState} from "react";
import HeaderEstandar8 from "@/views/Estandares/Estandar8/Headers/HeaderEstandar8";

import InputTextEmail from "@/components/Form/Components/InputTextEmail";
import Modal from "@/components/modals/Modal";

import {UserData, UserServer, userServerToData} from "@/views/admin/Users/Interfaces/User";

import {useHistory} from "react-router";

import "./Users.css";

import axios from "axios";
import ContentWrapper from "@/components/ContentWrapper";
import {SERVER_PATH} from "@/variables";
import {UserRow} from "@/views/admin/Users/Components/UserRow";


async function fetchTodosUsers(): Promise<Array<UserData>> {
    const userToken = localStorage.getItem("access_token");

    const raw = await fetch(`${SERVER_PATH}/api/user`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`,
        },
    });
    const dataObj: { data: Array<UserServer> } = await raw.json();
    return dataObj.data.map(userServerToData);
}

type UsersProps = {
    producerFn?: () => Promise<Array<UserData>>
}

export default function(props: UsersProps) {
    const [user, setUser] = useState(false);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("2");
    const [modal, setModal] = useState(false);
    const rol = localStorage.getItem("ROL");
    const history = useHistory();

    const modalSuccess = {
        estado: "ok",
        icon: "fa-solid fa-circle-check icon-large success",
        title: "Operacion exitosa",
        body: "Se añadió el usuario con éxito",
        type: "info",
    };

    const modalError = {
        estado: "false",
        icon: "fa-solid fa-circle-exclamation icon-large error-icon",
        title: "Operacion fallida",
        body: "No se pudo añadir el usuario.Intentelo más tarde o contacte al área de soporte",
        type: "info",
    };
    const [modalInfo, setModalInfo] = useState(modalSuccess);

    const onCloseModalHandle = () => {
        setModal(false);
        setEmail("");
    };

    const handleAddUser = () => {
        const token = localStorage.getItem("access_token");

        axios.post(`${SERVER_PATH}/api/register`, {
            email,
            rol: role,
        }, {
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                setModalInfo(modalSuccess);
                loadUsers();

                // Si la creacion es exitosa actualizar la lista de usuarios
                setUsers([]);
                (props.producerFn ?? fetchTodosUsers)().then(setUsers);
            })
            .catch((e) => {
                setModalInfo(modalError);

            })
            .finally(() => {
                setModal(true);
            });

    };

    if (rol?.toLowerCase() !== "admin") {
        history.replace("/dashboard");
    }

    //sección de tabla

    const [users, setUsers] = useState<Array<UserData>>([]);
    const [reload, setReload] = useState(false);

    const loadUsers = () => {
        setReload(true);
        (props.producerFn ?? fetchTodosUsers)().then((listUsers:Array<UserServer>) => {
            setUsers(listUsers);
            setReload(false);
        });
    };

    useEffect(() => {
        loadUsers();
    }, []);


    const usersEls = useMemo(
        () => !reload && (users.map((user, id) => <UserRow user={user} key={id} reload={loadUsers} />)),
        [users],
    );
    return (
        <div>
            <HeaderEstandar8 titulo={"ADMINISTRACIÓN DE USUARIOS"} descripcion={"Sección de usuarios del sistema"} />
            <ContentWrapper>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded px-5">

                    <div className="flex flex-row items-center">
                        <h2 className="title_users">Listado de Usuarios del Sistema</h2>
                        <div className="relative w-full px-4 max-w-full text-right">
                            <button
                                className="bg-lightBlue-600 text-white active:bg-indigo-600 text-xs font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                    setUser(true);
                                }}
                            >
                                + Añadir Nuevo usuario
                            </button>
                        </div>
                    </div>


                    <hr />

                    {user ? (
                        <div className="flex flex-row items-center">
                            <InputTextEmail
                                name="correo"
                                label="Correo"
                                description="Ingrese el correo del nuevo usuario. Ejm.: admin@unsa.edu.pe"
                                value={email}
                                //error={errorSemestre}
                                onChange={(ev: any) => setEmail(ev.target?.value)}
                            />

                            <select onChange={(ev: any) => setRole(ev.target?.value)} value={role}
                                className="rounded-xl text-sm p-2 w-48"
                            >
                                <option value="1">Admin</option>
                                <option value="2">Docente</option>
                            </select>


                            <a className="form-icon-button form-add-button" onClick={handleAddUser}>
                                <i className="fa-solid fa-floppy-disk" /> Añadir
                            </a>
                            <a className="form-icon-button form-delete-button" onClick={() => {
                                setUser(false);
                            }}
                            ><i className="fa-solid fa-trash" /> Cancelar
                            </a>
                        </div>
                    ) : (<div />)}


                    <div className="block w-full">
                        <table className="w-full bg-transparent border-collapse table-auto">
                            <thead className="bg-blueGray-50 text-blueGray-500 text-left">
                                <tr>
                                    <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                                    Nombres y Apellidos
                                    </th>
                                    <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                                    Correo
                                    </th>
                                    <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                                    Rol
                                    </th>

                                    <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                                    Estado
                                    </th>
                                    <th className="px-6 align-middle py-3 text-xs uppercase font-semibold">
                                        Acciones
                                    </th>

                                    <td />
                                </tr>
                            </thead>
                            {!reload && (
                                <tbody>
                                    {usersEls}
                                </tbody>
                            )}
                        </table>
                    </div>

                    <div className="form-footer" />
                </div>
            </ContentWrapper>
            <Modal show={modal} type="info" onClose={onCloseModalHandle} title={modalInfo.title}>
                <div className="flex flex-col justify-center items-center">
                    <i className={modalInfo.icon} />
                    {modalInfo.body}
                </div>
            </Modal>
        </div>
    );
}
