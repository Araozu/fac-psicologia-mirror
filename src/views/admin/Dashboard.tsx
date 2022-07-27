import React from "react";

// components
/// @ts-ignore
import CardTable from "../../components/Cards/CardTable.jsx";
import CardPageVisits from "../../components/Cards/CardPageVisits";

export default function Dashboard() {
    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <CardTable />
                </div>
            </div>
        </>
    );
}
