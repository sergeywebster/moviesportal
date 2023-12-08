import { useState } from "react";

const useInputValidation = (validateFunc) => {
    const [inputValue, setinputValue] = useState('');
    const [wasInputTouched, setWasInputTouched] = useState(false);
    const isInputValid = validateFunc(inputValue);
    const isInputInvalid = wasInputTouched && !isInputValid;

    const inputLostFocus = () => {
        setWasInputTouched(true);  
    } 

    const inputChangeHandler = (e) => {
        setinputValue(e.target.value);
    }

    const resetInputValue = () => {
        setinputValue('');
        setWasInputTouched(false);
    }

    return {
        value: inputValue,
        isInputValid,
        isInvalid: isInputInvalid,
        inputLostFocus,
        inputChangeHandler,
        resetInputValue
    }
};

export default useInputValidation;
