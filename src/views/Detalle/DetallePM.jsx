import React, {useState, useEffect} from "react";
import axios from "axios";
import './DetallePM.css'

export default function DetallePM(props) {
    let {codigo} = props;

    let pm = {}

    //const token = localStorage.getItem("access_token")
    const token = "48|56X6mbt23xMH66zlPBEl9w31w59l25yEDxmLz6z2"


    return (
        <>
            <div>
                <div className="pm-section">
                    <h3 className="pm-section-title"> Datos generales </h3>
                    <hr></hr>
                    <div className="pm-section-content">
                        <div className="pm-codigo pm-attrib">
                            <span className="pm-attrib-name">Codigo: </span>
                            OM-01-2022
                        </div>
                        <div className="pm-name pm-attrib">
                            <span className="pm-attrib-name">Nombre: </span>
                            Plan de mejora para la gestion de egresados
                        </div>
                        <div className="pm-estandar pm-attrib">
                            <span className="pm-attrib-name">Estandar </span>
                            1
                        </div>
                        <div className="pm-semestre pm-attrib">
                            <span className="pm-attrib-name">Semestre de ejecución </span>
                            2022-II
                        </div>
                        <div className="pm-avance pm-attrib">
                            <span className="pm-attrib-name">Avance: </span>
                            50%
                        </div>
                        <div className="pm-estado pm-attrib">
                            <span className="pm-attrib-name">Estado: </span>
                            Desarrollo
                        </div>
                    </div>
                </div>


                <div className="pm-section">
                    <h3 className="pm-section-title"> Datos especificos </h3>
                    <hr></hr>
                    <div className="pm-section-content">
                        <div className="pm-po pm-attrib">
                            <span className="pm-attrib-name">Problema/Oportunidad: </span>
                            <ul className="pm-list">
                                <li className="pm-list-item">Implementacion de un reglamento para propositos articulados</li>
                            </ul>
                        </div>
                        <div className="pm-cr pm-attrib">
                            <span className="pm-attrib-name">Causa/Raiz: </span>
                            <ul className="pm-list">
                                <li className="pm-list-item">Causa Raiz 1</li>
                            </ul>
                        </div>
                        <div className="pm-om pm-attrib">
                            <span className="pm-attrib-name">Oportunidad de mejora: </span>
                            Ipoortunidad de mejora test
                        </div>
                        <div className="pm-am pm-attrib">
                            <span className="pm-attrib-name">Acciones de mejora: </span>
                            <ul className="pm-list">
                                <li className="pm-list-item">Accion de mejora 1</li>
                            </ul>
                        </div>

                        <div className="pm-recursos pm-attrib">
                            <span className="pm-attrib-name">Recursos: </span>
                            <ul className="pm-list">
                                <li className="pm-list-item">Recurso 1</li>
                            </ul>
                        </div>

                        <div className="pm-metas pm-attrib">
                            <span className="pm-attrib-name">Metas: </span>
                            <ul className="pm-list">
                                <li className="pm-list-item">Meta 1</li>
                                <li className="pm-list-item">Meta 2</li>
                            </ul>
                        </div>

                        <div className="pm-responsables pm-attrib">
                            <span className="pm-attrib-name">Responsables: </span>
                            <ul className="pm-list">
                                <li className="pm-list-item">Brayan Guillen</li>
                            </ul>
                        </div>

                        <div className="pm-obser pm-attrib">
                            <span className="pm-attrib-name">Observaciones: </span>
                            <ul className="pm-list">
                                <li className="pm-list-item">Observacion 1</li>
                                <li className="pm-list-item">Observacion 2</li>
                            </ul>
                        </div>

                        <div className="pm-eficacia pm-attrib">
                            <span className="pm-attrib-name">Eficacia: </span>
                            Si
                        </div>
                    </div>
                </div>

            </div>
        </>);
}

