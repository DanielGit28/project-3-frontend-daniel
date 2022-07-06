import { useState, useRef, useEffect } from "react";
import { PropTypes } from "prop-types";


const FormInput = (props) => {
    const { inputInfo, handleInputChange, index, errorSubmit, dash } = props;
    const [inputValue, setInputValue] = useState("");
    const errorRef = useRef(null);
    const inputError = useRef(null);
    const errorRefSubmit = useRef(null);
    const [localError, setLocalError] = useState(false);

    const [inputUsed, setInputUsed] = useState(false);
    const [errorOnSubmit, setErrorOnSubmit] = useState(false);
    const [errorInfo, setErrorInfo] = useState(inputInfo.errorInfo);
    const [uniqueError, setUniqueError] = useState(false);


    useEffect(() => {
        for (let i = 0; i < errorSubmit.length; i++) {
            if (errorSubmit[i] === index) {
                if (errorSubmit.length === 1) {
                    if (errorSubmit[i] === index) {
                        setUniqueError(true);
                    }
                }
                setErrorOnSubmit(true);
                setLocalError(true);
            }
        }

    }, [errorSubmit, localError]);
    useEffect(() => {
        //Error validation
        if (inputUsed) {

            if (inputValue.length === 0) {
                setLocalError(true);
            } else if (inputInfo.info === "Email") {
                var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if (emailPattern.test(inputValue)) {
                    setLocalError(false);

                } else {
                    setLocalError(true);

                }
            } else if (inputInfo.info === "Amount") {
                const numberRegex = /^\d+$/;
                if (numberRegex.test(inputValue)) {
                    setLocalError(false);

                } else {
                    setLocalError(true);

                }
            } else if (inputInfo.info === "Destination account" || inputInfo.id === "form-add-funds-origin-account") {
                const IBANPattern = /^[A-Z]{2}[0-9A-Z]*$/;
                if (IBANPattern.test(inputValue)) {
                    setLocalError(false);
                } else {
                    setLocalError(true);
                }
            }
            else {
                setLocalError(false);
            }

        }
    }, [inputUsed, localError, inputValue])

    if (inputInfo) {
        return (
            <div className={`form-input__root ${inputInfo.customCntClass}`}>
                {inputInfo.labelRequired && <label className={`form__label ${inputInfo.customLabelClass}`} htmlFor={inputInfo.id} >{inputInfo.info}</label>}

                <input ref={inputError} type={`${inputInfo.type}`} aria-labelledby={inputInfo.id} placeholder={inputInfo.placeholder} id={inputInfo.id} className={`form__form__inp ${inputInfo.customClassInput} ${((errorOnSubmit === true && localError === true)) && "form__error--inp"}`} value={inputValue || ""} onChange={e => {
                    handleInputChange(e, index)
                    setInputValue(e.target.value);
                    setInputUsed(true);
                }
                } />


                <p ref={errorRefSubmit} className={`form__error  ${errorOnSubmit && "form__error--show"} ${localError === false && "hide"}  ${dash && "error__error--dash"}`} id={`${inputInfo.id}-error`}>* {errorInfo}</p>

            </div>
        );
    }

}


FormInput.propTypes = {
    inputInfo: PropTypes.object,
    handleInputChange: PropTypes.func,
    index: PropTypes.number,
    errorSubmit: PropTypes.array
}
export default FormInput;