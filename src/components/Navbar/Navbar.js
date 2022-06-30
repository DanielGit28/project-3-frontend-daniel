import { useEffect, useState, useRef } from "react";
import { AiOutlineMenu, AiOutlineInstagram, AiOutlineFacebook, AiOutlineTwitter } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { Link } from "react-router-dom";
import useBreakpoint from '../hooks/useBreakpoint';

const Navbar = (props) => {
    const { navOpen, container } = props;
    const [isNavOpen, setIsNavOpen] = useState(navOpen);
    const navInfo = useRef(null);
    const navRoot = useRef(null);
    const navLogo = useRef(null);
    const navLogin = useRef(null);
    const navSignup = useRef(null);
    const [breakPoint] = useBreakpoint();

    const navOnClick = (close) => {
        if (close === true) {
            setIsNavOpen(true);
            if (breakPoint[0] > 768) {
                navInfo.current.classList.add("slide-in-40");
                navInfo.current.classList.remove("slide-out-40");
            } else {
                navInfo.current.classList.add("slide-in-100");
                // navInfo.current.classList.add("position-absolute");
                navInfo.current.classList.remove("slide-out-100");
            }
            navRoot.current.classList.add("add-opacity-background");
            navRoot.current.classList.remove("remove-opacity-background");

        } else {
            setIsNavOpen(false);
            if (breakPoint[0] > 768) {
                navInfo.current.classList.remove("slide-in-100");
                navInfo.current.classList.remove("slide-out-100");

                navInfo.current.classList.remove("slide-in-40");
                navInfo.current.classList.add("slide-out-40");
            } else {
                console.log("Not open remove 40");
                navInfo.current.classList.remove("slide-in-40");
                navInfo.current.classList.remove("slide-out-40");

                navInfo.current.classList.remove("slide-in-100");
                //navInfo.current.classList.remove("position-absolute");
                navInfo.current.classList.add("slide-out-100");
            }
            navRoot.current.classList.remove("add-opacity-background");
            navRoot.current.classList.add("remove-opacity-background");
        }
    }

    useEffect(() => {

        if (navOpen) {
            console.log("Effect open");
            setIsNavOpen(false);
        }
        if (breakPoint[0] > 768) {
            navInfo.current.classList.add("width-40");
            navInfo.current.classList.remove("position-absolute");
            if(isNavOpen) {
                navRoot.current.classList.add("add-opacity-background");
            }
            
        } else {
            navInfo.current.classList.remove("slide-in-40");
                navInfo.current.classList.remove("slide-out-40");
            navInfo.current.classList.remove("width-40");
            navInfo.current.classList.add("position-absolute");
            if(!isNavOpen) {
                navRoot.current.classList.remove("add-opacity-background");
                //navInfo.current.classList.remove("slide-out-40");
            }
            if(isNavOpen) {
                navRoot.current.classList.remove("add-opacity-background");
                navInfo.current.classList.add("slide-in-100");
            }
        }

        

        //Active links
        if (container === "Home") {
            navLogo.current.classList.add("beige-active-underline");
            navLogin.current.classList.remove("beige-active-underline");
            navSignup.current.classList.remove("beige-active-underline");
        } else if (container === "Login") {
            navLogo.current.classList.remove("beige-active-underline");
            navLogin.current.classList.add("beige-active-underline");
            navSignup.current.classList.remove("beige-active-underline");
        } else if (container === "Signup") {
            navLogo.current.classList.remove("beige-active-underline");
            navLogin.current.classList.remove("beige-active-underline");
            navSignup.current.classList.add("beige-active-underline");
        }
    }, [navOpen, breakPoint, navLogo, container,isNavOpen]);

    return (
        <div className="nav__root" ref={navRoot}>
            <div className="nav__cnt-activate">
                <div className="nav__cnt-activate__icon-cnt">
                    {isNavOpen &&
                        <button className="nav__cnt-activate__icon-cnt" onClick={() => { navOnClick(false) }} >
                            <IoMdClose className="nav__cnt-activate__icon" />
                        </button>
                    }
                    {isNavOpen === false &&
                        <button className="nav__cnt-activate__icon-cnt" onClick={() => { navOnClick(true) }}>
                            <AiOutlineMenu className="nav__cnt-activate__icon" />
                        </button>
                    }
                </div>
            </div>
            <div className="nav__cnt-open" ref={navInfo}>
                <div className="nav__cnt-open__info">
                    <header className="nav__cnt-open__header">
                        <Link to={"/"} ref={navLogo} onClick={() => { navOnClick(false) }} className="nav__cnt-open__links--link" ><p className="nav__cnt-open__logo">Konrad Bank</p></Link>

                    </header>
                    <div className="nav__cnt-open__links-cnt">
                        <ul className="nav__cnt-open__links">
                            <li>
                                <Link to={"/login"} ref={navLogin} onClick={() => { navOnClick(false) }} className="nav__cnt-open__links--link" >Login</Link>
                            </li>
                            <li>
                                <Link to={"/signup"} ref={navSignup} onClick={() => { navOnClick(false) }} className="nav__cnt-open__links--link" >Signup</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="nav__cnt-open__social-links-cnt">
                        <ul className="nav__cnt-open__social-links">
                            <li>
                                <a href={"https://www.instagram.com/konradgroup/"} className="nav__cnt-open__social-links--link" ><AiOutlineInstagram /></a>
                            </li>
                            <li>
                                <a href={"https://www.facebook.com/konradgroup/"} className="nav__cnt-open__social-links--link" ><AiOutlineFacebook /></a>
                            </li>
                            <li>
                                <a href={"https://twitter.com/konradgroup"} className="nav__cnt-open__social-links--link" ><AiOutlineTwitter /></a>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Navbar;