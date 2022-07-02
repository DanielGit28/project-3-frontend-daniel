import { useState, useRef, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { BiTransfer } from "react-icons/bi";
import { RiRefund2Fill } from "react-icons/ri";
import { MdMiscellaneousServices } from "react-icons/md";
import { AiOutlineHistory } from "react-icons/ai";
import { BreakpointContext } from "../BankHome/BankHome";


const DashboardMenu = (props) => {
    const { menuState, isMenuOpen } = props;
    const menuRoot = useRef(null);
    const menuBackgroundCnt = useRef(null);
    const userEmail = localStorage.getItem("userLoggedEmail");
    const breakPoint = useContext(BreakpointContext);

    useEffect(() => {
        if (breakPoint.breakPoint[0] < 768) {
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
    }, [isMenuOpen,breakPoint]);

    return (
        <div ref={menuRoot} className="dash-menu__root">
            <div className="dash-menu__cnt dash-menu__cnt--links">
                <Link to={"/bank-home"} onClick={() => { menuState(false) }} className="dash-menu__opt-cnt" >
                    <IoMdHome />
                    <p>Home</p>
                </Link>
                <Link to={"/bank-home/profile"} onClick={() => { menuState(false) }} className="dash-menu__opt-cnt" >
                    <IoMdHome />
                    <p>{userEmail}</p>
                </Link>
                <Link to={"/bank-home/add-money"} onClick={() => { menuState(false) }} className="dash-menu__opt-cnt" >
                    <RiRefund2Fill />
                    <p>Add funds</p>
                </Link>
                <Link to={"/bank-home/money-transfer"} onClick={() => { menuState(false) }} className="dash-menu__opt-cnt" >
                    <BiTransfer />
                    <p>Transfer money</p>
                </Link>
                <Link to={"/bank-home/services"} onClick={() => { menuState(false) }} className="dash-menu__opt-cnt" >
                    <MdMiscellaneousServices />
                    <p>Services</p>
                </Link>
                <Link to={"/bank-home/account-history"} onClick={() => { menuState(false) }} className="dash-menu__opt-cnt" >
                    <AiOutlineHistory />
                    <p>Account History</p>
                </Link>
            </div>
            <div ref={menuBackgroundCnt} className="dash-menu__cnt dash-menu__cnt--background">

            </div>

        </div>
    );
}

export default DashboardMenu;