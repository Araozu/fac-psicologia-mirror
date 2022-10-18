import React, { useState, useEffect } from "react";
import axios from "axios";

import "./DetallePM.css";
import lgif from "../../../../assets/img/loading-2.gif";
//import { PDFDownloadLink } from "@react-pdf/renderer";
import DocEstandar from "../../../pdf-generator/DocEstandar";
import { useParams } from "react-router";
import { parseCommandLine } from "typescript";

export default function DetallePM({ id }) {
  const [pm, setPM] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access_token");
  //const token = "6|7HKOIwT3cu23MwVgAf5RqQxi4zD1vYMqZJN4O1wd"

  useEffect(() => {
    const getPM = async () => {
      setLoading(true);

            const instance = axios.create({
                baseURL: "https://gestion-calidad-rrii-api.herokuapp.com/api/",
                timeout: 10000,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

      try {
        const response = await instance.get("/plan/" + id);
        /* console.log(response); */
        setPM(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPM();
    console.log("PM:",pm);
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
    <>
      <table className="detail-table">
        <tbody>
          <tr>
            <th>Campo</th>
            <th>Contenido</th>
          </tr>

          <tr>
            <td>Codigo </td>
            <td> {pm.codigo.toUpperCase()} </td>
          </tr>

          <tr>
            <td> Nombre del plan </td>
            <td> {pm.nombre.toUpperCase()} </td>
          </tr>

          <tr>
            <td>Estado</td>
            <td> {pm.estado.toUpperCase()} </td>
          </tr>

          <tr>
            <td>Estandar</td>
            <td> ESTANDAR {pm.id_estandar}</td>
          </tr>

          <tr>
            <td>Semestre</td>
            <td> {pm.semestre_ejecucion.toUpperCase()}</td>
          </tr>

          <tr>
            <td>Duracion</td>
            <td> {pm.duracion} MES(ES)</td>
          </tr>

          <tr>
            <td>Avance</td>
            <td> {pm.avance} %</td>
          </tr>

          <tr>
            <td>Evaluacion eficacia</td>
            <td> {pm.evaluacion_eficacia ? "SI" : "NO"} </td>
          </tr>

          <tr>
            <td>Fuentes</td>
            <td>
              <ul className="pm-list">
                {pm.fuentes.map((fu, index) => (
                  <li key={index} className="pm-list-item">
                    {fu.value.toUpperCase()}
                  </li>
                ))}
              </ul>
            </td>
          </tr>

          <tr>
            <td>Problema/Oportunidad</td>
            <td>
              <ul className="pm-list">
                {pm.problemas_oportunidades.map((po, index) => (
                  <li key={index} className="pm-list-item">
                    {po.value.toUpperCase()}
                  </li>
                ))}
              </ul>
            </td>
          </tr>

          <tr>
            <td>Causa Raiz</td>
            <td>
              <ul className="pm-list">
                {pm.causas_raices.map((cr, index) => (
                  <li key={index} className="pm-list-item">
                    {cr.value.toUpperCase()}
                  </li>
                ))}
              </ul>
            </td>
          </tr>

          <tr>
            <td>Oportunidad de mejora</td>
            <td> Estandar {pm.oportunidad_plan.toUpperCase()}</td>
          </tr>

          <tr>
            <td>Acciones de mejora</td>
            <td>
              <ul className="pm-list">
                {pm.acciones_mejoras.map((am, index) => (
                  <li key={index} className="pm-list-item">
                    {am.value.toUpperCase()}
                  </li>
                ))}
              </ul>
            </td>
          </tr>

          <tr>
            <td>Recursos</td>
            <td>
              <ul className="pm-list">
                {pm.recursos.map((re, index) => (
                  <li key={index} className="pm-list-item">
                    {re.value.toUpperCase()}
                  </li>
                ))}
              </ul>
            </td>
          </tr>

          <tr>
            <td>Metas</td>
            <td>
              <ul className="pm-list">
                {pm.metas.map((me, index) => (
                  <li key={index} className="pm-list-item">
                    {me.value.toUpperCase()}
                  </li>
                ))}
              </ul>
            </td>
          </tr>

          <tr>
            <td>Responsables</td>
            <td>
              <ul className="pm-list">
                {pm.responsables.map((ob, index) => (
                  <li key={index} className="pm-list-item">
                    {ob.value.toUpperCase()}
                  </li>
                ))}
              </ul>
            </td>
          </tr>

          <tr>
            <td>Observaciones</td>
            <td>
              <ul className="pm-list">
                {pm.observaciones.map((ob, index) => (
                  <li key={index} className="pm-list-item">
                    {ob.value.toUpperCase()}
                  </li>
                ))}
              </ul>
            </td>
          </tr>

          <tr>
            <td>Evidencias</td>
            <td>
              <ul className="pm-list">
                {pm.evidencias.map((ob, index) => (
                  <li key={index} className="pm-list-item">
                    {ob.denominacion}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <PDFDownloadLink
        document={<DocEstandar plan={pm} />}
        fileName={pm.codigo + "-" + new Date().toLocaleString() + ".pdf"}
      >
        {({ loading }) =>
          loading ? (
            "Loading document..."
          ) : (
            <button className="border bg-white p-2" type="button">
              Descargar plan de mejora
            </button>
          )
        }
      </PDFDownloadLink>
    </>
  );
}
