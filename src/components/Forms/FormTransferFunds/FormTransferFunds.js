import { useState, useEffect, useContext, useRef } from "react";
import { PropTypes } from "prop-types";
import FormInput from "../../FormInput/FormInput";
import { useNavigate } from "react-router-dom";
import { BankContext } from "../../BankHome/BankHome";
import { AiOutlineWarning } from "react-icons/ai";

const FormTransferFunds = (props) => {
    const { isMenuOpen } = props;
    const userEmail = localStorage.getItem("userLoggedEmail");
    const [error, setError] = useState(""); // setError("form__error--show");
    const [inputsValues, setInputsValues] = useState(["", ""]);
    const [inputsErrors, setInputsErrors] = useState([]);
    const [errorInfo, setErrorInfo] = useState("Wrong or missing information. Check the information again.");
    const [accountsInfo, setAccountsInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const form = useRef(null);
    const [accountSelected, setAccountSelected] = useState("Select the account:");
    const [currency, setCurrency] = useState(null);
    const inputColon = useRef(null);
    const inputDolar = useRef(null);
    const navigate = useNavigate();

    let token = localStorage.getItem("JWT");
    if (token) {
        token = token.replace(/^"(.+(?="$))"$/, '$1');
    }

    const bankContext = useContext(BankContext);
    useEffect(() => {
        if (bankContext.userInfo.loading === false) {
            setLoading(false);
        }
    }, [bankContext]);

    let formInfo = [{
        info: "Amount",
        id: "form-add-funds-amount",
        type: "text",
        placeholder: "",
        errorInfo: "Enter a valid amount",
        customClassInput: "dash-form__input",
        customLabelClass: "dash-form__label",
        labelRequired: true
    },
    {
        info: "Destination account",
        id: "form-add-funds-destination-account",
        type: "text",
        placeholder: "",
        errorInfo: "Enter a valid destination account (IBAN number)",
        customClassInput: "dash-form__input",
        customLabelClass: "dash-form__label",
        labelRequired: true
    }];


    const handleInputChange = (event, index) => {

        const inputs = [...inputsValues];
        inputs[index] = event.target.value;
        setInputsValues(inputs);
    }
    const handleDropdownChange = (e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        setAccountSelected(value);
        console.log(value)
    }
    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
        if (e.target.value === "Colon") {
            inputColon.current.classList.add("radio-selected");
            inputDolar.current.classList.remove("radio-selected");
        } else if (e.target.value === "Dolar") {
            inputColon.current.classList.remove("radio-selected");
            inputDolar.current.classList.add("radio-selected");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let formValidation = true;
        let errorsInputs = [];
        for (let i = 0; i < inputsValues.length; i++) {
            if (inputsValues[i].length === 0) {
                formValidation = false;
                errorsInputs.push(i);
            }
        }
        console.log(inputsValues);
        console.log(formValidation);
        if (formValidation === true) {
            if (accountSelected !== "Select the account:" && accountSelected) {
                if (isNaN(inputsValues[0])) {
                    setError("form__error--show");
                    setErrorInfo("Amount must be a valid number");
                } else {
                    setError("");
                    let movement = {
                        originAccount: accountSelected[0],
                        destinationAccount: inputsValues[1],
                        currency: currency,
                        amount: inputsValues[0],
                        movementType: "Money transfer"
                    }

                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                        body: JSON.stringify(movement)
                    };
                    console.log("Post made: ", movement);
                    console.log("Stringify: ", JSON.stringify(movement));
                    fetch(`https://project-3-backend-daniel.herokuapp.com/movements`, requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            navigate("/bank-home");

                        })
                }
            } else {
                setError("form__error--show");
                setErrorInfo("Must select a currency and an account option");
            }

        } else {
            setError("form__error--show");
            setInputsErrors(errorsInputs);
        }
    }



    useEffect(() => {
        setLoading(true);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        };
        fetch(`https://project-3-backend-daniel.herokuapp.com/bank-accounts/user/${userEmail}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAccountsInfo(data);
                setLoading(false);
            })

    }, [token, userEmail, bankContext, isMenuOpen]);



    if (loading === false) {
        return (
            <div ref={form} className="form__root dash-form__root">
                <div className="form__cnt form__info__cnt">
                    <h1 className="form__info__title">Transfer money</h1>


                </div>
                <form className="form__form dash-form__form" onSubmit={handleSubmit}>
                    <div className={`form__error form__error--90 ${error}`}>
                        <div className="form__error__box">
                            <AiOutlineWarning className="form__error--icon" />
                            <p className="form__error--text">{errorInfo}</p>
                        </div>
                    </div>
                    <div className="form__form__cnt dash-form__form__cnt">
                        <select className="form__form__select dash-form__select" value={accountSelected} onChange={handleDropdownChange}>
                            <option defaultValue disabled>Select the origin account:</option>
                            <option value={accountsInfo[0].accountNumber}>Colon account - {accountsInfo[0].accountNumber}</option>
                            <option value={accountsInfo[1].accountNumber}>Dolar account - {accountsInfo[1].accountNumber}</option>
                        </select>
                    </div>
                    <div className="form__form__cnt dash-form__form__cnt  ">
                        <label className="dash-form__label">Currency</label>
                        <div className="dash-form__form__cnt--radio">
                            <div>
                                <input className="form__form__inp-radio dash-form__inp" id="form-add-colon" name="form-add-colon" type={"radio"} value={"Colon"} onChange={e => handleCurrencyChange(e)} checked={currency === "Colon"} />
                                <label ref={inputColon} htmlFor="form-add-colon" className="dash-form__inp__label dash-form__inp__label--1">Colon</label>
                            </div>
                            <div>
                                <input className="form__form__inp-radio dash-form__inp" id="form-add-dolar" name="form-add-dolar" type={"radio"} value={"Dolar"} onChange={e => handleCurrencyChange(e)} checked={currency === "Dolar"} />
                                <label ref={inputDolar} htmlFor="form-add-dolar" className="dash-form__inp__label dash-form__inp__label--2">Dolar</label>
                            </div>
                        </div>
                    </div>

                    <div className="form__form__cnt dash-form__form__cnt">
                        {formInfo.map((input, index) => <FormInput key={index} inputInfo={input} handleInputChange={handleInputChange} index={index} errorSubmit={inputsErrors} />
                        )}

                    </div>
                    <div className=" form__cnt form__cnt__submit
                form__submit">
                        <button name="submit-btn" type="submit" className="form__form__btn signup__cnt__submit form__submit__btn">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }


}

FormTransferFunds.propTypes = {
    getInfo: PropTypes.func,
}

export default FormTransferFunds;