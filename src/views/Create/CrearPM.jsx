import React, {useState, useEffect} from "react";
import {Formik, useFormik} from "formik";
import Select from 'react-select'


export default function Crear() {

    const formik = useFormik({
        initialValues: {
            nombre:"",
            estandar:"",
            codigo: "",
            fuente: "0",
            po: {},
            cr: {},
            omr: "",
            amr: "",
            anio: "",
            semestre: "",
            duracion: "",
            recursos: "",
            meta: "",
            responsables: "",
            observaciones: "",
            estado: "",
            evidencias: "",
            avance: 0,
            eficacia: true,
        },
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
        },
        validate: (values) => {
            let errors = {};
            if (values.codigo === "") {
                errors.codigo = "Required";
            }

            return errors;
        },

    });

    //Inicio para código en fuente
    const [fuente, setFuente] = useState("");
    const [otrosF, setOtrosF] = useState(true);

    const selectFuente = (e) => {
        setFuente(e.target.value);


    };
    useEffect(() => {

        if (fuente !== "Otros") {
            setOtrosF(true);
            formik.values.fuente = fuente;

        } else {
            setOtrosF(false);
        }
    }, [fuente]);

    const fuentes = [
        {
            value: "",
            text: "",
        }
        , {
            value: "0",
            text: "a",
        },
        {
            value: "1",
            text: "b",
        },
        {
            value: "Otros",
            text: "otros",
        },
    ];
    //Fin para código en fuente

    //Inicio código Plan de Mejora
    const [poList, setPOList] = useState([{descripcion: ""}]);
    const handlePOAdd = () => {
        setPOList([...poList, {descripcion: ""}]);
    };
    const handlePORemove = (index) => {
        const list = [...poList];
        list.splice(index, 1);
        setPOList(list);

    };
    const handlePOChange = (e, index) => {
        const {
            name,
            value,
        } = e.target;
        const list = [...poList];
        list[index][name] = value;
        setPOList(list);

    };
    useEffect(() => {
        formik.values.po = poList;
    }, [poList]);
    //Fin código Plan de Mejora

    // Inicio Causa Raiz
    const [crList, setCRList] = useState([{descripcion: ""}]);
    const handleCRAdd = () => {
        setCRList([...crList, {descripcion: ""}]);
    };
    const handleCRRemove = (index) => {
        const list = [...crList];
        list.splice(index, 1);
        setCRList(list);

    };
    const handleCRChange = (e, index) => {
        const {
            name,
            value,
        } = e.target;
        const list = [...crList];
        list[index][name] = value;
        setCRList(list);

    };
    useEffect(() => {
        formik.values.cr = crList;
    }, [crList]);

    //Fin Causa Raiz

    //Inicio Acciones de mejora
    const [amList, setAMList] = useState([{descripcion: ""}]);
    const handleAMAdd = () => {
        setAMList([...amList, {descripcion: ""}]);
    };
    const handleAMRemove = (index) => {
        const list = [...amList];
        list.splice(index, 1);
        setAMList(list);

    };
    const handleAMChange = (e, index) => {
        const {
            name,
            value,
        } = e.target;
        const list = [...amList];
        list[index][name] = value;
        setAMList(list);

    };
    useEffect(() => {
        formik.values.amr = amList;
    }, [amList]);
    //Fin Acciones de mejora

    //Recursos
    const [recurso, setRecurso] = useState("");
    const [otrosR, setOtrosR] = useState(true);

    const selectRecurso = (e) => {
        setRecurso(e.target.value);
    };
    useEffect(() => {

        if (recurso !== "Otros") {
            setOtrosR(true);
            formik.values.recursos = recurso;

        } else {
            setOtrosR(false);
        }
    }, [recurso]);

    const recursos = [
        {
            value: "",
            text: "",
        }
        , {
            value: "a",
            text: "0",
        },
        {
            value: "b",
            text: "1",
        },
        {
            value: "Otros",
            text: "otros",
        },
    ];
    //Fin Recursos

    //inicio Metas
    const [mList, setMList] = useState([{descripcion: ""}]);
    const handleMAdd = () => {
        setMList([...mList, {descripcion: ""}]);
    };
    const handleMRemove = (index) => {
        const list = [...mList];
        list.splice(index, 1);
        setMList(list);

    };
    const handleMChange = (e, index) => {
        const {
            name,
            value,
        } = e.target;
        const list = [...mList];
        list[index][name] = value;
        setMList(list);

    };
    useEffect(() => {
        formik.values.meta = mList;
    }, [mList]);
    //fin metas

    //inicio responsables
    const [rList, setRList] = useState([{descripcion: ""}]);
    const handleRAdd = () => {
        setRList([...rList, {descripcion: ""}]);
    };
    const handleRRemove = (index) => {
        const list = [...rList];
        list.splice(index, 1);
        setRList(list);

    };
    const handleRChange = (e, index) => {
        const {
            name,
            value,
        } = e.target;
        const list = [...rList];
        list[index][name] = value;
        setRList(list);

    };
    useEffect(() => {
        formik.values.responsables = rList;
    }, [rList]);
    //fin responsables

    //inicio observaciones
    const [oList, setOList] = useState([{descripcion: ""}]);
    const handleOAdd = () => {
        setOList([...oList, {descripcion: ""}]);
    };
    const handleORemove = (index) => {
        const list = [...oList];
        list.splice(index, 1);
        setOList(list);

    };
    const handleOChange = (e, index) => {
        const {
            name,
            value,
        } = e.target;
        const list = [...oList];
        list[index][name] = value;
        setOList(list);

    };
    useEffect(() => {
        formik.values.observaciones = oList;
    }, [oList]);
    //fin responsables

    //inicio estado
    const [estado, setEstado] = useState("");
    const selectEstado = (e) => {
        setEstado(e.target.value);
    };
    useEffect(() => {
            formik.values.estado = estado;
    }, [estado]);

    const estados = [
        {
            value: "",
            text: "",
        }
        , {
            value: "1",
            text: "Listo",
        },
        {
            value: "2",
            text: "Pendiente",
        },
        {
            value: "Otros",
            text: "otros",
        },
    ];
    //fin estado

    //inicio eficacia
    const [eficacia, setEficacia] = useState("");
    const selectEficacia = (e) => {
        setEficacia(e.target.value);
    };
    useEffect(() => {
        formik.values.eficacia = eficacia;
    }, [eficacia]);

    const efis = [
        {
            value: true,
            text: "Si",
        },
        {
            value: false,
            text: "No",
        },
    ];
    //fin estado

    //estandares
    const estandares = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    const handleSelectestandarChange=(event) =>{
        formik.values.estandar= event.value
    }

//https://formik.org/docs/tutorial documentacion formik

    return (<form onSubmit={formik.handleSubmit}>
        <table className="items-center w-full bg-transparent border-collapse">
            <thead>
            <tr className={"flex-col border border-solid justify-center items-center px-3 py-3 uppercase text-lg border font-semibold border-l-0 border-r-0"}>
                 Formulario de Creación de Planes de Mejora

            </tr>
            </thead>
            <tbody>
            {/*nombre del PM*/}
            <tr>
                <th className={"px-3 flex py-3 text-left text-base"}>
                    Nombra tu plan de mejora
                </th>
                <td>
                    <input id="nombre" name="nombre" type="text" onChange={formik.handleChange}
                           placeholder={"Plan de Mejora para ..."}
                           style={{
                               height: "35px",
                               width: "300px",
                               borderRadius: 5,
                               textAlign: "center",
                               display: "flex",
                               justifyContent: "center",
                           }}/>
                </td>
            </tr>
            {/*Definiendo estandar*/}
            <tr>
                <th className={"px-3 flex py-3 text-left text-base"}>
                    Estándar
                </th>

                <td>
                    <Select options={estandares} onChange={handleSelectestandarChange}/>
                </td>

            </tr>
            {/*Fila de texto Código*/}
            <tr>
                <th className={"px-3 flex py-3 text-left text-base"}>
                    Código (1)
                </th>
                <td>
                    <label className={"pl-4 pr-0 items-center align-middle text-base font-normal"}
                           style={{color: "blue"}}>OM-</label>
                </td>
                <td>
                    <input id="codigo" name="codigo" type="text" onChange={formik.handleChange}
                           placeholder={"01-2022"}
                           style={{
                               height: "35px",
                               width: "300px",
                               borderRadius: 5,
                               textAlign: "center",
                               display: "flex",
                               justifyContent: "center",
                           }}/>
                </td>
            </tr>
            {/*fila de selección de fuente*/}
            <tr>
                <th className={"px-3 flex py-3 text-left text-base"}>
                    Fuente (2)
                </th>
                <td className={"font-normal"}>
                    <select onChange={(e) => selectFuente(e)}>
                        {fuentes.map((option, index) => (
                            <option key={index} value={option.value}>{option.text}</option>
                        ))}
                    </select>
                </td>
                <td className={"font-normal"}>
                    <input id="fuente" name="fuente" type="text" onChange={formik.handleChange}
                           value={formik.values.fuente} disabled={otrosF} style={{
                        height: "35px",
                        width: "500px",
                        borderRadius: 5,
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                    }}/>
                </td>
            </tr>
            {/*fila problema oportunidad */}
            <tr>
                <th className={"px-3 flex py-3 text-left text-base"}>
                    Problema/Oportunidad (3)
                </th>
                <td>
                    {poList.map((singlePO, index) => (
                        <div key={index}>
                            <td>
                                <input id="po" name="descripcion" type="text" value={singlePO.descripcion}
                                       onChange={(e) => handlePOChange(e, index)} style={{
                                    height: "35px",
                                    width: "500px",
                                    borderRadius: 5,
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                }}/>
                                {poList.length - 1 === index && poList.length < 4 && (
                                    <button type="button" onClick={handlePOAdd}>+</button>)}
                                {poList.length > 1 && (
                                    <button type="button" onClick={() => handlePORemove(index)}>Eliminar</button>)}
                            </td>
                        </div>
                    ))}
                </td>
            </tr>
            {/*fila causa raíz*/}
            <tr>
                <th className={"px-3 flex py-3 text-left text-base"}>
                    Causa/Raiz (4)
                </th>
                <td>
                    {crList.map((singleCR, index) => (
                        <div key={index}>
                            <td>
                                <input id="cr" name="descripcion" type="text" value={singleCR.descripcion}
                                       onChange={(e) => handleCRChange(e, index)} style={{
                                    height: "35px",
                                    width: "500px",
                                    borderRadius: 5,
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                }}/>
                                {crList.length - 1 === index && crList.length < 4 && (
                                    <button type="button" onClick={handleCRAdd}>+</button>)}
                                {crList.length > 1 && (
                                    <button type="button" onClick={() => handleCRRemove(index)}>Eliminar</button>)}
                            </td>
                        </div>
                    ))}
                </td>
            </tr>
            {/*fila oportunidad de PM*/}
            <tr>
                <th className={"px-3 flex py-3 text-left text-base"}>
                    Oportunidades de Mejora (5)
                </th>
                <td>
                    <input id="omr" name="omr" type="text" onChange={formik.handleChange}
                           value={formik.values.omr}/>
                </td>
            </tr>
            {/*fila acciones de mejora*/}
            <tr>
                <th className={"px-3 flex py-3 text-left text-base"}>
                    Acciones de Mejora (6)
                </th>
                <td>
                    {amList.map((singleAM, index) => (
                        <div key={index}>
                            <td>
                                <input id="amr" name="descripcion" type="text" value={singleAM.descripcion}
                                       onChange={(e) => handleAMChange(e, index)} style={{
                                    height: "35px",
                                    width: "500px",
                                    borderRadius: 5,
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                }}/>
                                {amList.length - 1 === index && amList.length < 4 && (
                                    <button type="button" onClick={handleAMAdd}>+</button>)}
                                {amList.length > 1 && (
                                    <button type="button" onClick={() => handleAMRemove(index)}>Eliminar</button>)}
                            </td>
                        </div>
                    ))}
                </td>
            </tr>
            {/*Fila semestre y año de Ejecución*/}
            <tr>
                <th className={"px-3 flex py-3 text-left text-base"}>
                    Semestre de Ejecución (7)
                </th>
                <td>
                    <label>Año</label>
                    <input id="anio" name="anio" type="text" onChange={formik.handleChange}
                           value={formik.values.anio}/>
                    <label>Semestre</label>
                    <input id="semestre" name="semestre" type="text" onChange={formik.handleChange}
                           value={formik.values.semestre}/>
                </td>
            </tr>
            {/*DUración*/}
            <tr>
                <th className={"px-3 flex py-3 text-left text-base"}>
                    Duración (8)
                </th>
                <td>
                    <input id="duracion" name="duracion" type="text" onChange={formik.handleChange}
                           value={formik.values.duracion}/>
                    Meses
                </td>
            </tr>

            {/*Recursos*/}
            <tr>
                <th className={"px-3 flex py-3 text-left text-base"}>
                    Recursos (9)
                </th>
                <td className={"font-normal"}>
                    <select onChange={(e) => selectRecurso(e)}>
                        {recursos.map((option, index) => (
                            <option key={index} value={option.value}>{option.text}</option>
                        ))}
                    </select>
                </td>
                <td className={"font-normal"}>
                    <input id="recursos" name="recursos" type="text" onChange={formik.handleChange}
                           value={formik.values.recursos} disabled={otrosR} style={{
                        height: "35px",
                        width: "500px",
                        borderRadius: 5,
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                    }}/>
                </td>
            </tr>
            {/*Metas*/}
            <tr>
                <th className={"px-3 flex py-3 text-left text-base"}>
                    Metas (10)
                </th>
                <td>
                    {mList.map((singleM, index) => (
                        <div key={index}>
                            <td>
                                <input id="meta" name="descripcion" type="text" value={singleM.descripcion}
                                       onChange={(e) => handleMChange(e, index)} style={{
                                    height: "35px",
                                    width: "500px",
                                    borderRadius: 5,
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                }}/>
                                {mList.length - 1 === index && mList.length < 4 && (
                                    <button type="button" onClick={handleMAdd}>+</button>)}
                                {mList.length > 1 && (
                                    <button type="button" onClick={() => handleMRemove(index)}>Eliminar</button>)}
                            </td>
                        </div>
                    ))}
                </td>
            </tr>
            {/*Responsables*/}
            <tr>
                <th className={"px-3 flex py-3 text-left text-base"}>
                    Responsables (11)
                </th>
                <td>
                    {rList.map((singleR, index) => (
                        <div key={index}>
                            <td>
                                <input id="responsables" name="descripcion" type="text" value={singleR.descripcion}
                                       onChange={(e) => handleRChange(e, index)} style={{
                                    height: "35px",
                                    width: "500px",
                                    borderRadius: 5,
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                }}/>
                                {rList.length - 1 === index && rList.length < 4 && (
                                    <button type="button" onClick={handleRAdd}>+</button>)}
                                {rList.length > 1 && (
                                    <button type="button" onClick={() => handleRRemove(index)}>Eliminar</button>)}
                            </td>
                        </div>
                    ))}
                </td>
            </tr>
            {/*Observaciones*/}
            <tr>
                <th className={"px-3 flex py-3 text-left text-base"}>
                    Observaciones (12)
                </th>
                <td>
                    {oList.map((singleO, index) => (
                        <div key={index}>
                            <td>
                                <input id="observaciones" name="descripcion" type="text" value={singleO.descripcion}
                                       onChange={(e) => handleOChange(e, index)} style={{
                                    height: "35px",
                                    width: "500px",
                                    borderRadius: 5,
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                }}/>
                                {oList.length - 1 === index && oList.length < 4 && (
                                    <button type="button" onClick={handleOAdd}>+</button>)}
                                {oList.length > 1 && (
                                    <button type="button" onClick={() => handleORemove(index)}>Eliminar</button>)}
                            </td>
                        </div>
                    ))}
                </td>
            </tr>
            {/*Estado*/}
            <tr>
                <th className={"px-3 flex py-3 text-left text-base"}>
                    Estado (13)
                </th>
                <td className={"font-normal"}>
                    <select onChange={(e) => selectEstado(e)}>
                        {estados.map((option, index) => (
                            <option key={index} value={option.value}>{option.text}</option>
                        ))}
                    </select>
                </td>
            </tr>
            {/*Evidencias*/}
            <tr>
                <th className={"px-3 flex py-3 text-left text-base"}>
                    Evidencias (14)
                </th>
                <td>
                    <input id="evi" name="evidencias" type="text" onChange={formik.handleChange}
                           value={formik.values.evidencias}/>
                    Meses
                </td>
            </tr>

            {/*Avances*/}
            <tr>
                <th className={"px-3 flex py-3 text-left text-base"}>
                    <label>%Avance (15)</label>
                </th>
                <td>
                    <input id="ava" name="avance" type="number" onChange={formik.handleChange} value={formik.values.avance}/>
                </td>
            </tr>
            {/*Eficacia*/}
            <tr>
                <th className={"px-3 flex py-3 text-left text-base"}>
                    Evaluación de Eficacia (16)
                </th>
                <td className={"font-normal"}>
                    <select onChange={(e) => selectEficacia(e)}>
                        {efis.map((option, index) => (
                            <option key={index} value={option.value}>{option.text}</option>
                        ))}
                    </select>
                </td>
            </tr>
            </tbody>


        </table>

        <button type="submit" style={{
            width: "80px",
            height: "35px",
            backgroundColor: "white",
        }}>Credsar
        </button>
    </form>);
}

