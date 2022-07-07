import { useState, useEffect, useContext, useRef } from "react";
import { PropTypes } from "prop-types";
import FormInput from "../../FormInput/FormInput";
import { useNavigate } from "react-router-dom";
import { BankContext } from "../../BankHome/BankHome";
import NumberFormat from 'react-number-format';
import { IoMdWarning } from "react-icons/io";
import ButtonLoader from "../../ButtonLoader/ButtonLoader";

const FormTransferFunds = (props) => {
    const { isMenuOpen } = props;
    const userEmail = localStorage.getItem("userLoggedEmail");
    const [error, setError] = useState(""); // setError("form__error--show");
    const [inputsValues, setInputsValues] = useState([""]);
    const [inputsErrors, setInputsErrors] = useState([]);
    const [errorInfo, setErrorInfo] = useState("Wrong or missing information. Check the information again.");
    const [accountsInfo, setAccountsInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currencySign, setCurrencySign] = useState("");
    const [transactionAmount, setTransactionAmount] = useState("");
    const form = useRef(null);
    const inputColon = useRef(null);
    const inputDollar = useRef(null);
    const amountInp = useRef(null);
    const selectAccount = useRef(null);
    const submitBtn = useRef(null);
    const [currencyExchange, setCurrencyExchange] = useState("");
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [accountSelected, setAccountSelected] = useState("Select the account:");
    const [currency, setCurrency] = useState(null);

    const navigate = useNavigate();

    let token = localStorage.getItem("JWT");
    if (token) {
        token = token.replace(/^"(.+(?="$))"$/, '$1');
    }
    const bankContext = useContext(BankContext);
    const [userInfo, setUserInfo] = useState("");
    useEffect(() => {
        if (bankContext.userInfo.loading === false) {
            setLoading(false);
            //console.log(userInfo);
            setUserInfo(bankContext.userInfo.data);
        }
    }, [bankContext]);



    let formInfo = [{
        info: "Origin account",
        id: "form-add-funds-origin-account",
        type: "text",
        placeholder: "",
        errorInfo: "Enter a valid account (IBAN number)",
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
    const handleAmountChange = (e) => {
        let value = e.target.value;
        let newValue = value;
        const comaRegex = /[.,\s]/g;

        if (value.charAt(0) === "$" || value.charAt(0) === "₡") {
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
            if (currency !== null && currency && accountSelected !== "Select the account:" && accountSelected) {
                console.log(transactionAmount)
                const numberRegex = /^\d+$/;
                if (!numberRegex.test(transactionAmount / 1) || transactionAmount / 1 === 0) {
                    setError("form__error--show");
                    setErrorInfo("Amount must be a valid number");
                } else {
                    setError("");
                    setLoadingSubmit(true);
                    let movement = {
                        originAccount: accountSelected[0],
                        currency: currency,
                        amount: transactionAmount / 1,
                        movementType: "Money insertion", 
                        user: userEmail
                    }

                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                        body: JSON.stringify(movement)
                    };
                    fetch(`https://project-3-backend-daniel.herokuapp.com/movements`, requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            const timeout = setTimeout(() => {
                                setLoadingSubmit(false);
                                navigate("/bank-home");
                            }, 1500);
        
                            return () => clearTimeout(timeout);

                        })
                }
            } else {
                setError("form__error--show");
                setErrorInfo("Must select a currency and an account option");
            }

        } else {
            setError("form__error--show");
            setInputsErrors(errorsInputs);
            console.log(errorsInputs);
        }
    }



    useEffect(() => {
        setLoading(true);
        fetch("https://tipodecambio.paginasweb.cr/api/")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCurrencyExchange(data);
            })
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        };
        fetch(`https://project-3-backend-daniel.herokuapp.com/bank-accounts/user/${userEmail}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                setAccountsInfo(data);
                setLoading(false);
            })

    }, [token, userEmail, bankContext, isMenuOpen]);

    useEffect(() => {
        if (loading === false) {
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
                <div className="form__cnt form__info__cnt dash-form__cnt__title">
                    <h1 className="form__info__title dash-form__cnt__title--text">Add funds</h1>
                </div>
                <form className="form__form dash-form__form" onSubmit={handleSubmit}>
                    {error.length > 0 && <div className={`error__error  signup__error error__error--transparent error__dash`}>
                        <IoMdWarning className="error__icon" />
                        <p className="error__error--text error__text--dash">{errorInfo}</p>

                    </div>}
                    <div className="form__form__cnt dash-form__form__cnt">
                        <label className="form__label dash-form__label" htmlFor="add-funds-destination-account-select">Destination account</label>
                        <select ref={selectAccount} className="form__form__select dash-form__select" value={accountSelected} onChange={handleDropdownChange} id="add-funds-destination-account-select" aria-labelledby="add-funds-destination-account-select" name="add-funds-destination-account-select" >
                            <option defaultValue disabled>Select the account:</option>
                            <option value={accountsInfo[0].accountNumber}>Colon account - {accountsInfo[0].accountNumber}</option>
                            <option value={accountsInfo[1].accountNumber}>Dollar account - {accountsInfo[1].accountNumber}</option>
                        </select>
                    </div>

                    <div className="form__form__cnt dash-form__form__cnt">
                        <label className="form__label dash-form__label" htmlFor="form-add-funds-amount">Amount</label>
                        <NumberFormat ref={amountInp} thousandSeparator={true} aria-labelledby={"form-add-funds-amount"} id={"form-add-funds-amount"} prefix={currencySign} className={"form__form__inp dash-form__input"} value={transactionAmount || ""} onChange={e => {
                            handleAmountChange(e)
                        }
                        } />
                        <p className="dash-form__form__cnt--balance dash-form__form__cnt--balance-end">Exchange rate for buying: ₡{currencyExchange.compra}</p>
                        <p className="dash-form__form__cnt--balance dash-form__form__cnt--balance-end">Exchange rate for selling: ₡{currencyExchange.venta}</p>

                    </div>

                    <div className="form__form__cnt dash-form__form__cnt dash-form__form__cnt--special">
                        <div className="dash-form__form__sub-cnt--special">
                            <label className="dash-form__label dash-form__label--currency" htmlFor="transfer-funds-currency-input-radio">Currency</label>
                            <div className="dash-form__form__cnt--radio" >
                                <div>
                                    <input className="form__form__inp-radio dash-form__inp" id="transfer-funds-currency-colon" name="transfer-funds-currency-colon" type={"radio"} value={"Colon"} onChange={e => handleCurrencyChange(e)} checked={currency === "Colon"} aria-labelledby="transfer-funds-currency-colon" />
                                    <label ref={inputColon} htmlFor="transfer-funds-currency-colon" className="dash-form__inp__label dash-form__inp__label--1">Colon</label>
                                </div>
                                <div>
                                    <input className="form__form__inp-radio dash-form__inp" id="transfer-funds-currency-dollar" name="transfer-funds-currency-dollar" type={"radio"} value={"Dollar"} onChange={e => handleCurrencyChange(e)} checked={currency === "Dollar"} aria-labelledby="transfer-funds-currency-dollar" />
                                    <label ref={inputDollar} htmlFor="transfer-funds-currency-dollar" className="dash-form__inp__label dash-form__inp__label--2">Dollar</label>
                                </div>
                            </div>
                        </div>
                        <div className="dash-form__form__sub-cnt--special">
                            {formInfo.map((input, index) => <FormInput key={index} inputInfo={input} handleInputChange={handleInputChange} index={index} errorSubmit={inputsErrors} dash={true} />
                            )}

                        </div>
                    </div>

                    <button ref={submitBtn} name="submit-btn" type="submit" className="form__form__btn signup__cnt__submit form__submit__btn login__sub-cnt__submit" aria-label="login submit button">
                        {loadingSubmit === false && "Add"}
                        {loadingSubmit === true && <ButtonLoader />}
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