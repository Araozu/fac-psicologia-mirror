import React from "react";
import PropTypes from "prop-types";
import "./CardStats.css";

export default function CardStats({
    statSubtitle,
    statTitle,
    statPercent,
    statDescripiron,
    statIconName,
    statIconColor,
}) {
    const porcentajeEl = statPercent === ""
        ? (
            <p className="text-sm text-blueGray-400 mt-4">
                <span className="whitespace-nowrap">Cargando...</span>
            </p>
        )
        : (
            <p className="text-sm text-blueGray-400 mt-4">
                <span className={"text-emerald-500 mr-2"}>
                    {statPercent}%
                </span>
                <span className="whitespace-nowrap">{statDescripiron}</span>
            </p>
        );

    return (
        <>
            <div className="relative flex flex-col min-w-0 justify-between break-words bg-white rounded mb-6 xl:mb-0 shadow-lg overflow-hidden">
                <div className="flex-auto p-4 relative overflow-hidden">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs truncate text-ellipsis">
                                {statSubtitle}
                            </h5>
                            <span className="font-semibold text-xl text-blueGray-700">
                                {statTitle}
                            </span>
                        </div>

                    </div>
                    <div className="icon-card w-auto pl-4 flex-initial overflow-hidden">
                        <div
                            className={
                                `text-white p-3 text-center inline-flex items-center justify-center shadow-lg rounded-full overflow-hidden ${
                                    statIconColor}`
                            }
                        >
                            <i className={statIconName} />
                        </div>
                    </div>
                    {porcentajeEl}
                </div>
            </div>
        </>
    );
}

CardStats.defaultProps = {
    statSubtitle: "Traffic",
    statTitle: "350,897",
    statArrow: "up",
    statPercent: "3.48",
    statPercentColor: "text-emerald-500",
    statDescripiron: "Since last month",
    statIconName: "far fa-chart-bar",
    statIconColor: "bg-red-500",
};

CardStats.propTypes = {
    statSubtitle: PropTypes.string,
    statTitle: PropTypes.string,
    statPercent: PropTypes.string,
    statDescripiron: PropTypes.string,
    statIconName: PropTypes.string,
    // can be any of the background color utilities
    // from tailwindcss
    statIconColor: PropTypes.string,
};
