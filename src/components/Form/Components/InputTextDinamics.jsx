import React, {useState} from "react";
import ItemList from "./ItemList";
import Label from "./Label/Label";




export default function InputTextDinamics(props) {
    /**
     * Name: Se utiliza para el id y el name de algunos componentes
     * Label: Se utiliza para manejar la descripcion del componente
     * Descripcion: Se utiliza para mostrar mensaje de ayuda
     * Values: Recibe una lista de objetos con id y descripcion(nombre en caso responsables)
     */
    const {name, label, description, initialValues, onChange} = props;

    const inputid = `${name}-input`;

    const [error, setError] = useState(false);

    //TODO: Usar el initialValues
    const [values, setValues] = useState(initialValues);

    const handleAdd = () => {
        const input = document.getElementById(inputid);

        if (input.value.trim() === "") {
            setError(true);
        } else {
            const newValues = [...values, {id: null, value: input.value}];
            input.value = "";
            setValues(newValues);
            onChange(newValues);
            setError(false);
        }
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

    //TODO: Limitar a que solo se edite uno a la vez
    return (
        <>
            <Label label={label} description={description} />
            <div>
                <div className="form-input-buttons-group">
                    <input type="text" id={inputid} className={`form-input-text${error ? " form-input-error" : ""}`} />
                    <a className="form-icon-button form-add-button" onClick={handleAdd}> <i className="fa-solid fa-plus" /> </a>
                </div>
                <hr />
                <div className="input-list-container">
                    {values?.map((item, i) => <ItemList key={`${item.name}-${i}`} onChange={handleEdit} canEdit idItem={item.id} value={item.value} id={`${name}-${item.id}`} indexOnList={i} onDelete={handleDelete} />)}
                </div>
            </div>
        </>
    );
}
