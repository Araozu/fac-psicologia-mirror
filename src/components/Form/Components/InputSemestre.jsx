import React, {useState} from 'react';
import Select from 'react-select';

import Label from './Label/Label';


export default function InputSemestre(props){

    let {name, label, description, initialValue, onChange} = props;
    const idinput = name+'-input';
    const [error, setError] = useState('');
    //Separamos el año y el semestre en una variable
    let semestre = initialValue?.split('-');

    const options = [
        {value: 'A', label: 'A'},
        {value: 'B', label: 'B'},
        {value: 'Anual', label: 'Anual'}
    ];
    //Para manejar la opcion actual
    if (semestre == undefined) semestre = ['', 'A']
    const [option, setOption] = useState({value: semestre[1] , label: semestre[1]});

    const handleChange = (value) => {
        setOption(value);
        onChange(document.getElementById(idinput).value + '-' +value.value)
    }

    const handleInputChange = (e) => {
        onChange(e.target.value + '-' + option.value)
    }

    let classes = 'form-input-text form-input-text-semestre' + (error != '' ? 'form-input-error' : '');
    let emessage = <p className='form-input-error-description'>{error}</p>;

    return (
        <>
            <Label label={label} description={description} />
            <div>
                <div style={{display: 'flex'}}>
                    <input name={idinput} id={idinput} type="number" className={classes} defaultValue={semestre[0]} min='2000' max='3000' onChange={handleInputChange}/>
                    <Select 
                        name={name+"-select"}
                        options={options}
                        value={option}
                        onChange={handleChange}/>
                </div>
                {/**Si hay error muestra el mensaje, si no no muestra nada */}
                {error != '' ? emessage : ''}
            </div>
        </>
    );
}