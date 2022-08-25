import { placements } from "@popperjs/core";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Font,
  Image,
  Link,
} from "@react-pdf/renderer";
import { Font_Calibri } from "./Fonts";
import logo_unsa from "./logo_unsa.png";

export default function DocEstandar({ plan }) {
  Font.register(Font_Calibri);
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Calibri",
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    pie_pagina: {
      position: "absolute",
      bottom: 20,
      left: 35,
      right: 35,
      alignItems: "center",
      flexDirection: "row",
      fontSize: 10,
      fontStyle: "normal",
      fontWeight: "bold",
      width: "100%",
      textAlign: "center",
    },
    celda_piedepagina: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
    },
    celda: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
    },
    border: {
      borderColor: "#000000",
      borderStyle: "solid",
      borderWidth: "0.2mm",
      textAlign: "center",
    },
    borderTRL: {
      borderLeftColor: "#000000",
      borderLeftStyle: "solid",
      borderLeftWidth: "0.2mm",
      textAlign: "center",
      borderTopColor: "#000000",
      borderTopStyle: "solid",
      borderTopWidth: "0.2mm",
      borderRightColor: "#000000",
      borderRightStyle: "solid",
      borderRightWidth: "0.2mm",
    },
    borderTBL: {
      borderLeftColor: "#000000",
      borderLeftStyle: "solid",
      borderLeftWidth: "0.2mm",
      borderTopColor: "#000000",
      borderTopStyle: "solid",
      borderTopWidth: "0.2mm",
      borderBottomColor: "#000000",
      borderBottomStyle: "solid",
      borderBottomWidth: "0.2mm",
    },
    borderRL: {
      borderLeftColor: "#000000",
      borderLeftStyle: "solid",
      borderLeftWidth: "0.2mm",
      textAlign: "center",
      borderRightColor: "#000000",
      borderRightStyle: "solid",
      borderRightWidth: "0.2mm",
    },
    borderL: {
      borderLeftColor: "#000000",
      borderLeftStyle: "solid",
      borderLeftWidth: "0.2mm",
    },
    borderR: {
      borderRightColor: "#000000",
      borderRightStyle: "solid",
      borderRightWidth: "0.2mm",
    },
    borderB: {
      borderBottomColor: "#000000",
      borderBottomStyle: "solid",
      borderBottomWidth: "0.2mm",
    },
    borderT: {
      borderTopColor: "#000000",
      borderTopStyle: "solid",
      borderTopWidth: "0.2mm",
    },
    borderLB: {
      borderLeftColor: "#000000",
      borderLeftStyle: "solid",
      borderLeftWidth: "0.2mm",
      borderBottomColor: "#000000",
      borderBottomStyle: "solid",
      borderBottomWidth: "0.2mm",
      textAlign: "center",
    },

    borderLRB: {
      borderLeftColor: "#000000",
      borderLeftStyle: "solid",
      borderLeftWidth: "0.2mm",
      borderRightColor: "#000000",
      borderRightStyle: "solid",
      borderRightWidth: "0.2mm",
      borderBottomColor: "#000000",
      borderBottomStyle: "solid",
      borderBottomWidth: "0.2mm",
    },
    encabezado: {
      alignItems: "center",
      flexDirection: "row",
      fontSize: 10,
      fontStyle: "normal",
      fontWeight: "bold",
      width: "100%",
      textAlign: "center",
      marginBottom: 10,
    },
    fila_encanbezado: {
      alignItems: "center",
      flexDirection: "row",
      fontSize: 10,
      fontStyle: "normal",
      fontWeight: "bold",
      width: "100%",
      textAlign: "center",
      height: "auto",
    },

    fila: {
      alignItems: "center",
      flexDirection: "row",
      fontSize: 10,
      fontStyle: "normal",
      fontWeight: "bold",
      width: "100%",
      textAlign: "center",
      height: "auto",
    },
  });

  return (
    <Document language="es">
      <Page size="A4" style={styles.page} orientation="landscape">
        {/* ENCABEZADO*/}
        <View style={[styles.fila_encanbezado, { marginBottom: 10 }]} fixed>
          <View
            style={[
              styles.celda_piedepagina,
              { width: "20%" },
              styles.borderTBL,
            ]}
          >
            <Image src={logo_unsa} />
          </View>

          <View
            style={[
              styles.celda_piedepagina,
              { width: "80%", height: " 100%" },
            ]}
          >
            <View style={[styles.fila_encanbezado]}>
              <View
                style={[
                  styles.celda_piedepagina,
                  { width: "70%" },
                  styles.borderTBL,
                ]}
              >
                <Text
                  style={{
                    paddingTop: 3,
                    paddingBottom: 1,
                  }}
                >
                  FORMATO
                </Text>
              </View>

              <View
                style={[
                  styles.celda_piedepagina,
                  { width: "15%", height: "auto" },
                  styles.borderTBL,
                ]}
              >
                <Text
                  style={{
                    paddingTop: 3,
                    paddingBottom: 1,
                  }}
                >
                  Código
                </Text>
              </View>

              <View
                style={[
                  styles.celda_piedepagina,
                  { width: "15%" },
                  styles.border,
                ]}
              >
                <Text
                  style={{
                    paddingTop: 3,
                    paddingBottom: 1,
                    fontWeight: "normal",
                  }}
                >
                  F-PE01.04-05
                </Text>
              </View>
            </View>

            <View style={[styles.fila_encanbezado]}>
              <View
                style={[
                  styles.celda_piedepagina,
                  { width: "70%" },
                  styles.borderLB,
                ]}
              >
                <Text style={{ padding: 8 }}>PLAN DE MEJORA</Text>
              </View>
              <View style={[styles.celda_piedepagina, { width: "30%" }]}>
                <View style={[styles.fila_encanbezado]}>
                  <View
                    style={[
                      styles.celda_piedepagina,
                      { width: "50%" },
                      styles.borderLB,
                    ]}
                  >
                    <Text style={{ paddingTop: 3, paddingBottom: 1 }}>
                      Versión
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.celda_piedepagina,
                      { width: "50%" },
                      styles.borderLRB,
                    ]}
                  >
                    <Text
                      style={{
                        paddingTop: 3,
                        paddingBottom: 1,
                        fontWeight: "normal",
                      }}
                    >
                      1.0
                    </Text>
                  </View>
                </View>

                <View style={[styles.fila_encanbezado]}>
                  <View
                    style={[
                      styles.celda_piedepagina,
                      { width: "50%" },
                      styles.borderLB,
                    ]}
                  >
                    <Text style={{ paddingTop: 3, paddingBottom: 1 }}>
                      Página
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.celda_piedepagina,
                      {
                        width: "50%",
                        height: "auto",
                        textAlign: "center",
                      },
                      styles.borderLRB,
                    ]}
                  >
                    <View
                      style={{
                        paddingTop: 3,
                        paddingBottom: 1,
                        fontWeight: "normal",
                      }}
                    >
                      <Text
                        render={({ pageNumber, totalPages }) => (
                          <Text
                            style={{
                              fontFamily: "Calibri",
                              fontSize: 10,
                              textAlign: "center",
                              marginRight: 10,
                              marginLeft: 10,
                            }}
                          >
                            Pagina{" "}
                            <Text
                              style={{
                                fontFamily: "Calibri",
                                fontSize: 10,
                                fontWeight: 700,
                              }}
                            >
                              {pageNumber}
                            </Text>
                            {"\n"}de{" "}
                            <Text
                              style={{
                                fontFamily: "Calibri",
                                fontSize: 10,
                                fontWeight: 700,
                              }}
                            >
                              {totalPages}
                            </Text>
                          </Text>
                        )}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/*TABLA PLAN DE MEJORA*/}
        <View style={[styles.fila, { backgroundColor: "#f2f2f2" }]}>
          <View style={[styles.celda, { width: "4%" }, styles.borderTBL]}>
            <Text style={{ padding: 2 }}>Código</Text>
          </View>
          <View style={[styles.celda, { width: "7%" }, styles.borderTBL]}>
            <Text style={{ padding: 2 }}>Fuente</Text>
          </View>
          <View style={[styles.celda, { width: "7%" }, styles.borderTBL]}>
            <Text style={{ padding: 2 }}>Problema / oportunidad</Text>
          </View>
          <View style={[styles.celda, { width: "8%" }, styles.borderTBL]}>
            <Text style={{ padding: 2 }}>Causa Raíz</Text>
          </View>
          <View style={[styles.celda, { width: "7%" }, styles.borderTBL]}>
            <Text style={{ padding: 2 }}>
              Oportunidad de mejora / Plan de mejora
            </Text>
          </View>
          <View style={[styles.celda, { width: "7%" }, styles.borderTBL]}>
            <Text style={{ padding: 2 }}>Acciones de Mejora</Text>
          </View>
          <View style={[styles.celda, { width: "5%" }, styles.borderTBL]}>
            <Text style={{ padding: 2 }}>Semestre de Ejecución</Text>
          </View>
          <View style={[styles.celda, { width: "5%" }, styles.borderTBL]}>
            <Text style={{ padding: 2 }}>Duración ( meses )</Text>
          </View>
          <View style={[styles.celda, { width: "6%" }, styles.borderTBL]}>
            <Text style={{ padding: 2 }}>Recursos Necesarios</Text>
          </View>
          <View style={[styles.celda, { width: "7%" }, styles.borderTBL]}>
            <Text style={{ padding: 2 }}>Metas</Text>
          </View>
          <View style={[styles.celda, { width: "7%" }, styles.borderTBL]}>
            <Text style={{ padding: 2 }}>Responsables</Text>
          </View>
          <View style={[styles.celda, { width: "10%" }, styles.borderTBL]}>
            <Text style={{ padding: 2 }}>Observaciones</Text>
          </View>
          <View style={[styles.celda, { width: "5%" }, styles.borderTBL]}>
            <Text style={{ padding: 2 }}>Estado</Text>
          </View>
          <View style={[styles.celda, { width: "6%" }, styles.borderTBL]}>
            <Text style={{ padding: 2 }}>Evidencia</Text>
          </View>
          <View style={[styles.celda, { width: "5%" }, styles.borderTBL]}>
            <Text style={{ padding: 2 }}>% de Avance</Text>
          </View>
          <View style={[styles.celda, { width: "4%" }, styles.border]}>
            <Text style={{ padding: 2 }}>Evaluación de Eficacia</Text>
          </View>
        </View>
        <View style={[styles.fila, { fontWeight: "normal" }]}>
          <View style={[styles.celda, { width: "4%" }, styles.borderLB]}>
            <Text style={{ padding: 2 }}>(01)</Text>
          </View>
          <View style={[styles.celda, { width: "7%" }, styles.borderLB]}>
            <Text style={{ padding: 2 }}>(02)</Text>
          </View>
          <View style={[styles.celda, { width: "7%" }, styles.borderLB]}>
            <Text style={{ padding: 2 }}>(03)</Text>
          </View>
          <View style={[styles.celda, { width: "8%" }, styles.borderLB]}>
            <Text style={{ padding: 2 }}>(04)</Text>
          </View>
          <View style={[styles.celda, { width: "7%" }, styles.borderLB]}>
            <Text style={{ padding: 2 }}>(05)</Text>
          </View>
          <View style={[styles.celda, { width: "7%" }, styles.borderLB]}>
            <Text style={{ padding: 2 }}>(06)</Text>
          </View>
          <View style={[styles.celda, { width: "5%" }, styles.borderLB]}>
            <Text style={{ padding: 2 }}>(07)</Text>
          </View>
          <View style={[styles.celda, { width: "5%" }, styles.borderLB]}>
            <Text style={{ padding: 2 }}>(08)</Text>
          </View>
          <View style={[styles.celda, { width: "6%" }, styles.borderLB]}>
            <Text style={{ padding: 2 }}>(09)</Text>
          </View>
          <View style={[styles.celda, { width: "7%" }, styles.borderLB]}>
            <Text style={{ padding: 2 }}>(10)</Text>
          </View>
          <View style={[styles.celda, { width: "7%" }, styles.borderLB]}>
            <Text style={{ padding: 2 }}>(11)</Text>
          </View>
          <View style={[styles.celda, { width: "10%" }, styles.borderLB]}>
            <Text style={{ padding: 2 }}>(12)</Text>
          </View>
          <View style={[styles.celda, { width: "5%" }, styles.borderLB]}>
            <Text style={{ padding: 2 }}>(13)</Text>
          </View>
          <View style={[styles.celda, { width: "6%" }, styles.borderLB]}>
            <Text style={{ padding: 2 }}>(14)</Text>
          </View>
          <View style={[styles.celda, { width: "5%" }, styles.borderLB]}>
            <Text style={{ padding: 2 }}>(15)</Text>
          </View>
          <View style={[styles.celda, { width: "4%" }, styles.borderLRB]}>
            <Text style={{ padding: 2 }}>(16)</Text>
          </View>
        </View>

        <View style={[styles.fila, { fontWeight: "normal" }]}>
          <View
            style={[
              styles.celda,
              { width: "4%", paddingBottom: 10 },
              styles.borderLB,
            ]}
          >
            <Text style={{ margin: 2 }}>
              {plan.codigo.split("-").join("-\n")}
            </Text>
          </View>
          <View
            style={[
              styles.celda,
              { width: "7%", paddingBottom: 10 },
              styles.borderLB,
            ]}
          >
            <Text style={{ margin: 2 }}>
              {plan.fuentes.map((el) => {
                return "- " + el.value + "\n";
              })}
            </Text>
          </View>
          <View
            style={[
              styles.celda,
              { width: "7%", paddingBottom: 10 },
              styles.borderLB,
            ]}
          >
            <Text style={{ margin: 2 }}>
              {plan.problemas_oportunidades.map((el) => {
                return "- " + el.value + "\n";
              })}
            </Text>
          </View>
          <View
            style={[
              styles.celda,
              { width: "8%", paddingBottom: 10 },
              styles.borderLB,
            ]}
          >
            <Text style={{ margin: 2 }}>
              {plan.causas_raices.map((el) => {
                return "- " + el.value + "\n";
              })}
            </Text>
          </View>
          <View
            style={[
              styles.celda,
              { width: "7%", paddingBottom: 10 },
              styles.borderLB,
            ]}
          >
            <Text style={{ margin: 2 }}>{plan.oportunidad_plan}</Text>
          </View>
          <View
            style={[
              styles.celda,
              { width: "7%", paddingBottom: 10 },
              styles.borderLB,
            ]}
          >
            <Text style={{ margin: 2 }}>
              {plan.acciones_mejoras.map((el) => {
                return "- " + el.value + "\n";
              })}
            </Text>
          </View>
          <View
            style={[
              styles.celda,
              { width: "5%", paddingBottom: 10 },
              styles.borderLB,
            ]}
          >
            <Text style={{ margin: 2 }}>
              {plan.semestre_ejecucion.split("-").join("-\n")}
            </Text>
          </View>
          <View
            style={[
              styles.celda,
              { width: "5%", paddingBottom: 10 },
              styles.borderLB,
            ]}
          >
            <Text style={{ margin: 2 }}>{plan.duracion}</Text>
          </View>
          <View
            style={[
              styles.celda,
              { width: "6%", paddingBottom: 10 },
              styles.borderLB,
            ]}
          >
            <Text style={{ margin: 2 }}>
              {plan.recursos.map((el) => {
                return "- " + el.value + "\n";
              })}
            </Text>
          </View>
          <View
            style={[
              styles.celda,
              { width: "7%", paddingBottom: 10 },
              styles.borderLB,
            ]}
          >
            <Text style={{ margin: 2 }}>
              {plan.metas.map((el) => {
                return "- " + el.value + "\n";
              })}
            </Text>
          </View>
          <View
            style={[
              styles.celda,
              { width: "7%", paddingBottom: 10 },
              styles.borderLB,
            ]}
          >
            <Text style={{ margin: 2 }}>
              {plan.responsables.map((el) => {
                return "- " + el.value + "\n";
              })}
            </Text>
          </View>
          <View
            style={[
              styles.celda,
              { width: "10%", paddingBottom: 10 },
              styles.borderLB,
            ]}
          >
            <Text style={{ margin: 2 }}>
              {plan.observaciones.map((el) => {
                return "- " + el.value + "\n";
              })}
            </Text>
          </View>
          <View style={[styles.celda, { width: "5%" }, styles.borderLB]}>
            <Text style={{ margin: 2, paddingBottom: 10 }}>{plan.estado}</Text>
          </View>
          <View style={[styles.celda, { width: "6%" }, styles.borderLB]}>
            <Text style={{ margin: 2, paddingBottom: 10 }}>
              {plan.evidencias.map((el) => {
                return (
                  "- " +
                  el.codigo.substring(0, 5) +
                  "\n" +
                  el.codigo.substring(5, el.codigo.length) +
                  "\n"
                );
              })}
            </Text>
          </View>
          <View style={[styles.celda, { width: "5%" }, styles.borderLB]}>
            <Text style={{ margin: 2, paddingBottom: 10 }}>{plan.avance}</Text>
          </View>
          <View style={[styles.celda, { width: "4%" }, styles.borderLRB]}>
            <Text style={{ margin: 2, paddingBottom: 10 }}>
              {plan.evaluacion_eficacia ? "SI" : "NO"}
            </Text>
          </View>
        </View>

        {/*DESCRIPCION*/}
        <View style={{ fontSize: 12, padding: 10, height: "auto" }}>
          <Text>
            (1) Registrar en la columna el código de la acción de la mejora
            continua, por ejemplo: OM{"-"}01:2020, que refiere a la oportunidad
            de mejora 01 correspondiente al año 2020.{"\n"}
            (2) Registrar si la fuente de la Mejora proviene de:{"\n"}
          </Text>
          <Text style={{ marginHorizontal: 20 }}>
            {"•"} Solicitudes de acción correctiva{"\n"}
            {"•"} Servicios no conformes{"\n"}
            {"•"} Quejas Evaluación de competencias. {"\n"}
            {"•"} Evaluación de los objetivos Educacionales. {"\n"}
            {"•"} Actividades diarias. {"\n"}
            {"•"} Lineamientos institucionales.{"\n"}
            {"•"} Acuerdos de Consejo de Facultad y Asamblea Docente.{"\n"}
            {"•"} Buenas prácticas de otras organizaciones.{"\n"}
            {"•"} Otros{"\n"}
          </Text>
          <Text>
            (3) Registre el problema / oportunidad que genera la mejora.{"\n"}
            (4) Registre la causa raíz, producto de un análisis (utilice, la
            técnica de los 5 porqués, Ishikawa, Pareto,entre otros).{"\n"}
            (5) Registre la denominación de la Oportunidad de mejora o el Plan
            de mejora.{"\n"}
            (6) Registre las acciones necesarias para ejecutar el plan de mejora
            registrado en el (4).{"\n"}
            (7) Registre si las actividades se realizaran en el semestre A o B.
            {"\n"}
            (8) Registrar la duración en meses de preferencia.{"\n"}
            (9) Registrar los recursos necesarios: Humanos,
            Tecnológicos,logísticos, otros.{"\n"}
            (10) Registrar la meta que se espera lograr al término del plan de
            mejora que atienda directamente la causa raíz del problema / mejora.
            {"\n"}
            (11) Registrar los responsables de la ejecución de las actividades
            registradas en el punto (5).{"\n"}
            (12) Registrar en esta sección las acciones vinculadas a las mejoras
            y en qué circunstancias se están realizando o realizaran, que
            permita al lector del informe tener conocimiento de la OM.{"\n"}
            (13) Registrar algunas de las siguientes alternativas: Planificado,
            Programado, Reprogramado, En proceso o Concluido.{"\n"}
            (14) Registrar el código de la evidencia (s) Planificado de 0% a
            10%; Reprogramado de 0% a 5%; En Desarrollo de 11% a 99%, Concluido
            100%.{"\n"}
            (15) Registrar el calificativo de la evaluación categóricamente: Sí
            o No.{"\n"}
          </Text>
        </View>

        {/* PIE DE PAGINA*/}
        <View style={styles.pie_pagina} fixed>
          <View
            style={[
              styles.celda_piedepagina,
              { width: "18%" },
              styles.borderTBL,
            ]}
          >
            <Text style={{ padding: 5 }}>Formato: Digital</Text>
          </View>
          <View
            style={[
              styles.celda_piedepagina,
              { width: "62%" },
              styles.borderTBL,
            ]}
          >
            <Text style={{ padding: 8 }}>
              La impresión de este documento desde la Intranet constituye una
              "COPIA NO CONTROLADA" a excepción de que se indique lo contrario
            </Text>
          </View>
          <View
            style={[styles.celda_piedepagina, { width: "20%" }, styles.border]}
          >
            <Text style={{ padding: 5 }}>Clasificación: Interno</Text>
          </View>
        </View>
      </Page>

      <Page size="A4" style={styles.page} orientation="portrait">
        {/* ENCABEZADO*/}
        <View style={[styles.fila_encanbezado, { marginBottom: 10 }]} fixed>
          <View
            style={[
              styles.celda_piedepagina,
              { width: "20%" },
              styles.borderTBL,
            ]}
          >
            <Image src={logo_unsa} />
          </View>

          <View
            style={[
              styles.celda_piedepagina,
              { width: "80%", height: " 100%" },
            ]}
          >
            <View style={[styles.fila_encanbezado]}>
              <View
                style={[
                  styles.celda_piedepagina,
                  { width: "70%" },
                  styles.borderTBL,
                ]}
              >
                <Text
                  style={{
                    paddingTop: 3,
                    paddingBottom: 1,
                  }}
                >
                  FORMATO
                </Text>
              </View>

              <View
                style={[
                  styles.celda_piedepagina,
                  { width: "15%", height: "auto" },
                  styles.borderTBL,
                ]}
              >
                <Text
                  style={{
                    paddingTop: 3,
                    paddingBottom: 1,
                  }}
                >
                  Código
                </Text>
              </View>

              <View
                style={[
                  styles.celda_piedepagina,
                  { width: "15%" },
                  styles.border,
                ]}
              >
                <Text
                  style={{
                    paddingTop: 3,
                    paddingBottom: 1,
                    fontWeight: "normal",
                  }}
                >
                  F-PE01.04-05
                </Text>
              </View>
            </View>

            <View style={[styles.fila_encanbezado]}>
              <View
                style={[
                  styles.celda_piedepagina,
                  { width: "70%" },
                  styles.borderLB,
                ]}
              >
                <Text style={{ padding: 8 }}>PLAN DE MEJORA</Text>
              </View>
              <View style={[styles.celda_piedepagina, { width: "30%" }]}>
                <View style={[styles.fila_encanbezado]}>
                  <View
                    style={[
                      styles.celda_piedepagina,
                      { width: "50%" },
                      styles.borderLB,
                    ]}
                  >
                    <Text style={{ paddingTop: 3, paddingBottom: 1 }}>
                      Versión
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.celda_piedepagina,
                      { width: "50%" },
                      styles.borderLRB,
                    ]}
                  >
                    <Text
                      style={{
                        paddingTop: 3,
                        paddingBottom: 1,
                        fontWeight: "normal",
                      }}
                    >
                      1.0
                    </Text>
                  </View>
                </View>

                <View style={[styles.fila_encanbezado]}>
                  <View
                    style={[
                      styles.celda_piedepagina,
                      { width: "50%" },
                      styles.borderLB,
                    ]}
                  >
                    <Text style={{ paddingTop: 3, paddingBottom: 1 }}>
                      Página
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.celda_piedepagina,
                      {
                        width: "50%",
                        height: "auto",
                        textAlign: "center",
                      },
                      styles.borderLRB,
                    ]}
                  >
                    <View
                      style={{
                        paddingTop: 3,
                        paddingBottom: 1,
                        fontWeight: "normal",
                      }}
                    >
                      <Text
                        render={({ pageNumber, totalPages }) => (
                          <Text
                            style={{
                              fontFamily: "Calibri",
                              fontSize: 10,
                              textAlign: "center",
                              marginRight: 10,
                              marginLeft: 10,
                            }}
                          >
                            Pagina{" "}
                            <Text
                              style={{
                                fontFamily: "Calibri",
                                fontSize: 10,
                                fontWeight: 700,
                              }}
                            >
                              {pageNumber}
                            </Text>
                            {"\n"}de{" "}
                            <Text
                              style={{
                                fontFamily: "Calibri",
                                fontSize: 10,
                                fontWeight: 700,
                              }}
                            >
                              {totalPages}
                            </Text>
                          </Text>
                        )}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* TABLA DE EVIDENCIAS */}

        <View
          style={[styles.fila, { backgroundColor: "#f2f2f2", fontSize: 12 }]}
        >
          <View style={[styles.celda, { width: "10%" }, styles.borderTBL]}>
            <Text style={{ padding: 2 }}>
              <Text style={{ fontWeight: "bold" }}>Nº</Text>
            </Text>
          </View>
          <View style={[styles.celda, { width: "20%" }, styles.borderTBL]}>
            <Text style={{ padding: 2 }}>
              <Text style={{ fontWeight: "bold" }}>Código</Text>
            </Text>
          </View>
          <View style={[styles.celda, { width: "50%" }, styles.borderTBL]}>
            <Text style={{ padding: 2 }}>
              <Text style={{ fontWeight: "bold" }}>Denominación</Text>
            </Text>
          </View>
          <View style={[styles.celda, { width: "20%" }, styles.border]}>
            <Text style={{ padding: 2 }}>
              <Text style={{ fontWeight: "bold" }}>Adjunto</Text>
            </Text>
          </View>
        </View>

        {plan.evidencias.length > 0 ? (
          plan.evidencias.map((evidencia, index) => (
            <View
              key={index}
              style={[styles.fila, { fontWeight: "normal", fontSize: 12 }]}
            >
              <View style={[styles.celda, { width: "10%" }, styles.borderLB]}>
                <Text style={{ padding: 2 }}>
                  <Text>{index + 1}</Text>
                </Text>
              </View>
              <View style={[styles.celda, { width: "20%" }, styles.borderLB]}>
                <Text style={{ padding: 2 }}>{evidencia.codigo}</Text>
              </View>
              <View style={[styles.celda, { width: "50%" }, styles.borderLB]}>
                <Text style={{ padding: 2 }}>
                  <Text>{evidencia.denominacion}</Text>
                </Text>
              </View>
              <View style={[styles.celda, { width: "20%" }, styles.borderLRB]}>
                <Text style={{ padding: 2 }}>
                  <Text>Anexo {" " + (index + 1)}</Text>
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={[styles.fila, { fontWeight: "normal", fontSize: 12 }]}>
            <View style={[styles.celda, { width: "100%" }, styles.borderLRB]}>
              <Text style={{ padding: 2 }}>No hay evidencias</Text>
            </View>
          </View>
        )}

        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 12,
            paddingTop: 5,
          }}
        >
          Tabla 4-2 Consolidado de evidencias de los planes de mejora.
        </Text>

        {/* PIE DE PAGINA*/}
        <View style={styles.pie_pagina} fixed>
          <View
            style={[
              styles.celda_piedepagina,
              { width: "18%" },
              styles.borderTBL,
            ]}
          >
            <Text style={{ padding: 5 }}>Formato: Digital</Text>
          </View>
          <View
            style={[
              styles.celda_piedepagina,
              { width: "62%" },
              styles.borderTBL,
            ]}
          >
            <Text style={{ padding: 8 }}>
              La impresión de este documento desde la Intranet constituye una
              "COPIA NO CONTROLADA" a excepción de que se indique lo contrario
            </Text>
          </View>
          <View
            style={[styles.celda_piedepagina, { width: "20%" }, styles.border]}
          >
            <Text style={{ padding: 5 }}>Clasificación: Interno</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
