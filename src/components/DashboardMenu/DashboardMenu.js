import { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { BiTransfer } from "react-icons/bi";
import { RiRefund2Fill } from "react-icons/ri";
import { MdMiscellaneousServices } from "react-icons/md";
import { AiOutlineHistory } from "react-icons/ai";
import { BankContext } from "../BankHome/BankHome";


const DashboardMenu = (props) => {
    const { menuState, isMenuOpen } = props;
    const menuRoot = useRef(null);
    const menuBackgroundCnt = useRef(null);
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
    const homeLink = useRef(null);
    const addFundsLink = useRef(null);
    const transferFundsLink = useRef(null);
    const servicesLink = useRef(null);
    const historyLink = useRef(null);

    const dashLinkClick = (state, link) => {
        menuState(state);
        setActiveLink(link);
    }

    let token = localStorage.getItem("JWT");
    if (token) {
        token = token.replace(/^"(.+(?="$))"$/, '$1');
    }
    const bankContext = useContext(BankContext);
    const [userInfo, setUserInfo] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (bankContext.userInfo.loading === false) {
            setLoading(false);
            //console.log(userInfo);
            setUserInfo(bankContext.userInfo.data);
        }
    }, [bankContext]);

    useEffect(() => {

        if (!loading) {
            //animations
            if (bankContext.breakPoint[0] < 768) {
                if (isMenuOpen) {
                    menuRoot.current.classList.add("slide-in-100");
                    menuRoot.current.classList.remove("slide-out-100");
                } else {
                    menuRoot.current.classList.remove("slide-in-100");
                    menuRoot.current.classList.add("slide-out-100");
                }
            } else {
                menuRoot.current.classList.remove("slide-out-100");
                menuRoot.current.classList.remove("slide-in-100");
            }

            //Links
            homeLink.current.classList.remove("active-dash-link");
            homeLink.current.classList.remove("active-dash-link");

            addFundsLink.current.classList.remove("active-dash-link");
            transferFundsLink.current.classList.remove("active-dash-link");
            servicesLink.current.classList.remove("active-dash-link");
            historyLink.current.classList.remove("active-dash-link");
            if (activeLink === "Home" || activeLink === "/bank-home/") {
                homeLink.current.classList.add("active-dash-link");
            } else if (activeLink === "AddFunds"|| activeLink === "/bank-home/add-money") {
                addFundsLink.current.classList.add("active-dash-link");
            } else if (activeLink === "TransferMoney" || activeLink === "/bank-home/money-transfer") {
                transferFundsLink.current.classList.add("active-dash-link");
            } else if (activeLink === "Services" || activeLink === "/bank-home/services") {
                servicesLink.current.classList.add("active-dash-link");
            } else if (activeLink === "AccountHistory" || activeLink === "/bank-home/account-history") {
                historyLink.current.classList.add("active-dash-link");
            }
        }

    }, [isMenuOpen, bankContext, activeLink, loading, location]);

    if (!loading) {
        return (
            <nav ref={menuRoot} className="dash-menu__root" aria-label="Dashboard menu">
                <div className="dash-menu__cnt dash-menu__cnt--links">

                    <Link to={"/bank-home"} onClick={() => { dashLinkClick(false, "Home") }} ref={homeLink} className="dash-menu__opt-cnt">
                        <svg className="kg-logo__k dash-nav__nav-home__link-in" xmlns="http://www.w3.org/2000/svg" width="288" height="288" viewBox="0 0 183.787 184.04"><path d="M0 0v48.47l67.68 67.77 67.7 67.8h48.4L91.89 92 0 0M0 116.68v67.36h67.36l-33.68-33.68L0 116.68M67.97 0l50.52 50.51L169 0z" fill="#ffffff" className="k-logo"></path></svg>
                            <h1 className="dash-nav__nav-home__link-text">Konrad Bank</h1>
                    </Link>


                    <Link ref={addFundsLink} to={"/bank-home/add-money"} onClick={() => { dashLinkClick(false, "AddFunds") }} className="dash-menu__opt-cnt" >
                        <RiRefund2Fill className="dash-menu__opt-cnt__icon" />
                        <p className="dash-menu__opt-cnt__text">Add funds</p>
                    </Link>
                    <Link ref={transferFundsLink} to={"/bank-home/money-transfer"} onClick={() => { dashLinkClick(false, "TransferMoney") }} className="dash-menu__opt-cnt" >
                        <BiTransfer className="dash-menu__opt-cnt__icon" />
                        <p className="dash-menu__opt-cnt__text">Transfer money</p>
                    </Link>
                    <Link ref={servicesLink} to={"/bank-home/services"} onClick={() => { dashLinkClick(false, "Services") }} className="dash-menu__opt-cnt" >
                        <MdMiscellaneousServices className="dash-menu__opt-cnt__icon" />
                        <p className="dash-menu__opt-cnt__text">Services</p>
                    </Link>
                    <Link ref={historyLink} to={"/bank-home/account-history"} onClick={() => { dashLinkClick(false, "AccountHistory") }} className="dash-menu__opt-cnt" >
                        <AiOutlineHistory className="dash-menu__opt-cnt__icon" />
                        <p className="dash-menu__opt-cnt__text">Account History</p>
                    </Link>
                </div>
                

            </nav>
        );
    }
}

export default DashboardMenu;