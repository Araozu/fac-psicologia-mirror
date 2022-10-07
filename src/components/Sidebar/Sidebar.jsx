/*eslint-disable*/
import React, {useMemo, useState} from "react";
import {Link} from "react-router-dom";

import NotificationDropdown from "../Dropdowns/NotificationDropdown.jsx";
import UserDropdown from "../Dropdowns/UserDropdown.jsx";

// Assets
import unsaLogo from '../../assets/img/unsa.jpg'
import {useLocation} from "react-router";

/**
 *
 * @param standard number: The **number** of standard to check for.
 * @param location object: The location obtained from React Router
 * @return whether the current url matches the standard
 */
function isCurrentStandardActive(standard, location) {
    // Supposedly a string
    const pathname = location.pathname;
    const fullStandardPath = `/admin/estandar${standard}`;

    return pathname === fullStandardPath;
}

/**
 * Hook that calculates if the standard is highlighted
 * @param standard number: The **number** of the standard to check.
 */
function useCurrentStandardPathIndicator(standard) {
    const location = useLocation();

    return isCurrentStandardActive(standard, location);
}

/**
 * Renders a standard link
 * @param handleViewChange ???
 * @param standard number: **Number** of the standard to create a link for
 * @return {JSX.Element}
 * @constructor
 */
function SidebarStandardLink({handleViewChange, standard}) {
    const isCurrentStandard = useCurrentStandardPathIndicator(8);
    const linkClasses = useMemo(() => {
        return isCurrentStandard ? "text-lightBlue-500 hover:text-lightBlue-600"
            : "text-blueGray-700 hover:text-blueGray-500"
    }, [isCurrentStandard]);
    const iClasses = useMemo(() => {
        return isCurrentStandard ? "text-blueGray-300" : "opacity-75";
    }, [isCurrentStandard]);

    return (
        <li className="items-center">
            <Link
                className={`text-xs uppercase py-3 font-bold block ${linkClasses}`}
                to={`/admin/estandar${standard}`}
                onClick={() => {
                    handleViewChange(standard.toString())
                }}
            >
                <i
                    className={
                        `fas fa-tv mr-2 text-sm ${iClasses}`
                    }
                ></i>{" "}
                Estandar {standard}
            </Link>
        </li>
    )
}

/**
 * Renders the sidebar
 * @param handleViewChange ???
 * @param setIsHiddenParent Function to update hidden status of the sidebar
 * @return {JSX.Element}
 * @constructor
 */
export default function Sidebar({handleViewChange, setIsHiddenParent}) {
    const [collapseShow, setCollapseShow] = useState("hidden");
    const [isHidden, setIsHidden] = useState(false);
    /** @type {string} */
    const hiddenButtonName = useMemo(
        () => isHidden ? "fa fa-bars" : "fa fa-times",
        [isHidden]
    );
    const navClasses = useMemo(
        () => isHidden ? "" : "md:w-64",
        [isHidden]
    );

    return (
        <>
            <nav
                className={`${navClasses} md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative z-10 py-4`}>

                {/* Toggle show/hide navbar */}
                <button
                    className="cursor-pointer hidden md:inline-block text-black opacity-50 px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    type="button"
                    onClick={() => {
                        setIsHidden((x) => !x);
                        setIsHiddenParent((x) => !x);
                    }}
                >
                    <i className={hiddenButtonName}></i>
                </button>

                {isHidden ? <></> :
                    <div
                        className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap flex flex-wrap items-center justify-between w-full mx-auto px-6">

                        {/* Toggler */}
                        <button
                            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                            type="button"
                            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
                        >
                            <i className="fas fa-bars"></i>
                        </button>
                        {/* Brand */}
                        <Link
                            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                            to="/"
                        >
                            <img src={unsaLogo} alt="Logo Unsa"/>
                            <h3 className="mt-3">Escuela Profesional de <br/> Relaciones Industriales</h3>
                        </Link>

                        {/* User */}
                        <ul className="md:hidden items-center flex flex-wrap list-none">
                            <li className="inline-block relative">
                                <NotificationDropdown/>
                            </li>
                            <li className="inline-block relative">
                                <UserDropdown/>
                            </li>
                        </ul>
                        {/* Collapse */}
                        <div
                            className={
                                "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                                collapseShow
                            }
                        >
                            {/* Collapse header */}
                            <div
                                className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                                <div className="flex flex-wrap">
                                    <div className="w-6/12">
                                        <Link
                                            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                                            to="/"
                                        >
                                            <img src={unsaLogo} alt="Logo Unsa"/>
                                        </Link>
                                    </div>
                                    <div className="w-6/12 flex justify-end">
                                        <button
                                            type="button"
                                            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                            onClick={() => setCollapseShow("hidden")}
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <hr className="my-4 md:min-w-full"/>
                            {/* Heading */}
                            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                                Estandares
                            </h6>
                            {/* Navigation */}

                            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                                <SidebarStandardLink handleViewChange={handleViewChange} standard={8}/>
                            </ul>

                        </div>
                    </div>
                }
            </nav>
        </>
    );
}
