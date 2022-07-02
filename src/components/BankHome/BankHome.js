import { useState, useEffect, createContext, useRef } from "react";
import { Link } from "react-router-dom";

import Dashboard from "../Dashboard/Dashboard";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import DashboardMenu from "../DashboardMenu/DashboardMenu";
import Profile from "../Profile/Profile";
import AddMoney from "../AddMoney/AddMoney";
import MoneyTransfer from "../MoneyTransfer/MoneyTransfer";
import Services from "../Services/Services";
import AccountHistory from "../AccountHistory/AccountHistory";

import useFetch from "../hooks/useFetch";
import useBreakpoint from "../hooks/useBreakpoint";
export const BreakpointContext = createContext({ breakPoint: null });


const BankHome = (props) => {
    const { container } = props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [breakPoint] = useBreakpoint();
    const openMenu = useRef(null);
    const [showOpenMenu, setShowOpenMenu] = useState(false);

    const userEmail = localStorage.getItem("userLoggedEmail");
    let token = localStorage.getItem("JWT");
    if (token) {
        token = token.replace(/^"(.+(?="$))"$/, '$1');
    }
    const userInfo = useFetch(`https://project-3-backend-daniel.herokuapp.com/users/${userEmail}`, true);


    const menuState = (state) => {
        if (state) {
            setIsMenuOpen(true);
        } else {
            setIsMenuOpen(false);
        }
    }


    if (token) {
        if (token.length === 0 || token === null || token === "Token not valid" || userInfo.data === "Token not valid") {
            return (
                <div className="bank-home__error__root">
                    <h1>Not logged in</h1>
                    <Link to={"/"}>Go home</Link>
                </div>
            );
        } else {
            return (
                <BreakpointContext.Provider value={{ breakPoint: breakPoint }}>
                    <DashboardMenu menuState={menuState} isMenuOpen={isMenuOpen}/>
                    <NavbarDashboard menuState={menuState} userEmail={userEmail} isMenuOpen={isMenuOpen}/>
                    
                    <div className="bank-home">


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
                </BreakpointContext.Provider >
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
