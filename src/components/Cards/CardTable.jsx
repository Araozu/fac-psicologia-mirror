import React from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
// components
import {PlanMejoraDropdown} from "@/components/Dropdowns/PlanMejoraDropdown";

export default function CardTable({color}) {

    const history = useHistory();
    const redirect = () => {
        history.push("/crear/crearpm");
    };

    return (
        <>
            <div
                className={
                    `relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ${
                        color === "light" ? "bg-white" : "bg-lightBlue-900 text-white"}`
                }
            >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 flex flex-row justify-between">
                            <h3
                                className={
                                    `font-semibold text-lg ${
                                        color === "light" ? "text-blueGray-700" : "text-white"}`
                                }
                            >
                                Planes de mejora
                            </h3>

                            <button
                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                    redirect();
                                }}
                            >
                                <i className="fas fa-plus"/> Nuevo PM
                            </button>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                        <tr>
                            <th
                                className={
                                    `px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                                        color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"}`
                                }
                            >
                                Codigo
                            </th>

                            <th
                                className={
                                    `px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                                        color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"}`
                                }
                            >
                                Estado
                            </th>
                            <th
                                className={
                                    `px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                                        color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"}`
                                }
                            >
                                Responsables
                            </th>
                            <th
                                className={
                                    `px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                                        color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"}`
                                }
                            >
                                Porcentaje
                            </th>
                            <th
                                className={
                                    `px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                                        color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"}`
                                }
                            />
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                <img
                                    src={imgBootstrap}
                                    className="h-12 w-12 bg-white rounded-full border"
                                    alt="..."
                                />{" "}
                                <span
                                    className={
                                        `ml-3 font-bold ${
                                            +(color === "light" ? "text-blueGray-600" : "text-white")}`
                                    }
                                >
                    Argon Design System
                                    </span>
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <i className="fas fa-circle text-orange-500 mr-2"/> pending
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex">
                                    <img
                                        src={imgTeam1}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                                    />
                                    <img
                                        src={imgTeam2}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                                    />
                                    <img
                                        src={imgTeam3}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                                    />
                                    <img
                                        src={imgTeam4}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                                    />
                                </div>
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                    <span className="mr-2">60%</span>
                                    <div className="relative w-full">
                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                                            <div
                                                style={{width: "60%"}}
                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                <PlanMejoraDropdown/>
                            </td>
                        </tr>
                        <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                <img
                                    src={imgAngular}
                                    className="h-12 w-12 bg-white rounded-full border"
                                    alt="..."
                                />{" "}
                                <span
                                    className={
                                        `ml-3 font-bold ${
                                            +(color === "light" ? "text-blueGray-600" : "text-white")}`
                                    }
                                >
                    Angular Now UI Kit PRO
                                    </span>
                            </th>

                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <i className="fas fa-circle text-emerald-500 mr-2"/>{" "}
                                completed
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex">
                                    <img
                                        src={imgTeam1}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                                    />
                                    <img
                                        src={imgTeam2}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                                    />
                                    <img
                                        src={imgTeam3}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                                    />
                                    <img
                                        src={imgTeam4}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                                    />
                                </div>
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                    <span className="mr-2">100%</span>
                                    <div className="relative w-full">
                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-emerald-200">
                                            <div
                                                style={{width: "100%"}}
                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                <PlanMejoraDropdown/>
                            </td>
                        </tr>
                        <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                <img
                                    src={imgSketch}
                                    className="h-12 w-12 bg-white rounded-full border"
                                    alt="..."
                                />{" "}
                                <span
                                    className={
                                        `ml-3 font-bold ${
                                            +(color === "light" ? "text-blueGray-600" : "text-white")}`
                                    }
                                >
                    Black Dashboard Sketch
                                    </span>
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <i className="fas fa-circle text-red-500 mr-2"/> delayed
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex">
                                    <img
                                        src={imgTeam1}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                                    />
                                    <img
                                        src={imgTeam2}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                                    />
                                    <img
                                        src={imgTeam3}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                                    />
                                    <img
                                        src={imgTeam4}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                                    />
                                </div>
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                    <span className="mr-2">73%</span>
                                    <div className="relative w-full">
                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                                            <div
                                                style={{width: "73%"}}
                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                <PlanMejoraDropdown/>
                            </td>
                        </tr>
                        <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                <img
                                    src={imgReact}
                                    className="h-12 w-12 bg-white rounded-full border"
                                    alt="..."
                                />{" "}
                                <span
                                    className={
                                        `ml-3 font-bold ${
                                            +(color === "light" ? "text-blueGray-600" : "text-white")}`
                                    }
                                >
                    React Material Dashboard
                                    </span>
                            </th>

                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <i className="fas fa-circle text-teal-500 mr-2"/> on
                                schedule
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex">
                                    <img
                                        src={imgTeam1}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                                    />
                                    <img
                                        src={imgTeam2}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                                    />
                                    <img
                                        src={imgTeam3}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                                    />
                                    <img
                                        src={imgTeam4}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                                    />
                                </div>
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                    <span className="mr-2">90%</span>
                                    <div className="relative w-full">
                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-teal-200">
                                            <div
                                                style={{width: "90%"}}
                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                <PlanMejoraDropdown codigo={""}/>
                            </td>
                        </tr>
                        <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                <img
                                    src={require("../../assets/img/vue.jpg").default}
                                    className="h-12 w-12 bg-white rounded-full border"
                                    alt="..."
                                />{" "}
                                <span
                                    className={
                                        `ml-3 font-bold ${
                                            +(color === "light" ? "text-blueGray-600" : "text-white")}`
                                    }
                                >
                    React Material Dashboard
                                    </span>
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <i className="fas fa-circle text-emerald-500 mr-2"/>{" "}
                                completed
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex">
                                    <img
                                        src={imgTeam1}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                                    />
                                    <img
                                        src={imgTeam2}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                                    />
                                    <img
                                        src={imgTeam3}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                                    />
                                    <img
                                        src={imgTeam4}
                                        alt="..."
                                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                                    />
                                </div>
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                    <span className="mr-2">100%</span>
                                    <div className="relative w-full">
                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-emerald-200">
                                            <div
                                                style={{width: "100%"}}
                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                <PlanMejoraDropdown/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

CardTable.defaultProps = {
    color: "light",
};

CardTable.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
