import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import FormInput from "../FormInput/FormInput";
import { useNavigate } from "react-router-dom";


const Signup = () => {

    const [error, setError] = useState(""); // setError("form__error--show");
    const [inputsValues, setInputsValues] = useState(["", "", "", "", ""]);
    const [inputsErrors, setInputsErrors] = useState([]);
    const [errorInfo, setErrorInfo] = useState("Wrong or missing information. Check the information again.");

    const [accountImg, setAccountImg] = useState("");

    const [incomeSource, setIncomeSource] = useState("Select the income source:");
    const navigate = useNavigate();
    let cloudinaryWidget = window.cloudinary.createUploadWidget({
        cloudName: "develop-daniel",
        uploadPreset: "qsos1wdv"
    }, (error, result) => {checkUploadResult(result)})

    let token = localStorage.getItem("JWT");
    if (token) {
        token = token.replace(/^"(.+(?="$))"$/, '$1');
    }



    let formInfo = [{
        info: "Full name",
        id: "form-account-fullName",
        type: "text",
        placeholder: "Robert Downey Jr.",
        errorInfo: "Enter a valid name",
        customClassInput: "",
        labelRequired: true
    },
    {
        info: "Identification",
        id: "form-account-id",
        type: "text",
        placeholder: "111000222",
        errorInfo: "Enter a valid id",
        customClassInput: "",
        labelRequired: true
    }, {
        info: "Email",
        id: "form-account-email",
        type: "text",
        placeholder: "d@gmail.com",
        errorInfo: "Enter a valid email",
        customClassInput: "",
        labelRequired: true
    }, {
        info: "Password",
        id: "form-personal-password",
        type: "password",
        placeholder: "",
        errorInfo: "Enter a valid password",
        customClassInput: "",
        labelRequired: true
    },
    {
        info: "Validate password",
        id: "form-personal-password-validation",
        type: "password",
        placeholder: "",
        errorInfo: "Enter the same password",
        customClassInput: "",
        labelRequired: true
    }];


    const showWidget = () => {
        cloudinaryWidget.open();
    }
    const checkUploadResult = (resultEvent) => {
        if(resultEvent.event === "success") {
            setAccountImg(resultEvent.info.url);
        }
    }

    const handleInputChange = (event, index) => {

        const inputs = [...inputsValues];
        inputs[index] = event.target.value;
        setInputsValues(inputs);
    }
    const handleDropdownChange = (e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        setIncomeSource(value);
        console.log(value)
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
            if (incomeSource !== "Select the income source:" && incomeSource) {
                if (inputsValues[3] === inputsValues[4]) {
                    if (accountImg.length > 0) {

                            let user = {
                                fullName: inputsValues[0],
                                id: inputsValues[1],
                                photoId: accountImg,
                                incomeSource: incomeSource[0],
                                email: inputsValues[2],
                                password: inputsValues[3]
                            }
                            console.log("Submitted user: ", user);
                            const requestOptions = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(user)
                            };
                            fetch(`https://project-3-backend-daniel.herokuapp.com/users/signup`, requestOptions)
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    navigate("/login");
        
                                })

                    } else {
                        setError("form__error--show");
                        setErrorInfo("Must select a profile picture");
                    }

                } else {
                    setError("form__error--show");
                    setErrorInfo("Passwords must be the same");
                }
            } else {
                setError("form__error--show");
                setErrorInfo("Must select an income source");
            }

        } else {
            setError("form__error--show");
            setInputsErrors(errorsInputs);
        }

    }


    return (
        <div className="form__root">
            <div className="form__cnt form__info__cnt">
                <h1 className="form__info__title">Create account</h1>
                <div className={`form__error form__error--left-space ${error}`}>
                    <div className="form__error__box">
                        <i className='fas fa-exclamation-circle form__error--icon'></i><p className="form__error--text">{errorInfo}</p>
                    </div>
                </div>

            </div>
            <form className="form__form" onSubmit={handleSubmit}>
                <div className="form__form__cnt">
                    {formInfo.map((input, index) => <FormInput key={index} inputInfo={input} handleInputChange={handleInputChange} index={index} errorSubmit={inputsErrors} />
                    )}

                </div>
                <div className="form__form__cnt">
                    <select value={incomeSource} onChange={handleDropdownChange}>
                        <option defaultValue disabled>Select the income source:</option>
                        <option value={"Employed"}>Employed</option>
                        <option value={"Business Owner"}>Business Owner</option>
                        <option value={"Self-Employed"}>Self-Employed</option>
                        <option value={"Retired"}>Retired</option>
                        <option value={"Investor"}>Investor</option>
                        <option value={"Other"}>Other</option>
                    </select>
                </div>

                <div className="form__form__cnt form__form__cnt-img">
                <label className="form__label" htmlFor={"form-img"} >Select a profile picture</label>
                    <button id="form-img" aria-labelledby="form-img" type="button" onClick={showWidget} >Upload photo</button>
                    {accountImg.length > 0 && <img src={accountImg} alt={"Profile"} className="form__form__img" />}
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


Signup.propTypes = {
    getInfo: PropTypes.func,
}

export default Signup;