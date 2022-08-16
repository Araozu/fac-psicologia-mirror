import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import imgTeam1Url from "../../assets/img/team-1-800x800.jpg";
import Modal from "../modals/Modal";

const UserDropdown = () => {

    const history = useHistory();

    // dropdown props
    const [isShown, setIsShown] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("access_token");

        history.push("/");
    };


    const [show, setShow] = useState(false);

    const handleOnCloseModal = (response) => {

        setShow(false);
        if (response === "confirm") {
            handleLogout();
        }

    };

    return (
        <>
            <a
                className="text-blueGray-500 block"
                href="#pablo"

                onClick={(e) => {
                    e.preventDefault();
                    setIsShown((x) => !x);
                }}
            >
                <div className="items-center flex">
                    <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                        <img
                            alt="..."
                            className="w-full rounded-full align-middle border-none shadow-lg"
                            src={imgTeam1Url}
                        />
                    </span>
                </div>
            </a>
            <div
                className={
                    `${isShown ? "block " : "hidden "
                    }bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48`
                }
                style={{position: "absolute", right: 0, top: "3rem"}}
            >
                <a
                    href="#pablo"
                    className={
                        "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    }
                    onClick={(e) => {
                        e.preventDefault();

                    }}
                >
                    <i className={"fas fa-solid fa-user mr-3"} />Mi perfil
                </a>
                <div className="h-0 my-2 border border-solid border-blueGray-100" />
                <a
                    href="#pablo"
                    className={
                        "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-red-600"
                    }
                    onClick={(e) => {
                        e.preventDefault();
                        setShow(true);
                    }}
                >
                    <i className={"fas fa-solid fa-door-open text-red-600 mr-2"} />  Cerrar Sesion
                </a>
            </div>
            <Modal type='confirm' show={show} title="Cerrar sesión" onClose={handleOnCloseModal}>
                    ¿Esta seguro de cerrar sesión?
            </Modal>
        </>
    );
};

export default UserDropdown;
