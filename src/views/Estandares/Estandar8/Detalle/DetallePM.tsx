import React, {useState, useEffect} from "react";
import axios from "axios";

import "./DetallePM.css";
// @ts-ignore
import lgif from "../../../../assets/img/loading-2.gif";
import {SERVER_PATH} from "@/variables";
import {EstadoPlanMejora} from "@/views/Estandares/Estandar8/Cards/PlanMejora";

type Evidencia = {
    id: number,
    codigo: string,
    denominacion: string,
    adjunto: string,
    id_user: number,
    id_plan: number,
    created_at: string,
    updated_at: string,
}

type CampoConValor = {
    id: number,
    value: string,
}


// El plan de mejora que se recibe del servidor
type DataPlanMejora = {
    id: number,
    codigo: string,
    nombre: string,
    oportunidad_plan: string | null,
    semestre_ejecucion: string | null,
    avance: number,
    duracion: number | null,
    estado: EstadoPlanMejora,
    evaluacion_eficacia: boolean | null,
    id_estandar: number,
    id_user: number,
    created_at: string,
    updated_at: string,
    fuentes: Array<CampoConValor>,
    problemas_oportunidades: Array<CampoConValor>,
    causas_raices: Array<CampoConValor>,
    acciones_mejoras: Array<CampoConValor>,
    recursos: Array<CampoConValor>,
    metas: Array<CampoConValor>,
    observaciones: Array<CampoConValor>,
    responsables: Array<CampoConValor>,
    evidencias: Array<Evidencia>,
}

type RespuestaServidor = {
    status: number,
    message: string,
    data: DataPlanMejora,
}

type Props = {id: string}
export default function DetallePM({id}: Props) {
    const [pm, setPM] = useState<DataPlanMejora | null>(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("access_token");

    useEffect(() => {
        const getPM = async() => {
            setLoading(true);

            const instance = axios.create({
                baseURL: `${SERVER_PATH}/api/`,
                timeout: 10000,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            try {
                const response = await instance.get<RespuestaServidor>(`/plan/${id}`);
                /* console.log(response); */
                setPM(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getPM();
    }, []);

    //Si esta cargando retorna el item de carga
    if (loading) {
        return (
            <>
                <img src={lgif} alt="Loading data gif" className="loading-gif" />
                {/**<h2 className="title-cargando">Cargando...</h2>*/}
            </>
        );
    }

    return (
        <div className="form-container" style={{padding: "1rem 2rem"}}>
            <div className="detalle-titulo-container">
                <div>
                    <button className="boton-atras">
                        <i className="fa-solid fa-arrow-left" style={{fontSize: "1.25rem"}} />
                    </button>
                    <span className="titulo-detalle text-lightBlue-600">DATOS DEL PLAN DE MEJORA</span>
                </div>
                <div>
                    <button className="boton-accion text-lightBlue-600 border-2 border-lightBlue-600">Descargar</button>
                    <button className="boton-accion bg-lightBlue-600 text-white border-2 border-lightBlue-600">Editar</button>
                </div>
            </div>
            <hr />

            <div style={{display: "flex", justifyContent: "space-between", margin: "1rem 0"}}>
                <div>
                    <div>
                        <span className="font-semibold uppercase text-xl">{pm?.nombre}</span>
                        <span className="px-10 py-1 mx-4 contenedor-estado font-semibold">{pm?.estado}</span>
                    </div>
                    <span className="block text-xs opacity-75 font-semibold uppercase">{pm?.codigo}</span>
                </div>

                <div style={{paddingRight: "1rem"}}>
                    <span className="block text-xs opacity-75 font-semibold uppercase">avance</span>
                    <span style={{fontSize: "2rem", fontWeight: "bold"}}>{pm?.avance}%</span>
                </div>
            </div>

            <hr />

            <div style={{display: "flex"}}>
                <Campo titulo="estandar" sinBorde>
                    <span>{pm?.nombre}</span>
                </Campo>
                <Campo titulo="semestre" sinBorde>
                    <span>{pm?.semestre_ejecucion}</span>
                </Campo>
                <Campo titulo="duracion" sinBorde>
                    <span>{pm?.duracion}</span>
                </Campo>
                <Campo titulo="evaluacion eficacia" sinBorde>
                    <span>{pm?.evaluacion_eficacia ? "SI" : "NO"}</span>
                </Campo>
            </div>

            <Campo titulo={"oportunidades de mejora"}>
                <span>{pm?.oportunidad_plan}</span>
            </Campo>

            <Campo titulo={"evidencias"}>
                <ul>
                    {pm?.evidencias.map((x) => <li key={x.id}>{x.denominacion}</li>) ?? <></>}
                </ul>
            </Campo>

            <Campo titulo={"fuentes"}>
                <ul>
                    {arrToLi(pm?.fuentes ?? [])}
                </ul>
            </Campo>

            <Campo titulo={"problema/oportunidad"}>
                <ul>
                    {arrToLi(pm?.problemas_oportunidades ?? [])}
                </ul>
            </Campo>

            <Campo titulo={"causa raiz"}>
                <ul>
                    {arrToLi(pm?.causas_raices ?? [])}
                </ul>
            </Campo>

            <Campo titulo={"oportunidad de mejora"}>
                <ul>
                    {arrToLi(pm?.acciones_mejoras ?? [])}
                </ul>
            </Campo>

            <Campo titulo={"recursos"}>
                <ul>
                    {arrToLi(pm?.recursos ?? [])}
                </ul>
            </Campo>

            <Campo titulo={"metas"}>
                <ul>
                    {arrToLi(pm?.metas ?? [])}
                </ul>
            </Campo>

            <Campo titulo={"responsables"}>
                <ul>
                    {arrToLi(pm?.responsables ?? [])}
                </ul>
            </Campo>

            <Campo titulo={"observaciones"}>
                <ul>
                    {arrToLi(pm?.observaciones ?? [])}
                </ul>
            </Campo>
        </div>
    );
}

function Campo(props: {titulo: string, sinBorde?: boolean, children: JSX.Element | Array<JSX.Element>}) {
    return (
        <div className="contenedor-campo">
            <NombreCampo texto={props.titulo} />
            <div style={props.sinBorde ? {border: "none", padding: 0} : {}}>
                {props.children}
            </div>
        </div>
    );
}

function NombreCampo(props: {texto: string}) {
    return (
        <span className="block text-xs opacity-75 font-semibold uppercase mb-2">{props.texto}</span>
    );
}

function arrToLi(arr: Array<CampoConValor>) {
    return arr.map((x) => <li key={x.id}>{x.value}</li>) ?? <></>;
}
