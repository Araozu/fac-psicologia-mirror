import React, {useMemo, useState} from "react";
import {useParams} from "react-router-dom";

// components
import DetallePM from "../views/Detalle/DetallePM";
import Sidebar from "../components/Sidebar/Sidebar";
import HeaderDetail from "../components/Headers/HeaderDetail"

export default function Detalle(props) {
    let { codigo } = useParams();
    const [isHidden, setIsHidden] = useState(false);
    const handleViewChange = (estandarN) => {
        setEstandar(estandarList[estandarN]);
    };
    const containerClass = useMemo(
        () => isHidden ? "md:ml-24" : "md:ml-64",
        [isHidden],
    );
    return (
        <>
            <Sidebar handleViewChange={handleViewChange} setIsHiddenParent={setIsHidden}/>
            <div className={`relative ${containerClass} bg-blueGray-100`}>
                <HeaderDetail/>
                <DetallePM codigo={codigo}/>
            </div>

        </>
    );


    //<Switch>
      //              <Route path="/detalle/detallepm" exact component={DetallePM}/>
        //            <Redirect from="/detalle" to="/admin"/>
          //      </Switch>
}
