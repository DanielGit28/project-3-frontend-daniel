import { useEffect, useState, useRef } from "react";
import { AiOutlineMenu, AiOutlineInstagram,AiOutlineFacebook,AiOutlineTwitter } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { Link } from "react-router-dom";

const Navbar = (props) => {
    const {navOpen} = props;
    console.log("Props: ",navOpen);
    const [isNavOpen, setIsNavOpen] = useState(navOpen);
    const navInfo = useRef(null);
    const navRoot = useRef(null);

    const navOnClick = (close) => {
        console.log(close);
        if(close === true) {
            setIsNavOpen(true);
            console.log("open");
            navInfo.current.classList.add("slide-in-100");
            navInfo.current.classList.remove("slide-out-100");
            /*
            navRoot.current.classList.add("add-opacity-background");
            navRoot.current.classList.remove("remove-opacity-background");
            */
        } else {
            setIsNavOpen(false);
            navInfo.current.classList.remove("slide-in-100");
            navInfo.current.classList.add("slide-out-100");
            /*
            navRoot.current.classList.remove("add-opacity-background");
            navRoot.current.classList.add("remove-opacity-background");
            */
        }
    }

    useEffect(() => {
        if(navOpen) {
            console.log("Effect open");
            setIsNavOpen(false);
        } 
    });

    return (
        <div className="nav__root" ref={navRoot}>
            <div className="nav__cnt-activate">
                <div className="nav__cnt-activate__icon-cnt">
                    {isNavOpen && 
                    <button className="nav__cnt-activate__icon" onClick={() => {navOnClick(false)}} > 
                        <IoMdClose />
                    </button>
                    }
                    {isNavOpen === false && 
                    <button className="nav__cnt-activate__icon" onClick={() => {navOnClick(true)}}>
                        <AiOutlineMenu />
                    </button>
                    }
                </div>
            </div>
                <div className="nav__cnt-open" ref={navInfo}>
                    <header className="nav__cnt-open__header">
                    <Link to={"/"} onClick={() => {navOnClick(false)}} className="nav__cnt-open__links--link" ><svg className="nav__cnt-open__logo">Logo</svg><p>Logo</p></Link>
                        
                    </header>
                    <div className="nav__cnt-open__links-cnt">
                        <ul className="nav__cnt-open__links">
                            <li>
                                <Link to={"/login"} onClick={() => {navOnClick(false)}} className="nav__cnt-open__links--link" >Login</Link>
                            </li>
                            <li>
                                <Link to={"/signup"} onClick={() => {navOnClick(false)}} className="nav__cnt-open__links--link" >Signup</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="nav__cnt-open__social-links-cnt">
                        <ul className="nav__cnt-open__social-links">
                            <li>
                                <Link to={"https://www.instagram.com/konradgroup/"} className="nav__cnt-open__social-links--link" ><AiOutlineInstagram /></Link>
                            </li>
                            <li>
                                <Link to={"https://www.facebook.com/konradgroup/"} className="nav__cnt-open__social-links--link" ><AiOutlineFacebook /></Link>
                            </li>
                            <li>
                                <Link to={"https://twitter.com/konradgroup"} className="nav__cnt-open__social-links--link" ><AiOutlineTwitter /></Link>
                            </li>
                        </ul>
                    </div>
                </div>
        </div>
    );
}

export default Navbar;