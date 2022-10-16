import React,{useState, useEffect} from "react";
import Select from "react-select";
import axios from "axios";

//Importaciones propias
import Label from "./Label/Label";
import ItemList from "./ItemList";


export default function InputSelectDinamics(props) {

    const {name, label, description, optionsRute,initialValues, onChange} = props;
    let currentItem = undefined;
    const inputid = `${name}-input`;

    //TODO: Trabajar con initialValues
    //TODO: Manejar el onChange
    const [values, setValues] = useState(initialValues);
    const [options, setOptions] = useState([]);
    const [otros, setOtros] = useState(false);
    const [error, setError] = useState(false);

    //Cargando las opciones del select
    //TODO: Volver dinamico los datos a cargar
    //TODO: Configurar apariencia de cargando
    useEffect(() => {
        if (options.length > 0) return;
        axios.get(`https://gestion-calidad-rrii-api.herokuapp.com/api/${optionsRute}`)
            .then(function(response) {
                response.data.data.forEach((element, index) => options.push({
                    value: element.id,
                    label: element.valor,
                }));
            });
    }, []);



    const handleSelect = (e) => {
        const {label, value} = e;
        if (label === "Otros") setOtros(true);
        else {
            setOtros(false);
            setError(false);
            currentItem = {
                id: value,
                value: label,
            };
        }
    };

    const handleAdd = () => {
        let newValues;

        if (otros) {
            const input = document.getElementById(inputid);
            if (input.value.trim() === "") {
                setError(true);
                return;
            }
            setError(false);
            newValues = [...values, {
                id: null,
                value: input.value,
            }];
            input.value = "";
        } else {
            newValues = [...values, {
                id: null,
                value: currentItem.value,
            }];
        }
        setValues(newValues);
        onChange(newValues);
    };

    const handleDelete = (index) => {
        const newValues = [...values];
        newValues.splice(index, 1);
        setValues(newValues);
        onChange(newValues);
    };

    const handleEdit = (item, index) => {
        newValues = [...values];
        newValues[index] = item;
        setValues(newValues);
        onChange(newValues);
    };

    return (
        <>
            <Label label={label} descripcion={description} />
            <div>
                <div className="form-input-buttons-group">
                    <Select options={options} className="form-input-select" onChange={handleSelect} />
                    <input type="text" id={inputid} className={`form-input-text${error ? " form-input-error" : ""}`} placeholder='Otros...' disabled={!otros} />
                    <a className="form-icon-button form-add-button" onClick={handleAdd}> <i className="fa-solid fa-plus" /> </a>
                </div>
                <hr />
                <div className="input-list-container">
                    {values?.map((item, i) => <ItemList key={`${item.name}-${i}`} onChange={handleEdit} canEdit={false} idItem={item.id} value={item.value} id={`${name}-${item.id}`} indexOnList={i} onDelete={handleDelete} />)}
                </div>
            </div>
        </>
    );
}
