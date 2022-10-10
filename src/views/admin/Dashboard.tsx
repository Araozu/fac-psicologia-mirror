import React from "react";

// components
/// @ts-ignore
import CardLineChart from "../../components/Cards/CardLineChart";
/// @ts-ignore
import CardBarChart from "../../components/Cards/CardBarChart";
/// @ts-ignore
import CardSocialTraffic from "../../components/Cards/CardSocialTraffic.jsx";
/// @ts-ignore
import CardPlanesMejora from "../../components/Cards/CardPageVisits";

export default function Dashboard() {
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                    <CardLineChart />
                </div>
                <div className="w-full xl:w-4/12 px-4">
                    <CardBarChart />
                </div>
            </div>
            <div className="flex flex-wrap mt-4">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                    <CardPlanesMejora />
                </div>
                <div className="w-full xl:w-4/12 px-4">
                    <CardSocialTraffic />
                </div>
            </div>
        </>
    );
}
