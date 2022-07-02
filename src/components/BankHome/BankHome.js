import { useState, useEffect, createContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import Dashboard from "../Dashboard/Dashboard";
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

    const userEmail = localStorage.getItem("userLoggedEmail");
    let token = localStorage.getItem("JWT");
    if (token) {
        token = token.replace(/^"(.+(?="$))"$/, '$1');
    }
    const userInfo = useFetch(`https://project-3-backend-daniel.herokuapp.com/users/${userEmail}`, true);
    console.log(token);

    const menuState = (state) => {
        if (state) {
            setIsMenuOpen(true);
        } else {
            setIsMenuOpen(false);
        }
    }

    console.log(container)
    if (token) {
        if (token.length === 0 || token === null || token === "Token not valid" || userInfo === "Token not valid") {
            return (
                <div className="bank-home__error__root">
                    <h1>Not logged in</h1>
                    <Link to={"/"}>Go home</Link>
                </div>
            );
        } else {
            return (
                <BreakpointContext.Provider value={{ breakPoint: breakPoint }}>
                    <div className="bank-home__nav__root">
                        <div className="bank-home__nav-menu">
                            {isMenuOpen &&
                                <button className="bank-home__nav-menu__btn" onClick={() => { menuState(false) }} >
                                    <AiOutlineClose className="bank-home__nav-menu__icon" />
                                </button>
                            }
                            {isMenuOpen === false &&
                                <button className="bank-home__nav-menu__btn" onClick={() => { menuState(true) }}>
                                    <AiOutlineBars className="bank-home__nav-menu__icon" />
                                </button>
                            }
                        </div>
                        <div className="bank-home__nav-home">
                            <nav className="bank-home__nav-home__nav">
                                <Link to={"/bank-home"} className="bank-home__nav-home__link">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="kg-logo__k bank-home__nav-home__link-in"  viewBox="0 0 183.78667 184.03999">
                                        <path className="kg-logo__k__fill bank-home__nav-home__link-in" d="M0 0v48.47l67.68 67.77 67.7 67.8h48.4L91.89 92 0 0M0 116.68v67.36h67.36l-33.68-33.68L0 116.68M67.97 0l50.52 50.51L169 0z"></path>
                                    </svg>
                                </Link>
                                <p className="bank-home__nav-home__link-text">Konrad Bank</p>
                            </nav>
                        </div>
                    </div>
                    <div className="bank-home">
                        <DashboardMenu menuState={menuState} />

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
