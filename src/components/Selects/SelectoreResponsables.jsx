import React, {useEffect, useState} from "react";
import {AiFillPlusCircle as Add, AiFillMinusCircle as Delete} from "react-icons/ai";
import Label from "../Labels/Label";
import axios from "axios";
import Select from "react-select";

export default function SelectoreResponsables(props) {
    const {
        title,
        setData,
        detalle,
    } = props;
    const [selecteds, setSelecteds] = useState([]);
    const [addNewOption, setAddNewOption] = useState(false);
    const [valueNewOption, setValueNewOption] = useState("");

    //const list = ["Dirección EP RR.II.", "Comisión de desarrollo docente", "Otros"];
    let list = [];

    axios.get("https://gestion-calidad-rrii-api.herokuapp.com/api/responsables")
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
            setValueNewOption("");
            return;
        }
        const valores = [];
        selecteds.forEach(element => valores.push(element["nombre"]));

        if (!valores.includes(label)) {
            setSelecteds([...selecteds, {nombre: label}]);
        }
        if (addNewOption) {
            setAddNewOption(false);
        }
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
                            {item.nombre}
                        </h1>
                        <button className={"buton-fuente"} onClick={() => removeSelect(item)}>
                            <Delete
                                className={"icon-fuente"}/></button>
                    </div>

                ))}

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
                                onClick={() => addSelect( {label: valueNewOption})}
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
