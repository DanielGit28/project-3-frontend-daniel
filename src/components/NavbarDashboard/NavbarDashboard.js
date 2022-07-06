import { useContext, useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { BankContext } from "../BankHome/BankHome";

const NavbarDashboard = (props) => {
    const { menuState, userEmail, isMenuOpen, isLogginOut } = props;

    const bankContext = useContext(BankContext);
    const [userInfo, setUserInfo] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (bankContext.userInfo.loading === false) {
            setLoading(false);
            setUserInfo(bankContext.userInfo.data);
        }
    }, [bankContext]);

    const logOutHandler = () => {
        localStorage.removeItem("JWT");
        localStorage.removeItem("userLoggedEmail");
        isLogginOut(true);
        const timeout = setTimeout(() => {
            navigate("/login")
        }, 1300);

        return () => clearTimeout(timeout);
    }

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
                <div className="dash-nav__nav-home__logout dash-nav__nav-home__cnt">

                    <a onClick={logOutHandler} className="dash-nav__nav-home__logout--link" >
                        <FiLogOut className="dash-nav__nav-home__logout--icon" />
                        <p className="dash-menu__opt-cnt__text dash-nav__nav-home__logout--text">Logout</p>
                    </a>


                </div>
                <div className=" dash-nav__nav-home__cnt">

                    <Link to={"/bank-home/profile"} className="dash-nav__nav-home__logout--link" >
                        <img src={userInfo.photoId} alt="Profile" className="dash-menu__opt-cnt__img" />
                        <p className="dash-menu__opt-cnt__text dash-nav__nav-home__logout--text">{userInfo.fullName}</p>
                    </Link>


                </div>
            </nav>
        </div>
    );
}

export default NavbarDashboard;