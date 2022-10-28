import React, {useState} from "react";

export default function ItemList(props) {

    const {canEdit, id ,idItem,value, onDelete,indexOnList, onChange} = props;

    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(false);

    const handleEdit = () => {
        const input = document.getElementById(id);
        setEditing(true);
        input.focus();
    };

    const handleSave = () => {
        const input = document.getElementById(id);
        if (input.value.trim() === "") {
            input.focus();
            setError(true);
        } else {
            setEditing(false);
            setError(false);
            onChange({id: idItem, value: input.value}, indexOnList);
        }
    };

    let linkEdicion;
    if (canEdit && editing) {
        linkEdicion = <a className="form-icon-button form-save-button" onClick={handleSave}> <i className="fa-solid fa-floppy-disk" /></a>;
    } else {
        linkEdicion = <a className="form-icon-button form-edit-button" onClick={handleEdit}> <i className="fa-solid fa-pen" /></a>;
    }

    return (
        <>
            <div className="form-input-buttons-group secondary">
                <input
                    key={id}
                    id={id}
                    disabled={!editing}
                    defaultValue={value}
                    type="text"
                    className={`form-input-text${error ? " form-input-error" : ""}`}
                />
                {linkEdicion}
                <a className="form-icon-button form-delete-button" onClick={(e) => {
                    onDelete(indexOnList);
                }}
                >
                    <i className="fa-solid fa-trash" />
                </a>
            </div>
        </>
    );
}
