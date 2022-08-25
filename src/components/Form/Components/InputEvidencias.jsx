import React, {useState} from 'react';
import ItemEvidencia from './ItemEvidencia';
import axios from 'axios';

import Label from './Label/Label'

export default function InputEvidencias(props){
    let {name, label, description, initialValues, idPM} = props;
    //TODO: Usar el initialValues
    const [values, setValues] = useState(initialValues);

    const [loading, setLoading] = useState(false);

    //TODO: HANDLE ADD
    //TODO: MANEJAR ESTADO DE LOADING
    const handleAdd = () => {
        const inputDenominacion = document.getElementById(name+'-deno');
        const inputFile = document.getElementById(name+'-file');

        //Validamos que estan correctos los campos para mandar la peticion a axios
        if(inputFile.files[0] != undefined || inputDenominacion.value.trim() !== '') {
            const token = localStorage.getItem("access_token")
            setLoading(true);
            axios.post("https://gestion-calidad-rrii-api.herokuapp.com/api/plan",
                {
                    id_plan: idPM,
                    codigo: '',
                    denominacion: inputDenominacion.value,
                    adjunto: inputFile.files[0]
                }, {
                    headers: {
                        "Content-type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                },
            ).then(function(response){
                
                setValues([...values, {id: response.data.id, denominacion: response.data.denominacion}]);

                setLoading(false);
                console.log(response);
            }).catch(function(error){

                setLoading(false);
                console.log(error);
            });
        }
    }

    const handleDelete = (id, index) => {
        //TODO: MANEJAR ESTADO DE LOADING MIENTRAS REALIZA CONSULTA A LA API
        setLoading(true)
        const token = localStorage.getItem("access_token")

        let newValues = [...values];
        newValues.splice(index, 1);
        setValues(newValues);
    }

    return (
        <>
            <Label label={label} description={description} />
            <div>
                <div className="form-input-buttons-group">
                    <input type="text" id={name+"-deno"} className='form-input-text' placeholder='Ingresa una denominacion' disabled={loading}/>
                    {/**<input class="inline-block ml-1 w-full text-s text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400" id="small_size" type="file"/>*/}
                    <input class="block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id={name+"-file"} type="file"
                                    accept=".pdf,.doc,.docx,.xls,.xlsx" disabled={loading}/>
                    <a className="form-icon-button form-add-button" onClick={handleAdd} disabled={loading}> <i class="fa-solid fa-plus"></i> </a>
                </div>
                <hr />
                <div className="input-list-container">
                    { values?.map( (item,i) => <ItemEvidencia key={item.id} id={item.id} denominacion={item.denominacion} indexOnList={i} onDelete={handleDelete}/> ) }
                </div> 
            </div>
        </>
    );
}