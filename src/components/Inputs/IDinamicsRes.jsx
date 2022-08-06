import React, {useEffect, useState} from "react";
import { AiFillPlusCircle as Add, AiFillMinusCircle as Delete } from "react-icons/ai";
import Label from "../Labels/Label";
export default function IDinamicsRes(props) {
    let {
        title,
        name,
        type,
        setDt,
        detalle
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
        <Label title={title} detalle={detalle}/>
        <div className="div-dinamico">
            {data.map((singleData, index) => (
                <div key={index}>
                    <div>
                        <input  className="input-dinamico" id={name} name={"nombre"} type={type} value={singleData.nombre}
                               onChange={(e) => handleChange(e, index)}
                        />
                        {data.length - 1 === index && data.length < 4 && (
                            <button type={"button"} onClick={handleAdd}><Add className="icon"/></button>
                        )}
                        {data.length > 1 && (
                            <button type={"button"} onClick={() => handleRemove(index)}><Delete className="icon"/></button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>);
}
