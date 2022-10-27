/*eslint-disable*/
import React, {useMemo, useState} from "react";
import {Link} from "react-router-dom";
// Assets
import unsaLogo from '../../assets/img/unsalogo.png'

import "./Sidebar.css"


function SidebarLink({text , path, prefixIcon, sufixIcon, isHidden, disabled = false }) {


    const content = () => <>
        
        <div id="sidebar-link-content-prefix">
                <i className={`${prefixIcon} fa-sm ${(isHidden ? "mr-0" : "mr-2")}`}></i>{" "}
                {!isHidden && <>{text.toUpperCase()}</> }
        </div>

        { !isHidden &&
            <div style={ {display: "block", textAlign: "center"} } id="sidebar-link-content-suffix">
                <i className={`${sufixIcon} fa-sm`}></i>       
            </div>
        }
    </>

    return (
        <li style={ {marginBottom: "0.3em"} }>
            {disabled ? 
                <div className={"lista-item lista-item-disabled "+  + (isHidden && "list-item-small ")}>
                        {content()}
                </div>
              : <Link
                    className={"lista-item " + (window.location.pathname.includes(path) && "lista-item-selected ") + (isHidden && "list-item-small")}
                    to={path}>
                        {content()}
                </Link>
            }
        </li>
    )
}


export default function Sidebar({
    setIsHiddenParent
}) {
    const [isHidden, setIsHidden] = useState(false);
    const rol = localStorage.getItem("ROL");
    
    // Use angle with animations
    const hiddenButtonName = useMemo(
        () => isHidden ? "" : "fa-flip-horizontal",
        [isHidden]
    );
    const navClasses = useMemo(
        () => isHidden ? "" : "md:w-64",
        [isHidden],
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
                        <i className={`fa-solid fa-angle-right fa-lg ${hiddenButtonName}`} style={ {color: "#0284C7"} }></i>
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


                    { !isHidden && <>
                            <hr className="mx-4 my-4"/>
                            <h6 className="text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 pl-1 no-underline mx-4">
                                        Area personal
                            </h6>
                        </>
                    }
                    <ul className="flex flex-col list-none mx-4">
                        <SidebarLink  path='/dashboard' text="Mis planes" prefixIcon='fa-solid fa-bookmark' sufixIcon='fa-solid fa-angle-right' isHidden={isHidden} disabled={false}/>
                    </ul>


                    { rol === "Admin" &&
                        <>
                        
                            { !isHidden && <>
                                    <hr className="mx-4 my-4"/>
                                    <h6 className="text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 pl-1 no-underline mx-4">
                                                Administrador
                                    </h6>
                                </>
                            }

                            <ul className="flex flex-col list-none mx-4">
                                <SidebarLink  path='/admin/users/' text="Usuarios" prefixIcon='fa-solid fa-users' sufixIcon='fa-solid fa-angle-right' isHidden={isHidden} disabled={false} />
                            </ul>
                        
                        </>
                    }
                    

                    { !isHidden && <>
                            <hr className="mx-4 my-4"/>
                            <h6 className="text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 pl-1 no-underline mx-4">
                                        Estandares
                            </h6>
                        </>
                    }

                    <ul className="flex flex-col list-none mx-4">
                        <SidebarLink  path='/admin/estandar8' text="Estandar 8" prefixIcon='fa-solid fa-tv' sufixIcon='fa-solid fa-angle-right' isHidden={isHidden} disabled={false}/>
                        <SidebarLink  path='/admin/estandar10' text="Pronto mas" prefixIcon='fa-solid fa-tv' sufixIcon='fa-solid fa-angle-right' isHidden={isHidden} disabled={true}/>
                    </ul>
                </div>
            </nav>  
        </>
    );


}
