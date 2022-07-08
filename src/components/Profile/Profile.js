import { useEffect, useState, useContext, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { BankContext } from "../BankHome/BankHome";
import { HiOutlineMail, HiOutlineIdentification } from "react-icons/hi";
import { MdAttachMoney } from "react-icons/md";

const Profile = (props) => {
    const { isMenuOpen } = props;
    const [loading, setLoading] = useState(true);
    const bankContext = useContext(BankContext);
    const [userInfo, setUserInfo] = useState("");
    const imgCnt = useRef(null);

    useEffect(() => {
        if (bankContext.userInfo.loading === false) {
            setLoading(false);

            setUserInfo(bankContext.userInfo.data);
        }
    }, [bankContext]);


    useEffect(() => {
        if (loading === false) {
            if (isMenuOpen) {
                imgCnt.current.classList.add("z-index-minus-1");
            } else {
                const timeout = setTimeout(() => {
                    imgCnt.current.classList.remove("z-index-minus-1");
                }, 600);

                return () => clearTimeout(timeout);

            }
        }
    }, [isMenuOpen, loading])

    if (loading === false) {
        return (
            <div className="profile__root">
                <div ref={imgCnt} className="profile__cnt profile__cnt__img">
                    <img src={userInfo.photoId} className="profile__img" alt="User profile"/>
                </div>
                <div className="profile__card__cnt">
                    <div className="profile__card__sub-cnt">

                    </div>
                    <div className="profile__card__sub-cnt profile__card__sub-cnt--info">
                        <div className="profile__card__info">
                            <CgProfile className="profile__card__info--icon" />
                            <p className="profile__card__info--text">{userInfo.fullName}</p>
                        </div>
                        <div className="profile__card__info">
                            <HiOutlineMail className="profile__card__info--icon" />
                            <p className="profile__card__info--text">{userInfo.email}</p>
                        </div>
                        <div className="profile__card__info">
                            <HiOutlineIdentification className="profile__card__info--icon" />
                            <p className="profile__card__info--text">{userInfo.id}</p>
                        </div>
                        <div className="profile__card__info">
                            <MdAttachMoney className="profile__card__info--icon" />
                            <p className="profile__card__info--text">{userInfo.incomeSource}</p>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Profile;