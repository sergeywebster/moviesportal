import { createPortal } from "react-dom";
import Modal from "../UI/Modals/Modal";
import Input from "../UI/Forms/Input";
import useInputValidation from "../../hooks/useInputValidation";
import { auth } from "../../helpers/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import PreloadingSpinner from "../UI/PreloadingSpinner";

const Login = ({onClose, onSwitchForm, onLogin}) => {
    const [credentialErrorMessage, setCredentialErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate Email input
    const {
        value: email,
        isInputValid: isEmailInputValid,
        isInvalid: isEmailInvalid,
        inputLostFocus: inputEmailLostFocus,
        inputChangeHandler: inputEmailHandler,
        resetInputValue: resetEmailInputValue

    } = useInputValidation(val => regexEmail.test(val));

    // Validate Password input
    const {
        value: password,
        isInputValid: isPasswordInputValid,
        isInvalid: isPasswordInValid,
        inputLostFocus: passwordInputLostFocus,
        inputChangeHandler: inputPasswordHandler,
        resetInputValue: resetPasswordInputValue

    } = useInputValidation(val => val.length > 4 && val.length < 60);

    
   // Check is Form valid
    let isFormValid = false;
    if(isEmailInputValid && isPasswordInputValid) {
        isFormValid = true;
    }


    // Submit form
    const submitAuthHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)

            onClose();
            onLogin();

            // Clear inputs after submit
            resetEmailInputValue();
            resetPasswordInputValue();
            setIsLoading(false);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode, errorMessage)
            if(errorCode) {
                setCredentialErrorMessage(errorCode);
            }

            setIsLoading(false);
        });

       
    }


    return (
        <>  
            {createPortal(
                <Modal onClose={onClose} styles={'w-full max-w-[350px]'}>
                    <h2 className="px-4 text-white font-bold text-2xl">Sign In</h2>
                    <form className="p-4" onSubmit={submitAuthHandler}>
                        {credentialErrorMessage && 
                        <div className="bg-orange-300 text-xs rounded-sm p-3">
                            {credentialErrorMessage === 'auth/wrong-password' && `Incorrect password. Please try again.`} 
                            {credentialErrorMessage === 'auth/user-not-found' && `Sorry, we can't find an account with this email address. Please try again.`}
                            {credentialErrorMessage === 'auth/too-many-requests' && `Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.`}
                        </div>
                        }
                        <Input  input= {{
                            type: 'email', 
                            value: email,
                            name: 'email',
                            id: 'email',
                            placeholder: 'Your email',
                            className: 'w-full p-3 rounded-sm',
                            onChange: inputEmailHandler, 
                            onBlur: inputEmailLostFocus
                        }}/>
                        {isEmailInvalid && <label className="block text-xs pt-2 text-red-500 ">Please enter a valid email</label>}

                        <Input  input= {{
                            type: 'password', 
                            value: password,
                            name: 'password',
                            id: 'password',
                            placeholder: 'Your password',
                            className: 'w-full p-3 rounded-sm',
                            autoComplete: 'current-password webauthn',
                            onChange: inputPasswordHandler,
                            onBlur: passwordInputLostFocus
                        }}/>
                        {isPasswordInValid && <label className="block text-xs pt-2 text-red-500 ">Your password must contain between 5 and 60 characters.</label>}
                       
                        <div className="pt-5">
                            <button disabled={!isFormValid} className="w-full bg-red-600 hover:bg-red-700 disabled:hover:bg-red-600 disabled:opacity-60 transition-colors duration-300 text-white rounded-md p-3">
                                {isLoading ? <PreloadingSpinner/> : 'Sign In'}
                            </button>
                        </div>
                        <div className="pt-3 text-right">
                            <button className="text-white" onClick={onSwitchForm}>Sign up now</button>
                        </div>
                    
                    </form>
                </Modal>, 
            document.body)}
        </>
    )
}

export default Login;