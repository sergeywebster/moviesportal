import { createContext, useState } from "react";

const ModalContext = createContext({
    showModal: false,
    openModal: false,
    closeModal: false, 
});

export const ModalContextProvider = ({children}) => {
    const [isShowModal, setIsShowModal] = useState(false);

    const openModalHandler = () => {
        setIsShowModal(true);
        document.body.classList.add('overflow-hidden');
    } 

    const closeModalHandler = () => {
        setIsShowModal(false);
        document.body.classList.remove('overflow-hidden');
    } 

    return (
        <ModalContext.Provider value={{
            showModal: isShowModal,
            openModal: openModalHandler,
            closeModal: closeModalHandler
        }}>
            {children}
        </ModalContext.Provider>
    )

}



export default ModalContext;
