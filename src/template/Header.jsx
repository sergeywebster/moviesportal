import { useContext, useState } from 'react';
import logo from '../assets/logo.svg'
import Registration from '../components/Auth/Registration';
import Login from '../components/Auth/Login';
import AuthContext from '../components/Auth/auth-context';
import ModalContext from '../components/UI/Modals/modal-context';

const Header = () => {
    const authModalContext = useContext(ModalContext);
    const context = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [newAccount, setNewAcount]= useState(false);

    // Open Sign in Form in modal
    const authHandler = () => {
        authModalContext.openModal()
    }

    // Close modal window
    const closeModal = () => {
        authModalContext.closeModal();
    };

   // Swith on Sign Up form  
   const onSignUp = (e) => {
        e.preventDefault()
        setNewAcount(true);
   }

   // Swith on Sign In form 
    const onSignIn = (e) => {
        e.preventDefault()
        setNewAcount(false);
    }


    return (
       <>
            <header>
                <div className=' bg-gradient-to-r from-[#1d2539] to-[#2e3b5b] py-4'>
                    <div className="container mx-auto">
                        <div className="flex justify-between">
                            <a href="/"><img src={logo} alt="Logo" width="101px" height="35px"/></a>
                            
                            {context.isLoggedIn && 
                                <button className='flex items-center text-white' onClick={context.onLogout}>
                                    <img src="https://picsum.photos/seed/picsum/200/200" className='rounded-sm w-8 mr-2'/> {context.user.name}
                                </button>
                            }

                            {!context.isLoggedIn && 
                                <button className='text-white' onClick={authHandler}>Sign In</button>
                            }

                            {/* Login / Registration Form in Modal window */}
                            {authModalContext.showModal && (
                                !newAccount 
                                ? <Login onClose={closeModal}  onSwitchForm={onSignUp} onLogin={context.onLogin}/> 
                                : <Registration onClose={closeModal} onSwitchForm={onSignIn}/>
                                )
                            }
                        </div>
                    </div>
                </div>
            </header>
       </>
    )
}

export default Header;