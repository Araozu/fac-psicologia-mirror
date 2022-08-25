import React, {useState} from 'react';

export default function ItemList(props){

    let {canEdit, id ,idItem,value, onDelete,indexOnList, onChange} = props;

    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(false);

    const handleEdit = () => {
        const input = document.getElementById(id);
        setEditing(true)
        input.focus()
    };

    const handleSave = () => {
        const input = document.getElementById(id);
        if(input.value.trim() === ''){
            input.focus();
            setError(true);
        }else{
            setEditing(false);
            setError(false);
            onChange({id: idItem, value: input.value}, indexOnList);
        }
    }
    
    return (
        <>
            <div className="form-input-buttons-group secondary">
                <input key={id} id={id} disabled={!editing} defaultValue={value} type="text" className={"form-input-text" + (error? ' form-input-error' : '')}/>
                {
                    canEdit ? 
                        (editing ? 
                        <a className="form-icon-button form-save-button" onClick={handleSave}> <i class="fa-solid fa-floppy-disk"></i></a>
                        : <a className="form-icon-button form-edit-button" onClick={handleEdit}> <i class="fa-solid fa-pen"></i></a>)
                    : ''
                }
                <a className="form-icon-button form-delete-button" onClick={(e) => {onDelete(indexOnList)}}> <i class="fa-solid fa-trash"></i></a>
            </div>
        </>
    );
}