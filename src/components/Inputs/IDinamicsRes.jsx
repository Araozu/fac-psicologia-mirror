import React, {useEffect, useState} from "react";

export default function IDinamicsRes(props) {
    let {
        title,
        name,
        type,
        setDt,
    } = props;
    const [data, setData] = useState([{nombre: ""}]);
    const handleAdd = () => {
        setData([...data, {nombre: ""}]);
    };
    const handleRemove = (index) => {
        const list = [...data];
        list.splice(index, 1);
        setData(list);

    };
    const handleChange = (e, index) => {
        const {
            name,
            value,
        } = e.target;
        const list = [...data];
        list[index][name] = value;
        setData(list);
    };
    useEffect(()=>{
        setDt(data);
    },[data])


    return (<div>
        <label>{title}</label>
        <div>
            {data.map((singleData, index) => (
                <div key={index}>
                    <div>
                        <input id={name} name={"nombre"} type={type} value={singleData.nombre}
                               onChange={(e) => handleChange(e, index)}
                        />
                        {data.length - 1 === index && data.length < 4 && (
                            <button type={"button"} onClick={handleAdd}>+</button>
                        )}
                        {data.length > 1 && (
                            <button type={"button"} onClick={() => handleRemove(index)}>Eliminar</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>);
}
