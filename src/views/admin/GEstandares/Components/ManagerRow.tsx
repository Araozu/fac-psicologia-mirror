import React, {useEffect, useState} from "react";

import {EstandarData} from "@/views/admin/GEstandares/Interfaces/Estandar";
import Modal from "@/components/modals/Modal";
import InputSelectUsers from "@/components/Form/Components/InputSelectUsers";
import axios from "axios";
import {SERVER_PATH} from "@/variables";


export function ManagerRow(props: { estandar: EstandarData , data:any,reload : any}) {


    const [names, setNames] = useState("");
    const [namesU, setNamesU] = useState("");
    const [emailU, setEmailU] = useState("");


    const token = localStorage.getItem("access_token");

    useEffect(() => {
        setNames(props.estandar.name);
        setNamesU(props.estandar.user_name + " " + props.estandar.user_lastname);
        setEmailU(props.estandar.user_email);

    }, [0]);
    const modalSuccess = {
        estado: "ok",
        icon: "fa-solid fa-circle-check icon-large success",
        title: "Operacion exitosa",
        body: "Se actualizó el encargado con éxito",
        type: "info",
    };

    const modalError = {
        estado: "false",
        icon: "fa-solid fa-circle-exclamation icon-large error-icon",
        title: "Operacion fallida",
        body: "No se pudo actualizar el encargado.",
        type: "info",
    };
    const [modalEdit, setModalEdit] = useState(false);
    const [modalInfo, setModalInfo] = useState(modalSuccess);
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState("");


    const onCloseModalHandle = () => {
        setModalEdit(!modalEdit);

    };
    const onCloseModalAnswerHandle = () => {
        setModal(false);

    };
    const handleChangeUsuario = (value: any) => {
        setEmail(value);
    };

    const onConfirmHandle = () => {
        setModalEdit(!modalEdit);
        callChange();
    };

    const callChange = () => {
        //cambiar encargado
        axios.put(`${SERVER_PATH}/api/estandar/${props.estandar.id}`, {
            id_user: email,
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },

        })
            .then(function(response) {
                setModalInfo(modalSuccess);
                props.data();

            })
            .catch(function(error) {
                //console.log(error);
                setModalInfo(modalError);

            })
            .then(function() {
                // always executed
                setModal(true);

            });
    };


    return (
        <>
            <tr
                className={"table-row"}
            >
                <th className="px-6 text-xs whitespace-nowrap p-4 text-left">
                    {names.toUpperCase()}
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                    {namesU.toUpperCase()}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                    {emailU}
                </td>

                <td>
                    {<i
                        className="fa-solid fa-pen py-2 px-1 cursor-pointer"
                        style={{color: "#009688"}}
                        onClick={() => setModalEdit(!modalEdit)}
                    />}
                </td>

            </tr>
            <Modal show={modalEdit} type="none" title={`Editar encargado de Estándar ${props.estandar.id}`}
                   onClose={onCloseModalHandle}>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center">

                        <InputSelectUsers
                            name="user"
                            label="NUEVO USUARIO ENCARGADO"
                            description="SELECCIONA AL USUARIO QUE SE LE ASIGNARA EL PLAN DE MEJORA"
                            optionsRute="user"
                            initialValue={{}}
                            disabled={false}
                            onChange={handleChangeUsuario}
                        />
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
                        <button onClick={onConfirmHandle} style={{
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
