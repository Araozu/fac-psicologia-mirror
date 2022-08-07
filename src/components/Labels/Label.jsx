import React, {useState} from "react";
import "../../views/Create/CrearPM.css";
import "./Label.css";
import Modal from 'react-modal';
import {AiFillQuestionCircle as Info} from "react-icons/ai";


export default function Label(props) {
    const {
        title,
        detalle,
    } = props;

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <label className={"etiqueta"}>{title}
                <button type="button" onClick={openModal}><Info/></button>
            </label>
            <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
                {detalle}
            </Modal>
        </>

    );

}

const customStyles ={
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}
