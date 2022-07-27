import React from "react";

// components

import CardTable from "../../components/Cards/CardTable.jsx";
import HeaderStandard from "../../components/Headers/HeaderStandard";
import CardPageVisits from "../../components/Cards/CardPageVisits";

export default function Estandar8() {
    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <CardPageVisits />
                </div>
                {/* <div className="w-full mb-12 px-4">
                    <CardTable color="dark" />
                </div>*/}
            </div>
        </>
    );
}
