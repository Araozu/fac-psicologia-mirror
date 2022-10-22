import React, {useState} from "react";
import HeaderEstandar8 from "@/views/Estandares/Estandar8/Headers/HeaderEstandar8";
// @ts-ignore
import InputText from "@/components/Form/Components/InputText";

import axios from "axios";
import {Link} from "react-router-dom";

function goBack(){
    return(
        <></>
    )
}

export default function() {
    const [user, setUser] = useState(false);
    const [email, setEmail] = useState("");

    const handleAddUser = () =>{
        const token = localStorage.getItem("access_token");

        console.log(email);


        axios.post("https://gestion-calidad-rrii-api.herokuapp.com/api/register", {email},{
            headers:{
                "Content-type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then(()=>{
            console.log("Registro exitoso");
        }).catch((e)=>{
            console.log(e);
        })

    }

    return (
        <div>
            <HeaderEstandar8 titulo={"ADMINISTRACIÓN DE USUARIOS"} descripcion={"Sección de usuarios del sistema"}/>
            <div className="relative px-4" style={{top: "-6rem"}}>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded px-5">
                    <h2 className="titulo-formulario">Listado de Usuarios del Sistema</h2>
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
                    <hr/>

                    {user ? (<div className="contenedor-form">
                        <InputText
                            name="correo"
                            label="Correo del nuevo usuario"
                            description="Ingrese el correo UNSA del nuevo usuario. Ejm.: admin@unsa.edu.pe"
                            value={email}
                            //error={errorSemestre}
                            onChange={(ev: any) => setEmail(ev.target?.value)}
                        />
                        <a className="form-icon-button form-add-button" onClick={handleAddUser}> Añadir </a>
                        <a className="form-icon-button form-add-button" onClick={()=>{setUser(false)}}> Cancelar </a>
                    </div>) : (<div/>)}


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
                                    Acciones
                                </th>
                                <td />
                            </tr>
                            </thead>
                            <tbody>
                            {/*planesMejoraEls*/}
                            </tbody>
                        </table>
                    </div>

                    <div className="form-footer">

                        <Link to={"/"} className={""}>
                            volver
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}
