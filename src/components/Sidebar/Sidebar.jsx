/*eslint-disable*/
import React, {useMemo, useState} from "react";
import {Link} from "react-router-dom";

import NotificationDropdown from "../Dropdowns/NotificationDropdown.jsx";
import UserDropdown from "../Dropdowns/UserDropdown.jsx";

// Assets
import unsaLogo from '../../assets/img/unsalogo.png'
import {useLocation} from "react-router";

import "./Sidebar.css"

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
function SidebarStandardLink({handleViewChange, standard, isHidden, disabled = false}) {
    const isCurrentStandard = useCurrentStandardPathIndicator(8);

    const generateSufixIcon = () => {
        let numberString = standard.toString()
        return (
            <>
                {numberString.split("").map( (number) => <i key={"estandar"+number} className={`fa-solid fa-${number} fa-sm`}></i> )}
            </>
        )
    }

    const linkContent = <>
            {isHidden ? <></> :
                <div id="sidebar-link-content-prefix">
                        <i
                            className={
                                "fas fa-tv fa-sm " + (isHidden ? "mr-0" : "mr-2")
                            }
                        ></i>{" "}
                        Estandar {standard}
                </div>}
                <div style={ {display: "block", textAlign: "center" } } id="sidebar-link-content-suffix">
                    <div style={ {display: "flex", flexWrap: "nowrap" , alignItems: "center", justifyContent: "center", height: "100%"} }>
                        {generateSufixIcon()}{" "}
                    </div>
                </div>
            </>

    return (
        <li style={ {marginBottom: "0.5em"} }>
            {disabled ? 

            <div className={"lista-item lista-item-disabled "+  + (isHidden ? "list-item-small ": " ")}>
                    {linkContent}
            </div>
            
            : <Link
                className={"lista-item " + (isCurrentStandard ? "lista-item-selected " : " ") + (isHidden ? "list-item-small": "")}
                to={`/admin/estandar${standard}`}
                onClick={() => {
                    handleViewChange(standard.toString())}}>
                    {linkContent}
            </Link>}
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
    
    // Use angle with animations
    const hiddenButtonName = useMemo(
        () => isHidden ? "" : "fa-flip-horizontal",
        [isHidden]
    );
    const navClasses = useMemo(
        () => isHidden ? "" : "md:w-64",
        [isHidden]
    );

    const toggleCollapse = () => {
        setIsHidden((x) => !x);
        setIsHiddenParent((x) => !x);
    }

    return (
        <>
            <nav className={`${navClasses} md:left-0 md:block md:top-0 md:bottom-0 md:overflow-y-auto md:overflow-hidden shadow bg-white flex flex-wrap items-center justify-between relative sidebar`}>
                

                <div className="w-full flex flex-col justify-start content-start">
                    <button
                        className="cursor-pointer md:inline-block text-black opacity-50 px-4 py-6 text-xl leading-none bg-transparent"
                        type="button"
                        onClick={toggleCollapse}
                        style={ {textAlign: (isHidden ? "center": "end")} }>
                        <i className={`fa-solid fa-angles-right fa-lg ${hiddenButtonName}`} style={ {color: "#0284C7"} }></i>
                    </button>


                    <div className="mt-10 mx-4">

                        { isHidden ? <></> : 
                        
                            <Link
                                className="flex flex-row logo-side justify-between items-center uppercase"
                                to="/"
                            >
                                <img src={unsaLogo}  alt="Logo Unsa"
                                style={ {width: "4.5em", height: "4.5em", marginRight:"0.5em"} }/>
                                <h4 className="text-sm">  <span style={{fontSize: "0.6em"}}>Escuela Profesional de</span> <br/> <strong> Relaciones Industriales</strong></h4>
                            </Link>}

                    </div>

                    <hr className="mx-4 my-4"/>

                    { isHidden ? <></> : 
                    <h6 className="text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 pl-1 no-underline mx-4">
                                Estandares
                    </h6>}

                    <ul className="flex flex-col list-none mx-4">
                        <SidebarStandardLink handleViewChange={handleViewChange} standard={8} isHidden={isHidden} disabled={false}/>
                        <SidebarStandardLink handleViewChange={handleViewChange} standard={9} isHidden={isHidden} disabled={true}/>
                        <SidebarStandardLink handleViewChange={handleViewChange} standard={10} isHidden={isHidden} disabled={true}/>
                    </ul>
                </div>
            </nav>  
        </>
    );


}
