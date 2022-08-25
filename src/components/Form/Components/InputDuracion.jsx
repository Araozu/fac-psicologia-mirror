import React from 'react';
import { useState } from 'react';

import Label from './Label/Label'
import Select from 'react-select';



export default function InputDuracion(props){
    let {name, label, description, initialValue, onChange} = props;

    const [error, setError] = useState('');

    let classes = 'form-input-text form-input-text-semestre' + (error != '' ? 'form-input-error' : '');
    let emessage = <p className='form-input-error-description'>{error}</p>;

    return (
        <>
            <Label label={label} description={description} />
            <div>
                <div>
                    <input className={classes} name={name} id={name} type='number' min='0' max='30' defaultValue={initialValue} onChange={onChange}/>
                    <span>Mes(es)</span>
                </div>
                {/**Si hay error muestra el mensaje, si no no muestra nada */}
                {error != '' ? emessage : ''}
            </div>
        </>
    );
}