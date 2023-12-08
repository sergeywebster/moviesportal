
const Modal = ({onClose, styles, children}) => {

    return (
        <>
            <div className="flex items-center z-40 w-full h-full fixed top-0 left-0 bg-black bg-opacity-80" onClick={onClose}></div>
            <div className={`fixed  top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 z-50  bg-zinc-800 rounded-md p-6 m-auto ${styles}`}>
                {children}
            </div>
            
        </>
    )
}

export default Modal;