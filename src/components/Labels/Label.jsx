import React, {useState} from "react";
import "../../views/Create/CrearPM.css";
import "./Label.css";
import {AiFillQuestionCircle as Info} from "react-icons/ai";


export default function Label(props) {
    const {
        title,
        detalle,
    } = props;


    return (
        <>
            <label className={"etiqueta"}>{title}
            </label>
            <div className="tooltip"><Info/>
                <span className="tooltiptext">{detalle}</span>
            </div>
        </>

    );

}
