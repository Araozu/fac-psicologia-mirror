import React, {useState, useEffect} from "react";
import axios from "axios";

import "./CrearPM.css";
import FormPM from "../../../../components/Form/FormPM";


export default function Crear() {

      return (
        <>
            <div className="bg-content">
                <FormPM />
            </div>
        </>
    );
}

