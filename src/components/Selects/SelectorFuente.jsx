import React, {useEffect, useState} from "react";
import {AiFillPlusCircle as Add, AiFillMinusCircle as Delete} from "react-icons/ai";
import {element} from "prop-types";

export default function(props) {
    const {title,setData} = props;
    const [selecteds, setSelecteds] = useState([]);
    const [addNewOption, setAddNewOption] = useState(false);
    const [valueNewOption, setValueNewOption] = useState("");

    const list = ["Solicitudes de acción correctiva ", "Servicios no conformes", "Quejas ", "Evaluación de competencias", "Evaluación de los objetivos Educacionales", "Actividades diarias", "Lineamientos institucionales.", "Acuerdos de Consejo de Facultad y Asamblea Docente.", "Buenas prácticas de otras organizaciones", "Otros"];

    const addSelect = (e) => {
        const {value} = e.target;
        if (value === "Otros") {
            setAddNewOption(true);
            e.target.value = "default";
            setValueNewOption("");
            return;
        }
        const valores =[]
        selecteds.forEach(element=> valores.push(element["descripcion"]));

        if (!valores.includes(value)) {
            setSelecteds([...selecteds, {descripcion: value}]);
        }
        if (addNewOption) {
            setAddNewOption(false);
        }
        e.target.value = "default";
    };

    const removeSelect = (value) => {
        setSelecteds(selecteds.filter((s) => s !== value));
    };
    useEffect(()=>{
        setData(selecteds);
    },[selecteds])

    return (
        <div>
            <div className={"titulo"}>
                <label className={"etiqueta"}>{title}</label>
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

                <select className={"sFuente"} onChange={addSelect} defaultValue={"default"}>
                    <option value="default" disabled>
                        Seleccione una opción
                    </option>
                    {list.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
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
                                <Add className={"icon"} />
                            </button>
                            <button
                                onClick={() => {
                                    setAddNewOption(false);
                                    setValueNewOption("");
                                }}
                            >
                                <Delete className={"icon"} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
