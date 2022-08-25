import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import axios from 'axios';
import Select from 'react-select';

import Label from './Label/Label';


export default function InputSelect(props){
    //INITIAL VALUE RECIBE EL ID
    let {name, label, description, optionsRute, initialValue , onChange ,disabled = false} = props;

    const [options, setOptions] = useState([]);
    const [value, setValue] = useState();

    useEffect( () => {
        axios.get("https://gestion-calidad-rrii-api.herokuapp.com/api/"+optionsRute)
        .then(function(response) {
            if(options.length > 0) return;
            let optionsResponse = [];
          
            response.data.data.forEach((item, index) => optionsResponse.push(
                {
                    //TODO: CAMBIAR INDEX POR EL ID DEL ESTANDAR CUANNDO LO DEVUELVA LA RUTA
                    value: optionsRute === 'estandares' ? item['id'] : item['valor'],
                    label: optionsRute === 'estandares' ? item['name'] : item['valor']
                },
            ));
            
            let labelInitialValue = optionsResponse.find( item => item.value == initialValue )?.label;
            setOptions(optionsResponse);
            setValue({value: initialValue, label: labelInitialValue});
        })
    }, []);


    const handleChange = (value) => {
        setValue(value);
        onChange(value.value);
    }

    return (
        <>
            <Label label={label} description={description} />
            <Select name={name+'-select'} options={options} value={value} onChange={handleChange} isDisabled={disabled}/>
        </>
    );


}