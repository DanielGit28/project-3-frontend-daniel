import { useState, useEffect, useContext, useRef } from "react";
import { PropTypes } from "prop-types";
import FormInput from "../../FormInput/FormInput";
import { useNavigate } from "react-router-dom";
import { BankContext } from "../../BankHome/BankHome";
import NumberFormat from 'react-number-format';
import { IoMdWarning } from "react-icons/io";
import ButtonLoader from "../../ButtonLoader/ButtonLoader";

const FormServices = (props) => {
    const { isMenuOpen, cardOpen, serviceTitle, serviceTypes } = props;

    const userEmail = localStorage.getItem("userLoggedEmail");
    const [error, setError] = useState(""); // setError("form__error--show");
    const [inputsValues, setInputsValues] = useState([""]);
    const [inputsErrors, setInputsErrors] = useState([]);
    const [errorInfo, setErrorInfo] = useState("Wrong or missing information. Check the information again.");
    const [accountsInfo, setAccountsInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currencySign, setCurrencySign] = useState("");
    const [transactionAmount, setTransactionAmount] = useState("");
    const [accountInfoSelected, setAccountInfoSelected] = useState("");
    const form = useRef(null);
    const inputColon = useRef(null);
    const inputDollar = useRef(null);
    const amountInp = useRef(null);
    const selectAccount = useRef(null);
    const submitBtn = useRef(null);
    const [currencyExchange, setCurrencyExchange] = useState("");
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [accountSelected, setAccountSelected] = useState("Select the account:");
    const [serviceSelected, setServiceSelected] = useState("Select the service:");
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

    const handleDropdownChange = (e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        for (let i = 0; i < accountsInfo.length; i++) {
            console.log(value === accountsInfo[i].accountNumber);
            if (value[0] === accountsInfo[i].accountNumber) {
                accountsInfo[i].accountBalance = Math.round((accountsInfo[i].accountBalance + Number.EPSILON) * 100) / 100;
                setAccountInfoSelected(accountsInfo[i]);
            }
        }
        setAccountSelected(value);

    }

    const handleDropdownsServiceChange = (e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        setServiceSelected(value);
        console.log(value)
    }

    const handleAmountChange = (e) => {
        let value = e.target.value;
        let newValue = value;

        if (value.charAt(0) === "$" || value.charAt(0) === "₡") {
            newValue = value.substring(1);
        }
        newValue = newValue.replace(/[.,\s]/g, '');
        setTransactionAmount(newValue);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        let formValidation = true;
        let errorsInputs = [];
        console.log(accountInfoSelected);
        console.log(accountSelected);


        if (formValidation === true) {
            if (accountSelected !== "Select the account") {
                if (accountInfoSelected.accountBalance > transactionAmount || accountInfoSelected.accountBalance* currencyExchange.compra > transactionAmount) {
                    console.log(transactionAmount)
                    const numberRegex = /^\d+$/;
                    if (!numberRegex.test(transactionAmount / 1) || transactionAmount / 1 === 0) {
                        setError("form__error--show");
                        setErrorInfo("Amount must be a valid number");
                    } else if (serviceSelected !== "Select the service:") {
                        setError("");
                        setLoadingSubmit(true);
                        let currency;
                        let serviceAmount = transactionAmount;
                        if (accountInfoSelected.currency === "Colon") {
                            currency = "Colon";
                        } else if (accountInfoSelected.currency === "Dollar") {
                            currency = "Dollar";
                            serviceAmount = transactionAmount / currencyExchange.venta;
                            serviceAmount = serviceAmount/1;
                        }
                        let service = {
                            bankAccount: accountSelected[0],
                            currency: currency,
                            amount: serviceAmount,
                            serviceType: serviceSelected[0],
                            state: "Payed",
                            user: userEmail
                        }
                        console.log(service)

                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                            body: JSON.stringify(service)
                        };
                        fetch(`https://project-3-backend-daniel.herokuapp.com/services`, requestOptions)
                            .then(response => response.text())
                            .then(data => {
                                console.log(data);
                                const timeout = setTimeout(() => {
                                    setLoadingSubmit(false);
                                    navigate("/bank-home");
                                }, 1500);

                                return () => clearTimeout(timeout);

                            })
                    }
                    else {
                        setError("form__error--show");
                        setErrorInfo("Must select an account");
                    }
                } else {
                    setError("form__error--show");
                    setErrorInfo("Insuficient funds");
                }
            } else {
                setError("form__error--show");
                setErrorInfo("Must select an account");
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
        if (serviceTitle === "Common services") {
            setTransactionAmount(Number("30000"));
        } else if (serviceTitle === "Insurances") {
            setTransactionAmount(Number("150000"));
        } else if (serviceTitle === "Permits") {
            setTransactionAmount(Number("90000"));

        } else if (serviceTitle === "Digital services") {
            setTransactionAmount(Number("50000"));
        }
    }, [])

    useEffect(() => {
        if (loading === false) {
            if (cardOpen === true) {
                if (isMenuOpen) {
                    submitBtn.current.classList.add("z-index-minus-1");
                } else {
                    submitBtn.current.classList.remove("z-index-minus-1");
                }
            }

        }
    }, [isMenuOpen, loading, cardOpen])

    


    if (loading === false) {
        return (
            <div ref={form} className={`form__root dash-form__root services-form__root  hide services-form__closed ${cardOpen === false && "services-form__close"} ${cardOpen && "services-form__show"}`}>
                <div className="form__cnt form__info__cnt dash-form__cnt__title">
                    <h1 className="form__info__title dash-form__cnt__title--text">{serviceTitle}</h1>
                </div>
                <form className="form__form dash-form__form services-form__form" onSubmit={handleSubmit}>
                    {error.length > 0 && <div className={`error__error  signup__error error__error--transparent error__dash`}>
                        <IoMdWarning className="error__icon" />
                        <p className="error__error--text error__text--dash">{errorInfo}</p>

                    </div>}
                    <div className="form__form__cnt dash-form__form__cnt ">
                        <label className="form__label dash-form__label services-form__label" htmlFor="transfer-funds-origin-account-select">Origin account</label>
                        <select className="form__form__select dash-form__select" value={accountSelected} onChange={handleDropdownChange} id="transfer-funds-origin-account-select" aria-labelledby="transfer-funds-origin-account-select" name="transfer-funds-origin-account-select" >
                            <option defaultValue disabled value={"Select the origin account:"}>Select the origin account:</option>
                            <option value={accountsInfo[0].accountNumber}>Colon account - {accountsInfo[0].accountNumber}</option>
                            <option value={accountsInfo[1].accountNumber}>Dollar account - {accountsInfo[1].accountNumber}</option>
                        </select>
                        <p className="dash-form__form__cnt--balance">Account balance: {accountInfoSelected.currency === "Colon" && "₡"}{accountInfoSelected.currency === "Dollar" && "$"}{/^(?:\d*\.\d{1,2}|\d+)$/.test(accountInfoSelected.accountBalance / 1) && accountInfoSelected.accountBalance}</p>
                    </div>


                    <div className="form__form__cnt dash-form__form__cnt ">
                        <label className="form__label dash-form__label services-form__label" htmlFor="services-service-select">Service</label>
                        <select className="form__form__select dash-form__select" value={serviceSelected} onChange={handleDropdownsServiceChange} id="services-service-select" aria-labelledby="services-service-select" name="services-service-select" >
                            <option defaultValue disabled value={"Select the service:"}>Select the service:</option>
                            {serviceTypes.map((service, index) => {
                                return <option value={service} key={index}>{service}</option>;
                            })}
                        </select>

                    </div>

                    <div className="form__form__cnt dash-form__form__cnt ">
                        <p className="form__label dash-form__label services-form__label services-form__text" >Amount: ₡{transactionAmount} </p>


                    </div>

                    {cardOpen === true && <button ref={submitBtn} name="submit-btn" type="submit" className="form__form__btn signup__cnt__submit form__submit__btn login__sub-cnt__submit" aria-label="login submit button">
                        {loadingSubmit === false && "Pay"}
                        {loadingSubmit === true && <ButtonLoader />}
                    </button>}

                </form>
            </div>
        );
    }


}

FormServices.propTypes = {
    getInfo: PropTypes.func,
}

export default FormServices;