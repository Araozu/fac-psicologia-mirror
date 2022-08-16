import React, {useState} from "react";

const NotificationDropdown = () => {
    // dropdown props
    const [isShown, setIsShown] = useState(false);

    return (
        <>
            <a
                className="text-blueGray-500 py-1 px-3"
                href="#pablo"
                onClick={(e) => {
                    e.preventDefault();
                    setIsShown((x) => !x);
                }}
            >
                <i className="fas fa-ellipsis-v" />
            </a>
            <div
                className={
                    `${isShown ? "block " : "hidden "
                    }bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48`
                }
                style={{position: "absolute", right: "2rem", top: 0}}
            >
                <a
                    href="#pablo"
                    className={
                        "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    }
                    onClick={(e) => e.preventDefault()}
                >
                    <i className="fas fa-pen" /> Editar
                </a>
                <a
                    href="#pablo"
                    className={
                        "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    }
                    onClick={(e) => e.preventDefault()}
                >
                    <i className="fas fa-trash" /> Eliminar
                </a>
            </div>
        </>
    );
};

export default NotificationDropdown;
