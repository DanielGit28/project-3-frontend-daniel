import { useState, useEffect, useContext, useRef } from "react";
import { PropTypes } from "prop-types";
import FormInput from "../../FormInput/FormInput";
import { useNavigate } from "react-router-dom";
import { BankContext } from "../../BankHome/BankHome";

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
        customClassInput: "",
        labelRequired: true
    },
    {
        info: "Destination account",
        id: "form-add-funds-destination-account",
        type: "text",
        placeholder: "",
        errorInfo: "Enter a valid destination account (IBAN number)",
        customClassInput: "",
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
    /*
    useEffect(() => {
        //animations
        if (accountsInfo !== null && !loading) {
            
            if (bankContext.breakPoint[0] < 768) {
                if (isMenuOpen) {
                    
                    form.current.classList.add("scale-out");
                    form.current.classList.remove("scale-in");
                } else {
                    
                    form.current.classList.remove("scale-out");
                    form.current.classList.add("scale-in");

                }
            } else {
                form.current.classList.remove("scale-out");
                    form.current.classList.remove("scale-in");
            }
        }
    }, [accountsInfo, bankContext, isMenuOpen, loading])
*/



    if (loading === false) {
        return (
            <div ref={form} className="form__root">
                <div className="form__cnt form__info__cnt">
                    <h1 className="form__info__title">Transfer money</h1>
                    <div className={`form__error form__error--left-space ${error}`}>
                        <div className="form__error__box">
                            <i className='fas fa-exclamation-circle form__error--icon'></i><p className="form__error--text">{errorInfo}</p>
                        </div>
                    </div>

                </div>
                <form className="form__form" onSubmit={handleSubmit}>

                    <div className="form__form__cnt">
                        <select value={accountSelected} onChange={handleDropdownChange}>
                            <option defaultValue disabled>Select the account:</option>
                            <option value={accountsInfo[0].accountNumber}>Colon account - {accountsInfo[0].accountNumber}</option>
                            <option value={accountsInfo[1].accountNumber}>Dolar account - {accountsInfo[1].accountNumber}</option>
                        </select>
                    </div>
                    <div className="form__form__cnt">
                        <label>Currency</label>
                        <div>
                            <input id="form-personal-gender-male" name="form-personal-gender-male" type={"radio"} value={"Colon"} onChange={e => handleCurrencyChange(e)} checked={currency === "Colon"} />
                            <label htmlFor="form-personal-gender-male">Colon</label>
                        </div>
                        <div>
                            <input id="form-personal-gender-female" name="form-personal-gender-female" type={"radio"} value={"Dolar"} onChange={e => handleCurrencyChange(e)} checked={currency === "Dolar"} />
                            <label htmlFor="form-personal-gender-female">Dolar</label>
                        </div>
                    </div>

                    <div className="form__form__cnt">
                        {formInfo.map((input, index) => <FormInput key={index} inputInfo={input} handleInputChange={handleInputChange} index={index} errorSubmit={inputsErrors} />
                        )}

                    </div>
                    <div className="form__btns__cnt">
                        <button name="next-btn" type="submit" className="form__form__btn product__add__btn">
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