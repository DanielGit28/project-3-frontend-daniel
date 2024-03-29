import { useState, useEffect, useRef } from "react";
import { PropTypes } from "prop-types";
import FormInput from "../FormInput/FormInput";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

const Signup = (props) => {
    const { isNavOpen } = props;
    const [error, setError] = useState(""); // setError("form__error--show");
    const [inputsValues, setInputsValues] = useState(["", "", "", "", ""]);
    const [inputsErrors, setInputsErrors] = useState([]);
    const [errorInfo, setErrorInfo] = useState("Wrong or missing information. Check the information again.");

    const [accountImg, setAccountImg] = useState("");
    const [loadingImg, setLoadingImg] = useState(false);
    const imgUploadCnt = useRef(null);
    const submitBtn = useRef(null);
    const [incomeSource, setIncomeSource] = useState("Select the income source:");
    const navigate = useNavigate();
    const selectIncome = useRef(null);
    const uploadImgBtn = useRef(null);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [incomeError, setIncomeError] = useState(false);
    const [uploadImgError, setUploadImgError] = useState(false);

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
        customLabelClass: "signup__text",
        customCntClass: "form-input__root__double form-input__root__double--padd-right",
        labelRequired: true
    },
    {
        info: "Identification",
        id: "form-account-id",
        type: "text",
        placeholder: "111000222",
        errorInfo: "Enter a valid id",
        customClassInput: "",
        customLabelClass: "signup__text",
        customCntClass: "form-input__root__double form-input__root__double--padd-left",
        labelRequired: true
    }, {
        info: "Email",
        id: "form-account-email",
        type: "text",
        placeholder: "d@gmail.com",
        errorInfo: "Enter a valid email",
        customClassInput: "",
        customLabelClass: "signup__text",
        labelRequired: true
    }, {
        info: "Password",
        id: "form-personal-password",
        type: "password",
        placeholder: "",
        errorInfo: "Enter a valid password",
        customClassInput: "",
        customLabelClass: "signup__text",
        customCntClass: "form-input__root__double form-input__root__double--padd-right",
        labelRequired: true
    },
    {
        info: "Validate password",
        id: "form-personal-password-validation",
        type: "password",
        placeholder: "",
        errorInfo: "Enter the same password",
        customClassInput: "",
        customLabelClass: "signup__text",
        customCntClass: "form-input__root__double form-input__root__double--padd-left",
        labelRequired: true
    }];


    const uploadImg = (e) => {
        setLoadingImg(true);
        console.log(e.target.files[0]);
        const imgData = new FormData();
        imgData.append("file", e.target.files[0]);
        imgData.append("upload_preset", "qsos1wdv");
        console.log(imgData);

        fetch("https://api.cloudinary.com/v1_1/develop-daniel/image/upload", {
            method: "POST",
            body: imgData
        }).then(response => response.json())
            .then((data => {
                setAccountImg(data.url);
                setLoadingImg(false);
                setUploadImgError(false);
            }))
            .catch(err => console.log("Error: ", err));
    }

    const handleInputChange = (event, index) => {

        const inputs = [...inputsValues];
        inputs[index] = event.target.value;
        setInputsValues(inputs);
    }
    const handleDropdownChange = (e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        setIncomeSource(value);
        setIncomeError(false);
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
        if (incomeSource === "Select the income source:" && incomeSource) {
            setError("form__error--show");
            setIncomeError(true);
            setErrorInfo("Must select an income source");
            selectIncome.current.focus();
        } else {
            setIncomeError(false);
        }
        if (accountImg.length === 0) {
            setError("form__error--show");
            setUploadImgError(true);
            setErrorInfo("Must select a profile picture");
            uploadImgBtn.current.focus();
        } else {
            setUploadImgError(false);
        }
        if (formValidation === true) {
            if (incomeSource !== "Select the income source:" && incomeSource) {
                if (inputsValues[3] === inputsValues[4]) {
                    if (accountImg.length > 0) {
                        setLoadingSubmit(true);

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
                                const timeout = setTimeout(() => {
                                    setLoadingSubmit(false);
                                    navigate("/login");
                                }, 1500);
                
                                return () => clearTimeout(timeout);
                                

                            })

                    } else {
                        setError("form__error--show");
                        setUploadImgError(true);
                        setErrorInfo("Must select a profile picture");
                        uploadImgBtn.current.focus();
                    }

                } else {
                    setError("form__error--show");
                    setErrorInfo("Passwords must be the same");
                }
            } else {
                setError("form__error--show");
                setIncomeError(true);
                setErrorInfo("Must select an income source");
                selectIncome.current.focus();
            }

        } else {
            setError("form__error--show");
            setInputsErrors(errorsInputs);
            setErrorInfo("Wrong or missing information. Check the information again.");
        }


    }

    useEffect(() => {
        if (isNavOpen) {
            imgUploadCnt.current.classList.add("z-index-minus-1");
            submitBtn.current.classList.add("z-index-minus-1");
        } else {
            imgUploadCnt.current.classList.remove("z-index-minus-1");
            submitBtn.current.classList.remove("z-index-minus-1");
        }
    }, [isNavOpen])


    return (
        <div className="form__root signup__root">

            <div className="form__cnt form__info__cnt signup__cnt__title">
                <svg xmlns="http://www.w3.org/2000/svg" className="kg-logo__k signup__logo-svg" width="3rem" height="3rem" viewBox="0 0 183.78667 184.03999">
                    <path className="kg-logo__k__fill signup__logo-path" d="M0 0v48.47l67.68 67.77 67.7 67.8h48.4L91.89 92 0 0M0 116.68v67.36h67.36l-33.68-33.68L0 116.68M67.97 0l50.52 50.51L169 0z"></path>
                </svg>
                <h1 className="form__info__title ">Create account</h1>


            </div>
            <form className="form__form signup__form" onSubmit={handleSubmit}>
                {error.length > 0 && <div className={`error__error  signup__error`}>
                    
                    <p className="error__error--text">{errorInfo}</p>

                </div>}

                <div className="form__form__cnt form__form__cnt--row">
                    <FormInput key={0} inputInfo={formInfo[0]} handleInputChange={handleInputChange} index={0} errorSubmit={inputsErrors} />
                    <FormInput key={1} inputInfo={formInfo[1]} handleInputChange={handleInputChange} index={1} errorSubmit={inputsErrors} />

                </div>
                <div className="form__form__cnt ">
                    <FormInput key={2} inputInfo={formInfo[2]} handleInputChange={handleInputChange} index={2} errorSubmit={inputsErrors} />
                </div>
                <div className="form__form__cnt form__form__cnt--row">
                    <FormInput key={3} inputInfo={formInfo[3]} handleInputChange={handleInputChange} index={3} errorSubmit={inputsErrors} />
                    <FormInput key={4} inputInfo={formInfo[4]} handleInputChange={handleInputChange} index={4} errorSubmit={inputsErrors} />

                </div>
                <div className="form__form__cnt signup__label">
                <label className={`form__label signup__text`} htmlFor={"form-select-income-source"} >Income source</label>
                    <select ref={selectIncome} className={`form__form__select ${incomeError === true && "form__error--inp"}`} id="form-select-income-source" aria-labelledby="form-select-income-source" name="form-select-income-source" value={incomeSource} onChange={handleDropdownChange}>
                        <option defaultValue disabled>Select the income source:</option>
                        <option className="form__form__select-opt" value={"Employed"}>Employed</option>
                        <option className="form__form__select-opt" value={"Business Owner"}>Business Owner</option>
                        <option className="form__form__select-opt" value={"Self-Employed"}>Self-Employed</option>
                        <option className="form__form__select-opt" value={"Retired"}>Retired</option>
                        <option className="form__form__select-opt" value={"Investor"}>Investor</option>
                        <option className="form__form__select-opt" value={"Other"}>Other</option>
                    </select>
                </div>

                <div className="form__form__cnt signup__cnt__img">
                    <label className={`form__label signup__text signup__img__label ${uploadImgError === true && "signup__error--color"}`} htmlFor={"form-img"} >Select a profile picture</label>
                    {accountImg.length > 0 && <img src={accountImg} alt={"Profile"} className="signup__img__visualizer " />}
                    {accountImg.length === 0 && <CgProfile className="signup__img__loader" />}
                    <div className="signup__img__root">
                        <div ref={imgUploadCnt} className="signup__img__cnt">
                            <input ref={uploadImgBtn} type={"file"} id="form-img" aria-labelledby="form-img" onChange={e => uploadImg(e)} name="form-img" className="signup__img__inp" />
                            <FiUpload />
                        </div>

                    </div>

                </div>
                <div className="form__form__cnt signup__cnt__img form__submit">
                    <button ref={submitBtn} name="submit-btn" type="submit" className="form__form__btn signup__cnt__submit form__submit__btn">
                    {loadingSubmit === false && "Submit"}
                        {loadingSubmit === true && <ButtonLoader />}
                    </button>
                </div>

                <div className=" form__cnt form__cnt__login
                ">
                    <p className="form__cnt__login--text">Already have an account ? <Link to={"/login"} className="form__cnt__login--link form__cnt__login--text" >Login</Link></p>


                </div>
            </form>
        </div>
    );
}


Signup.propTypes = {
    getInfo: PropTypes.func,
}

export default Signup;