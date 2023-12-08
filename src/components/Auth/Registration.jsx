import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../UI/Modals/Modal";
import Input from "../UI/Forms/Input";
import useInputValidation from "../../hooks/useInputValidation";
import { auth } from "../../helpers/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import PreloadingSpinner from "../UI/PreloadingSpinner";



const Registration = ({onClose, onSwitchForm}) => {
    const [credentialErrorMessage, setCredentialErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate Username input
    const {
        value: username,
        isInputValid: isUsernameInputValid,
        isInvalid: isUserInvalid,
        inputLostFocus: inputUserLostFocus,
        inputChangeHandler: inputUserHandler,
        resetInputValue: resetUserInputValue,
    } = useInputValidation(val => val.trim(''));

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

    } = useInputValidation(val => val.length > 5 && val.length < 60);


     // Check is Form valid
     let isFormValid = false;
     if(isUsernameInputValid && isEmailInputValid && isPasswordInputValid) {
         isFormValid = true;
     }

    // Submit form
    const submitAuthHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Create account
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            updateProfile(auth.currentUser, {
                displayName: displayName,
            })

            onClose();
            onLogin();
            
            // Clear inputs after submit
            resetUserInputValue();
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
                    <h2 className="px-4 text-white font-bold text-2xl">Sign Up</h2>
                    <form className="p-4" onSubmit={submitAuthHandler}>
                        {credentialErrorMessage && 
                            <div className="bg-orange-300 text-xs rounded-sm p-3">
                                {credentialErrorMessage === 'auth/email-already-in-use' && `E-mail address already in use.`} 
                            </div>
                        }
                        <Input  input= {{
                                type: 'text', 
                                value: username,
                                name: 'username',
                                id: 'username',
                                placeholder: 'Your name',
                                className: 'w-full p-3 rounded-sm',
                                onChange: inputUserHandler,
                                onBlur: inputUserLostFocus,
                        }}/>
                        {isUserInvalid && <label className="block text-xs pt-2 text-red-500 ">Please enter a valid name</label>}

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
                        {isPasswordInValid && <label className="block text-xs pt-2 text-red-500 ">Your password must contain between 6 and 60 characters.</label>}
                       
                        <div className="pt-5">
                            <button disabled={!isFormValid} className="w-full bg-red-600 hover:bg-red-700 disabled:hover:bg-red-600 transition-colors duration-300 disabled:opacity-60 text-white rounded-md p-3">
                            {isLoading ? <PreloadingSpinner/> : 'Get started'}
                            </button>
                        </div>
                        <div className="pt-3 text-right">
                            <button className="text-white" onClick={onSwitchForm}>Sign in</button>
                        </div>
                    </form>
                </Modal>, 
            document.body)}
        </>
    )
}

export default Registration;