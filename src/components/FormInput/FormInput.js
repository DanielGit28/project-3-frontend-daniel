import { useState, useRef, useEffect } from "react";
import { PropTypes } from "prop-types";


const FormInput = (props) => {
    const { inputInfo, handleInputChange, index, errorSubmit } = props;
    const [inputValue, setInputValue] = useState("");
    const errorRef = useRef(null);
    const inputError = useRef(null);
    const errorRefSubmit = useRef(null);

    const [inputUsed, setInputUsed] = useState(false);
    const [errorOnSubmit, setErrorOnSubmit] = useState(false);
    const [errorInfo, setErrorInfo] = useState(inputInfo.errorInfo);


    useEffect(() => {
        for (let i = 0; i < errorSubmit.length; i++) {
            if (errorSubmit[i] === index) {
                setErrorOnSubmit(true);
            }
        }
        //Error validation
        if (inputUsed) {
            if (errorRef.current && inputError.current) {
                if (inputValue.length === 0) {
                    errorRef.current.classList.add("form__error--show");
                    inputError.current.classList.add("form__error--inp");
                    setErrorOnSubmit(false);
                } else if (inputInfo.info === "Email") {
                    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                    if (emailPattern.test(inputValue)) {
                        errorRef.current.classList.remove("form__error--show");
                        inputError.current.classList.remove("form__error--inp");
                        setErrorOnSubmit(false);
                    } else {
                        errorRef.current.classList.add("form__error--show");
                        inputError.current.classList.add("form__error--inp");
                        setErrorOnSubmit(false);
                    }
                } else if (inputInfo.info === "Amount") {
                    if (!isNaN(inputValue)) {
                        errorRef.current.classList.remove("form__error--show");
                        inputError.current.classList.remove("form__error--inp");
                        setErrorOnSubmit(false);
                    } else {
                        errorRef.current.classList.add("form__error--show");
                        inputError.current.classList.add("form__error--inp");
                        setErrorOnSubmit(false);
                    }
                } else if (inputInfo.info === "Destination account") {
                    var IBANPattern = /^[A-Z]{2}[0-9A-Z]*$/;
                    if (IBANPattern.test(inputValue)) {
                        errorRef.current.classList.remove("form__error--show");
                        inputError.current.classList.remove("form__error--inp");
                        setErrorOnSubmit(false);
                    } else {
                        errorRef.current.classList.add("form__error--show");
                        inputError.current.classList.add("form__error--inp");
                        setErrorOnSubmit(false);
                    }
                }
                else {
                    errorRef.current.classList.remove("form__error--show");
                    inputError.current.classList.remove("form__error--inp");
                    setErrorOnSubmit(false);
                }
            }
        }
    }, [errorRef, inputError, inputValue, errorSubmit, errorOnSubmit, index, inputInfo.info, inputUsed]);

    if (inputInfo) {
        return (
            <div className={`form-input__root ${inputInfo.customCntClass}`}>
                {inputInfo.labelRequired && <label className={`form__label ${inputInfo.customLabelClass}`} htmlFor={inputInfo.id} >{inputInfo.info}</label>}

                <input ref={inputError} type={`${inputInfo.type}`} aria-labelledby={inputInfo.id} placeholder={inputInfo.placeholder} id={inputInfo.id} className={`form__form__inp ${inputInfo.customClassInput}`} value={inputValue || ""} onChange={e => {
                    handleInputChange(e, index)
                    setInputValue(e.target.value);
                    setInputUsed(true);
                }
                } />

                {inputUsed && <p ref={errorRef} className="form__error" id={`${inputInfo.id}-error`}>{inputInfo.errorInfo}</p>}
                {errorOnSubmit && <p ref={errorRefSubmit} className="form__error--show" id={`${inputInfo.id}-error`}>{errorInfo}</p>}

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