import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [formUserName, setFormUserName] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage1, setErrorMessage1] = useState("Username and/or password invalid!");
    const [errorMessage2, setErrorMessage2] = useState("");
    const navigate = useNavigate();

    const userNameInp = useRef(null);
    const passwordInp = useRef(null);

    const handleChangeInputs = (value, e) => {
        if (value === "username") {
            setFormUserName(e.target.value);
        } else if (value === "password") {
            setFormPassword(e.target.value);
        }
    }
    //Full submit
    let handleSubmit = (event) => {
        event.preventDefault();
        let loginInfo = { username: formUserName, password: formPassword };
        const requestOptions = {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(loginInfo)
        };
        //Validate email field
        if(formUserName.length === 0) {
            setError(true);
            setErrorMessage1("Username field is required!");
        } else {
            setError(false);
            setErrorMessage1("");
            
        }
        //Validate password field
        if(formPassword.length === 0) {
            setError(true);
            setErrorMessage2("Password field is required!");
        } else {
            setError(false);
            setErrorMessage2("");
        }

        if(formUserName.length > 0 && formPassword.length > 0) {
            fetch('http://project-3-backend-daniel.herokuapp.com/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(loginInfo)
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login made:  ", data);
                
                if(data.error === "Invalid Password" || data.error === "User not found" || data.error === "Login not valid") {
                    setError(true);
                    setErrorMessage2("");
                    setErrorMessage1("Username and/or password invalid!");
                } else {
                    setError(false);
                    localStorage.setItem("JWT", JSON.stringify(data));
                    //navigate("/bank-home");
                }
                
            });
        }
    }

    return (
        <div className="login__root">
            <div className="login__cnt login__cnt--left">
                <div className="login__sub-cnt login__sub-cnt--left">
                    <i className="login__sub-cnt__icon"></i>
                    <h1 className="login__sub-cnt__title">Konrad Bank</h1>

                </div>
            </div>
            <div className="login__cnt login__cnt--right">
                <form onSubmit={(event) => { handleSubmit(event) }} className="login__sub-cnt login__sub-cnt--right">

                    <h2 className="login__sub-cnt__subtitle">Login</h2>
                
                    {error &&<div className="login__sub-cnt__error">
                        <p className="login__sub-cnt__error--text">{errorMessage1}</p>
                        <p className="login__sub-cnt__error--text">{errorMessage2}</p>
                    </div>}
                    <div className="login__sub-cnt__cnt">
                        <label className="login__sub-cnt__lbl" htmlFor="login_username" >Username</label>
                        <input ref={userNameInp} type={"text"} className="login__sub-cnt__inp" name="login_username" id="login_username" placeholder="d@gmail.com" value={formUserName || ""} onChange={e => handleChangeInputs("username", e)} />
                    </div>

                    <div className="login__sub-cnt__cnt">
                        <label className="login__sub-cnt__lbl" htmlFor="login_password">Password</label>
                        <input ref={passwordInp} type={"text"} className="login__sub-cnt__inp" name="login_password" id="login_password" value={formPassword || ""} onChange={e => handleChangeInputs("password", e)} />
                    </div>


                    <button className="login__sub-cnt__submit" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;