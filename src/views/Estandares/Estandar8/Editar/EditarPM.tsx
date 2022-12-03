import React, {useState, useEffect} from "react";

import axios from "axios";

import {useHistory} from "react-router";

//Importaciones componentes propios
import FormPM from "../../../../components/Form/FormPM";
import lgif from "../../../../assets/img/loading-2.gif";
import "./EditarPM.css";

export default function EditarPM(props: {id: string}) {

    //Auth
    const token = localStorage.getItem("access_token");

    //Obtenemos el id del plan de mejora a editar
    const {id} = props;

    //Hook donde capturamos el PM a editar
    const [pm , setPM] = useState({});
    //Hook para establecer el loading
    const [loading, setLoading] = useState(true);

    //Obtenemos el PM cuando se carga la pagina
    useEffect(() => {
        const getPM = async() => {
            setLoading(true);
            const instance = axios.create({
                baseURL: "https://pis-project-api.up.railway.app/api/",
                timeout: 10000,
                headers: {"Authorization": `Bearer ${token}`},
            });
            try {
                const response = await instance.get(`/plan/${id}`);
                setPM(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getPM();
    }, []);

    //Si esta cargando mostramos el item de cargando
    if (loading) return (
        <img src={lgif} alt="Loading data gif" className="loading-gif" />
    );


    return (
        <div className="bg-content">
            <FormPM pm={pm} editing />
        </div>
    );
}

