import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
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
    const [activeLink, setActiveLink] = useState("Home");
    const homeLink = useRef(null);
    const profileLink = useRef(null);
    const addFundsLink = useRef(null);
    const transferFundsLink = useRef(null);
    const servicesLink = useRef(null);
    const historyLink = useRef(null);
    const userEmail = localStorage.getItem("userLoggedEmail");
    

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
            profileLink.current.classList.remove("active-dash-link");
            addFundsLink.current.classList.remove("active-dash-link");
            transferFundsLink.current.classList.remove("active-dash-link");
            servicesLink.current.classList.remove("active-dash-link");
            historyLink.current.classList.remove("active-dash-link");
            if (activeLink === "Home") {
                homeLink.current.classList.add("active-dash-link");
            } else if (activeLink === "Profile") {
                profileLink.current.classList.add("active-dash-link");
            } else if (activeLink === "AddFunds") {
                addFundsLink.current.classList.add("active-dash-link");
            } else if (activeLink === "TransferMoney") {
                transferFundsLink.current.classList.add("active-dash-link");
            } else if (activeLink === "Services") {
                servicesLink.current.classList.add("active-dash-link");
            } else if (activeLink === "AccountHistory") {
                historyLink.current.classList.add("active-dash-link");
            }
        }

    }, [isMenuOpen, bankContext, activeLink, loading]);

    if (!loading) {
        return (
            <div ref={menuRoot} className="dash-menu__root">
                <div className="dash-menu__cnt dash-menu__cnt--links">
                    <Link ref={profileLink} to={"/bank-home/profile"} onClick={() => { dashLinkClick(false, "Profile") }} className="dash-menu__opt-cnt" >
                        <img src={userInfo.photoId} alt="Profile" className="dash-menu__opt-cnt__img" />
                        <p className="dash-menu__opt-cnt__text">{userInfo.fullName}</p>
                    </Link>
                    <Link ref={homeLink} to={"/bank-home"} onClick={() => { dashLinkClick(false, "Home") }} className="dash-menu__opt-cnt" >
                        <IoMdHome className="dash-menu__opt-cnt__icon" />
                        <p className="dash-menu__opt-cnt__text">Home</p>
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
                <div ref={menuBackgroundCnt} className="dash-menu__cnt dash-menu__cnt--background">

                </div>

            </div>
        );
    }
}

export default DashboardMenu;