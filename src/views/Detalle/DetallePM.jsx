import React, {useState, useEffect} from "react";
import axios from "axios";


import './DetallePM.css';
import lgif from '../../assets/img/loading-2.gif';
import { useParams } from "react-router";
import { parseCommandLine } from "typescript";

export default function DetallePM(props) {
    
    const {id} = props;

    const [pm , setPM] = useState({});
    const [loading, setLoading] = useState(true);

    //const token = localStorage.getItem("access_token")
    const token = "6|7HKOIwT3cu23MwVgAf5RqQxi4zD1vYMqZJN4O1wd"


    useEffect( () => {
        const getPM = async () => {
            
            setLoading(true);

            const instance = axios.create({
                baseURL: 'https://gestion-calidad-rrii-api.herokuapp.com/api/',
                timeout: 10000,
                headers: {'Authorization': 'Bearer '+token}
            });

            try{
                const response = await instance.get('/plan/'+id);
                console.log(response)
        
                setPM(response.data.data)
                setLoading(false);
            }catch (error) {
                console.log(error)
            }

        }
        getPM();

    }, [] );


    //Si esta cargando retorna el item de carga
    if(loading) {
        return (
            <>
                <img src={lgif} alt="Loading data gif" className="loading-gif"/>
                <h2 className="title-cargando">Cargando...</h2>
            </>
        );
    }


    return (
        <>
            <div>
                <div className="pm-section">
                    <h3 className="pm-section-title"> Datos generales </h3>
                    <hr></hr>
                    <div className="pm-section-content">
                        <div className="pm-codigo pm-attrib">
                            <span className="pm-attrib-name">Codigo: </span>
                        {pm.codigo}
                        </div>
                        <div className="pm-name pm-attrib">
                            <span className="pm-attrib-name">Nombre: </span>
                            {pm.nombre.toUpperCase()}
                        </div>
                        <div className="pm-estandar pm-attrib">
                            <span className="pm-attrib-name">Estandar </span>
                            {pm.id_estandar}
                        </div>
                        <div className="pm-semestre pm-attrib">
                            <span className="pm-attrib-name">Semestre de ejecución </span>
                            {pm.semestre_ejecucion}
                        </div>
                        <div className="pm-avance pm-attrib">
                            <span className="pm-attrib-name">Avance: </span>
                            {pm.avance}%
                        </div>
                        <div className="pm-estado pm-attrib">
                            <span className="pm-attrib-name">Estado: </span>
                            {pm.estado}
                        </div>
                    </div>
                </div>


                <div className="pm-section">
                    <h3 className="pm-section-title"> Datos especificos </h3>
                    <hr></hr>
                    <div className="pm-section-content">
                        <div className="pm-po pm-attrib">
                            <span className="pm-attrib-name">Problema/Oportunidad: </span>
                            <ol className="pm-list">

                                {
                                    pm.problemas_oportunidades.map( po => 
                                        <li className="pm-list-item">{po.descripcion}</li>
                                    )
                                }
                                
                            </ol>
                        </div>
                        <div className="pm-cr pm-attrib">
                            <span className="pm-attrib-name">Causa/Raiz: </span>
                            <ol className="pm-list">
                                {
                                    pm.causas_raices.map( cr => 
                                        <li className="pm-list-item">{cr.descripcion}</li>
                                    )
                                }
                            </ol>
                        </div>
                        <div className="pm-om pm-attrib">
                            <span className="pm-attrib-name">Oportunidad de mejora: </span>
                            { pm.oportunidad_plan.toUpperCase() }
                        </div>
                        <div className="pm-am pm-attrib">
                            <span className="pm-attrib-name">Acciones de mejora: </span>
                            <ol className="pm-list">
                                {
                                    pm.acciones_mejoras.map( am => 
                                        <li className="pm-list-item">{am.descripcion}</li>
                                    )
                                }
                            </ol>
                        </div>

                        <div className="pm-recursos pm-attrib">
                            <span className="pm-attrib-name">Recursos: </span>
                            <ol className="pm-list">
                                {
                                    pm.recursos.map( rec => 
                                        <li className="pm-list-item">{rec.descripcion}</li>
                                    )
                                }
                            </ol>
                        </div>

                        <div className="pm-metas pm-attrib">
                            <span className="pm-attrib-name">Metas: </span>
                            <ol className="pm-list">
                                {
                                    pm.metas.map( meta => 
                                        <li className="pm-list-item">{meta.descripcion}</li>
                                    )
                                }
                            </ol>
                        </div>

                        <div className="pm-responsables pm-attrib">
                            <span className="pm-attrib-name">Responsables: </span>
                            <ol className="pm-list">
                                <li className="pm-list-item">Comite</li>
                            </ol>
                        </div>

                        <div className="pm-obser pm-attrib">
                            <span className="pm-attrib-name">Observaciones: </span>
                            <ol className="pm-list">
                             {
                                    pm.observaciones.map( ob => 
                                        <li className="pm-list-item">{ob.descripcion}</li>
                                    )
                                }
                            </ol>
                        </div>

                        <div className="pm-obser pm-attrib">
                            <span className="pm-attrib-name">Fuentes: </span>
                            <ol className="pm-list">
                             {
                                    pm.fuentes.map( fu => 
                                        <li className="pm-list-item">{fu.descripcion}</li>
                                    )
                                }
                            </ol>
                        </div>

                        <div className="pm-eficacia pm-attrib">
                            <span className="pm-attrib-name">Eficacia: </span>
                            { pm.evaluacion_eficacia? "Si":"No" }
                        </div>
                    </div>
                </div>

            </div>
        </>);
}

