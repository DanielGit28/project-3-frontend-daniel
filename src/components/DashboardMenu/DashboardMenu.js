import { useState,useRef } from "react";
import { Link } from "react-router-dom";

const DashboardMenu = (props) => {
    const {menuState} = props;
    const menuStatus = (link,state) => {
        console.log(link)
        menuState(state);
    }
    return(
        <div className="dash-menu__root">
            <Link to={"/bank-home"} onClick={() => { menuStatus("home",false) }} className="dash-menu__cnt" >
                <p>Icon</p>
                <p>Home</p>
            </Link>
            <Link to={"/bank-home/profile"} onClick={() => { menuStatus("profile",false) }} className="dash-menu__cnt" >
                <p>Icon</p>
                <p>Profile</p>
            </Link>
            <Link to={"/bank-home/add-money"} onClick={() => { menuState(false) }} className="dash-menu__cnt" >
                <p>Icon</p>
                <p>Add money</p>
            </Link>
            <Link to={"/bank-home/money-transfer"} onClick={() => { menuState(false) }}  className="dash-menu__cnt" >
                <p>Icon</p>
                <p>Home</p>
            </Link>
            <Link to={"/bank-home/services"} onClick={() => { menuState(false) }} className="dash-menu__cnt" >
                <p>Icon</p>
                <p>Home</p>
            </Link>
            <Link to={"/bank-home/account-history"} onClick={() => { menuState(false) }} className="dash-menu__cnt" >
                <p>Icon</p>
                <p>Account History</p>
            </Link>
           
        </div>
    );
}

export default DashboardMenu;