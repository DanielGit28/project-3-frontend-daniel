import { useState, useEffect, useContext, useRef } from "react";
import { PropTypes } from "prop-types";
import FormInput from "../../FormInput/FormInput";
import { useNavigate } from "react-router-dom";
import { BankContext } from "../../BankHome/BankHome";
import { AiOutlineWarning } from "react-icons/ai";
import NumberFormat from 'react-number-format';

const FormTransferFunds = (props) => {
    const { isMenuOpen } = props;
    const userEmail = localStorage.getItem("userLoggedEmail");
    const [error, setError] = useState(""); // setError("form__error--show");
    const [inputsValues, setInputsValues] = useState([""]);
    const [inputsErrors, setInputsErrors] = useState([]);
    const [errorInfo, setErrorInfo] = useState("Wrong or missing information. Check the information again.");
    const [accountsInfo, setAccountsInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const form = useRef(null);
    const [accountSelected, setAccountSelected] = useState("Select the account:");
    const [currency, setCurrency] = useState("");
    const [currencySign, setCurrencySign] = useState("");
    const [transactionAmount, setTransactionAmount] = useState("");
    const [accountInfoSelected, setAccountInfoSelected] = useState("");
    const inputColon = useRef(null);
    const inputDollar = useRef(null);
    const amountInp = useRef(null);
    const selectAccount = useRef(null);
    const submitBtn = useRef(null);
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

    let formInfo = [
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
        for(let i=0; i < accountsInfo.length; i++) {
            console.log(value === accountsInfo[i].accountNumber);
            if(value[0] === accountsInfo[i].accountNumber) {
                console.log("Account found")
                setAccountInfoSelected(accountsInfo[i]);
            }
        }
        setAccountSelected(value);
        console.log(value);
        //Validates the accounts
        
    }
    const handleAmountChange = (e) => {
        let value = e.target.value;
        let newValue = value;
        const comaRegex = /[.,\s]/g;

        if(value.charAt(0) === "$" || value.charAt(0) === "₡") {
            newValue = value.substring(1);
        }
        newValue = newValue.replace(/[.,\s]/g, '');
        setTransactionAmount(newValue);
    }
    

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
        if (e.target.value === "Colon") {
            inputColon.current.classList.add("radio-selected");
            inputDollar.current.classList.remove("radio-selected");
            setCurrencySign("₡");
        } else if (e.target.value === "Dollar") {
            inputColon.current.classList.remove("radio-selected");
            inputDollar.current.classList.add("radio-selected");
            setCurrencySign("$");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let formValidation = true;
        let errorsInputs = [];
            if (inputsValues[0].length === 0) {
                formValidation = false;
                errorsInputs.push(0);
            }

        console.log(inputsValues);
        console.log(formValidation);
        if (formValidation === true) {
            if (accountSelected !== "Select the account:" && accountSelected && currency.length > 0) {
                console.log(transactionAmount)
                const numberRegex = /^\d+$/;
                if (!numberRegex.test(transactionAmount/1) || transactionAmount/1 === 0) {
                    setError("form__error--show");
                    setErrorInfo("Amount must be a valid number");
                } else {
                    setError("");
                    let movement = {
                        originAccount: accountSelected[0],
                        destinationAccount: inputsValues[0],
                        currency: currency,
                        amount: transactionAmount/1,
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

    useEffect(() => {
        if(loading === false) {
            if (isMenuOpen) {
                submitBtn.current.classList.add("z-index-minus-1");
            } else {
                submitBtn.current.classList.remove("z-index-minus-1");
            }
        }
    }, [isMenuOpen, loading])

    if (loading === false) {
        return (
            <div ref={form} className="form__root dash-form__root">
                <div className="form__cnt form__info__cnt">
                    <h1 className="form__info__title">Transfer money</h1>


                </div>
                <form className="form__form dash-form__form" onSubmit={handleSubmit}>
                {error.length > 0 && <div className={`error__error  signup__error`}>

<p className="error__error--text">{errorInfo}</p>

</div>}
                    <div className="form__form__cnt dash-form__form__cnt dash-form__form__cnt--account">
                        <select className="form__form__select dash-form__select" value={accountSelected} onChange={handleDropdownChange}>
                            <option defaultValue disabled>Select the origin account:</option>
                            <option value={accountsInfo[0].accountNumber}>Colon account - {accountsInfo[0].accountNumber}</option>
                            <option value={accountsInfo[1].accountNumber}>Dollar account - {accountsInfo[1].accountNumber}</option>
                        </select>
                        <p className="dash-form__form__cnt--balance">Account balance: {accountInfoSelected.currency === "Colon" && "₡"}{accountInfoSelected.currency === "Dollar" && "$"}{accountInfoSelected.accountBalance}</p>
                    </div>
                    <div className="form__form__cnt dash-form__form__cnt">
                        <label className="form__label dash-form__label" htmlFor="form-add-funds-amount">Amount</label>
                        <NumberFormat thousandSeparator={true} aria-labelledby={"form-add-funds-amount"} id={"form-add-funds-amount"} prefix={currencySign} className={"form__form__inp dash-form__input"} value={transactionAmount || ""} onChange={e => {
                            handleAmountChange(e)
                        }
                        } />
                        

                    </div>
                    <div className="form__form__cnt dash-form__form__cnt  ">
                        <label className="dash-form__label">Currency</label>
                        <div className="dash-form__form__cnt--radio">
                            <div>
                                <input className="form__form__inp-radio dash-form__inp" id="form-add-colon" name="form-add-colon" type={"radio"} value={"Colon"} onChange={e => handleCurrencyChange(e)} checked={currency === "Colon"} />
                                <label ref={inputColon} htmlFor="form-add-colon" className="dash-form__inp__label dash-form__inp__label--1">Colon</label>
                            </div>
                            <div>
                                <input className="form__form__inp-radio dash-form__inp" id="form-add-dollar" name="form-add-dollar" type={"radio"} value={"Dollar"} onChange={e => handleCurrencyChange(e)} checked={currency === "Dollar"} />
                                <label ref={inputDollar} htmlFor="form-add-dollar" className="dash-form__inp__label dash-form__inp__label--2">Dollar</label>
                            </div>
                        </div>
                    </div>

                    <div className="form__form__cnt dash-form__form__cnt">
                        {formInfo.map((input, index) => <FormInput key={index} inputInfo={input} handleInputChange={handleInputChange} index={index} errorSubmit={inputsErrors} />
                        )}

                    </div>
                    <button ref={submitBtn} name="submit-btn" type="submit" className="form__form__btn signup__cnt__submit form__submit__btn dash-form__submit__btn">
                            Submit
                        </button>
                </form>
            </div>
        );
    }


}

FormTransferFunds.propTypes = {
    getInfo: PropTypes.func,
}

export default FormTransferFunds;