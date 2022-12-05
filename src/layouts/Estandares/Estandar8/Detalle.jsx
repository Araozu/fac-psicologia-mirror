import React, {useMemo, useState} from "react";
import {useParams} from "react-router-dom";

// components
import DetallePM from "../../../views/Estandares/components/PlanMejora/components/DetallePM";
import Sidebar from "../../../components/Sidebar/Sidebar";
import HeaderDetail from "../../../components/Headers/HeaderDetail";

export default function Detalle(props) {
    // Redirigir a inicio de sesion si no hay token de inicio de sesion
    const history = useHistory();
    const accessToken = localStorage.getItem("access_token");
    if (accessToken === null) {
        history.replace("/auth/");
    }

    const {codigo} = useParams();

    const estandarList = {
        8: {
            n: "Estandar8",
            titulo: "Estadar para la gestion de calidad",
        },
        9: {
            n: "Estandar 9",
            titulo: "Estadar para la gestion de calidad",
        },
        10: {
            n: "Estandar 10",
            titulo: "Estadar para la gestion de calidad",
        },
    };
    const [estandar, setEstandar] = useState(estandarList["8"]);
    const [isHidden, setIsHidden] = useState(false);
    const handleViewChange = (estandarN) => {
        setEstandar(estandarList[estandarN]);
    };
    const containerClass = useMemo(
        () => (isHidden ? "md:ml-24" : "md:ml-64"),
        [isHidden],
    );
    return (
        <>
            <Sidebar
                handleViewChange={handleViewChange}
                setIsHiddenParent={setIsHidden}
            />
            <div className={`relative ${containerClass} bg-blueGray-100`}>
                <HeaderDetail />
                <DetallePM id={codigo} />
            </div>
        </>
    );
}
