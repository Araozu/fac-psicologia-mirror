import React, {useEffect, useState} from "react";
import {AiFillPlusCircle as Add, AiFillMinusCircle as Delete} from "react-icons/ai";
import Label from "../Labels/Label";
import axios from "axios";
import Select from "react-select";

export default function SelectorFuente(props) {
    const {
        title,
        setData,
        detalle,
    } = props;
    const [selecteds, setSelecteds] = useState([]);
    const [addNewOption, setAddNewOption] = useState(false);
    const [valueNewOption, setValueNewOption] = useState("");

    //const list = ["Solicitudes de acción correctiva ", "Servicios no conformes", "Quejas ", "Evaluación de competencias", "Evaluación de los objetivos Educacionales", "Actividades diarias", "Lineamientos institucionales.", "Acuerdos de Consejo de Facultad y Asamblea Docente.", "Buenas prácticas de otras organizaciones", "Otros"];
    let list = [];
    //recuperando info
    axios.get("https://gestion-calidad-rrii-api.herokuapp.com/api/fuentes")
        .then(function(response) {
            response.data.data.forEach((element, index) => list.push(
                {
                    value: index,
                    label: element["valor"],
                },
            ));
        })


    const addSelect = (e) => {
        const {label} = e;
        if (label === "Otros") {
            setAddNewOption(true);
            //e.label = "default";
            setValueNewOption("");
            return;
        }
        const valores = [];
        selecteds.forEach(element => valores.push(element["descripcion"]));

        if (!valores.includes(label)) {
            setSelecteds([...selecteds, {descripcion: label}]);
        }
        if (addNewOption) {
            setAddNewOption(false);
        }
        //e.label = "default";
    };

    const removeSelect = (value) => {
        setSelecteds(selecteds.filter((s) => s !== value));
    };
    useEffect(() => {
        setData(selecteds);
    }, [selecteds]);

    return (
        <div>
            <div className={"titulo"}>
                <Label className={"etiqueta"} title={title} detalle={detalle}/>
            </div>

            <div className={"titulo"}>
                {selecteds.map((item, index) => (
                    <div className={"cuerpo"}>
                        <h1 className={"fuente"} key={index}>
                            {item.descripcion}
                        </h1>
                        <button className={"buton-fuente"} onClick={() => removeSelect(item)}>
                            <Delete
                                className={"icon-fuente"}/></button>
                    </div>

                ))}

                {/*<select className={"sFuente"} onChange={addSelect} defaultValue={"default"}>
                    <option value="default" disabled>
                        Seleccione una opción
                    </option>
                    {list.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>*/}
                <Select className="estandarS" options={list} onChange={addSelect}/>
                <div>
                    {addNewOption && (
                        <>
                            <input
                                className={"input-line"}
                                type="text"
                                value={valueNewOption}
                                onChange={(e) => setValueNewOption(e.target.value)}
                            />
                            <button
                                onClick={() => addSelect({target: {value: valueNewOption}})}
                            >
                                <Add className={"icon"}/>
                            </button>
                            <button
                                onClick={() => {
                                    setAddNewOption(false);
                                    setValueNewOption("");
                                }}
                            >
                                <Delete className={"icon"}/>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
