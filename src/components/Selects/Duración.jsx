import React, {useState} from "react";
import Select from "react-select";
import "../../views/Create/CrearPM.css";

export default function Duracion(props) {

    const {
        title,
        setData,
    } = props;

    const data = [
        {
            value: 4,
            label: "Semestral",
        },
        {
            value: 8,
            label: "Anual",
        },
        {
            value: 1,
            label: "Otros",
        },
    ];

    const [editable, setEditable] = useState(true);
    const [valor, setValor] = useState(0);
    const handleChange = (event) => {
        if (event.value === 1) {
            setEditable(false);

        } else {
            setEditable(true);
            setValor(event.value);
        }
    };
    const handleChangeInput = event => {
        setValor(event.target.value);
    };

    setData(valor);

    return (
        <>
            <label className="etiqueta">{title}</label>
            <Select className={"estandarS"} options={data} onChange={handleChange}/>
            <input className="otros" disabled={editable} onChange={handleChangeInput} onWheel={(e) => e.target.blur()}
                   type={"number"} value={valor}/>
            <label className={"sup"}>Meses</label>
        </>
    );
}
