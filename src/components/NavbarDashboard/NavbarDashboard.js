import { useState, useEffect, createContext, useRef } from "react";
import {CgProfile} from "react-icons/cg";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const NavbarDashboard = (props) => {
    const {menuState,userEmail,isMenuOpen} = props;
    return (
        <div className="dash-nav__nav__root">
            
                <div className="dash-nav__nav-menu">
                    {isMenuOpen &&
                        <button className="dash-nav__nav-menu__btn" onClick={() => { menuState(false) }} >
                            <AiOutlineClose className="dash-nav__nav-menu__icon" />
                        </button>
                    }
                    {isMenuOpen === false &&
                        <button className="dash-nav__nav-menu__btn" onClick={() => { menuState(true) }}>
                            <AiOutlineBars className="dash-nav__nav-menu__icon" />
                        </button>
                    }
                </div>
            
            <nav className="dash-nav__nav-home">
                <div className="dash-nav__nav-home__nav">
                    <Link to={"/dash-nav"} className="dash-nav__nav-home__link">
                        <svg xmlns="http://www.w3.org/2000/svg" className="kg-logo__k dash-nav__nav-home__link-in" viewBox="0 0 183.78667 184.03999">
                            <path className="kg-logo__k__fill dash-nav__nav-home__link-in" d="M0 0v48.47l67.68 67.77 67.7 67.8h48.4L91.89 92 0 0M0 116.68v67.36h67.36l-33.68-33.68L0 116.68M67.97 0l50.52 50.51L169 0z"></path>
                        </svg>
                        <p className="dash-nav__nav-home__link-text">Konrad Bank</p>
                    </Link>

                </div>
                <div className="dash-nav__nav-home__user">
                    <Link to={"/dash-nav"} className="dash-nav__nav-home__user-link">
                        <CgProfile className="dash-nav__nav-home__user-link--link" />
                        <p className="dash-nav__nav-home__user-link--text">{userEmail}</p>
                    </Link>

                </div>
            </nav>
        </div>
    );
}

export default NavbarDashboard;