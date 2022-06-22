import React from "react";

// components

import CardStats from "../Cards/CardStats.jsx";

export default function HeaderStandard({estandar}) {
    return (
        <>
            {/* Header */}
            <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12 flex justify-between">
                <div className="px-4 md:px-10">
                    <h1 className="text-4xl font-bold text-white">{estandar.n}</h1>
                    <p className="text-lg text-white">{estandar.titulo}</p>
                </div>
                <div className="flex w-full grow">
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <CardStats
                            statSubtitle="PLANES DE MEJORA"
                            statTitle="5"
                            statArrow="up"
                            statPercent="3.4"
                            statPercentColor="text-emerald-500"
                            statDescripiron="Total de PMs"
                            statIconName="far fa-chart-bar"
                            statIconColor="bg-red-500"
                        />
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <CardStats
                            statSubtitle="COMPLETADOS"
                            statTitle="2"
                            statArrow="down"
                            statPercent="40"
                            statPercentColor="text-red-500"
                            statDescripiron="PM Completados"
                            statIconName="fas fa-chart-pie"
                            statIconColor="bg-orange-500"
                        />
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <CardStats
                            statSubtitle="EN CURSO"
                            statTitle="3"
                            statArrow="up"
                            statPercent="60"
                            statPercentColor="text-emerald-500"
                            statDescripiron="PM en curso"
                            statIconName="fas fa-users"
                            statIconColor="bg-pink-500"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
