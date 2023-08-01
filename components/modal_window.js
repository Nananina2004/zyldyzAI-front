import React from 'react';
import Image from 'next/image';


const ModalWindow = ({ isOpen, onClose, imageSrc }) => {
    if (!isOpen) return null;

    return (
        <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box">
                <Image
                    className=''
                    src={imageSrc}
                    alt="Your Natal Chart"
                    height={544}
                    width={532}
                />
                <p className="py-4">Press ESC key or click the button below to close</p>
                <div className="modal-action">
                    <button className="btn">Close</button>
                </div>
            </form>
        </dialog>
    );
};

export default ModalWindow;
