import React from "react";
import ReactDOM from "react-dom";

import "./modal.css";


function Modal(props: any) {
    const access_token = localStorage.getItem("access_token");
    const root:HTMLElement = document.getElementById("root")!;

    const Buttons = () => (
        <>
            {props.type === "confirm" && (
                <button className="modal-button btn-decline"
                    onClick={
                        (e) => props.onClose("cancel")
                    }
                >
                    Cancelar
                </button>
            )}
            <button className="modal-button btn-accept" onClick={
                (e) => props.onClose("confirm")
            }
            >
                { props.type === "cancel" ? <>Cancelar</> : <>Aceptar</>}
            </button>
        </>
    );

    const modalHTML = (
        <div className={`modal ${props.show ? "show" : ""}`} onClick={(e) => {
            props.onClose("cancel");
        }}
        >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title modal-info">{props.title.toUpperCase()}</h3>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
                <div className="modal-footer">
                    <Buttons />
                </div>
            </div>
        </div>);

    return ReactDOM.createPortal(modalHTML, root);
}

export default Modal;
