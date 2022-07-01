import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Dashboard from "../Dashboard/Dashboard";
import DashboardMenu from "../DashboardMenu/DashboardMenu";
import Profile from "../Profile/Profile";
import AddMoney from "../AddMoney/AddMoney";
import MoneyTransfer from "../MoneyTransfer/MoneyTransfer";
import Services from "../Services/Services";
import AccountHistory from "../AccountHistory/AccountHistory";
import useFetch from "../hooks/useFetch";

const BankHome = (props) => {
    const { container } = props;

    const userEmail = localStorage.getItem("userLoggedEmail");
    let token = localStorage.getItem("JWT");
    if(token) {
        token = token.replace(/^"(.+(?="$))"$/, '$1');
    }
    const userInfo = useFetch(`https://project-3-backend-daniel.herokuapp.com/users/${userEmail}`,true);
    console.log(token);
    if(token) {
        if (token.length === 0 || token === null || token ==="Token not valid" ||userInfo === "Token not valid") {
            
        } else {
            return (
                <div className="bank-home">
                    <DashboardMenu />
                    {userEmail}
                    <div className="bank-home__info">
                        {container === "Dashboard" &&
                            <div className="bank-home__cnt" >
                                <Dashboard />
                            </div>
    
                        }
                        {container === "Profile" &&
                            <div className="bank-home__cnt" >
                                <Profile />
                            </div>
    
                        }
                        {container === "AddMoney" &&
                            <div className="bank-home__cnt" >
                                <AddMoney />
                            </div>
                        }
                        {container === "MoneyTransfer" &&
                            <div className="bank-home__cnt" >
                                <MoneyTransfer />
                            </div>
                        }
                        {container === "Services" &&
                            <div className="bank-home__cnt" >
                                <Services />
                            </div>
                        }
                        {container === "AccountHistory" &&
                            <div className="bank-home__cnt" >
                                <AccountHistory />
                            </div>
                        }
    
                    </div>
    
                </div>
            );
        }
    } else {
        return (
            <div className="bank-home__error__root">
                <h1>Not logged in</h1>
                <Link to={"/"}>Go home</Link>
            </div>
        );
    }
}

export default BankHome;
