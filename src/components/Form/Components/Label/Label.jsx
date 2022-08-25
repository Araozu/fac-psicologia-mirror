import React from "react";
import {AiFillQuestionCircle as Info} from "react-icons/ai";

import "./Label.css";

export default function Label(props) {
    const {
        label,
        description,
    } = props;


    return (
        <>
            <div className="label-container">
                <label className="form-input-label">{label.toUpperCase()}</label>
                {/* <p>{description}</p>*/}
                <div className="tooltip"><Info/>
                    <span className="tooltiptext">{description}</span>
                </div>
            </div>
        </>

    );

}
