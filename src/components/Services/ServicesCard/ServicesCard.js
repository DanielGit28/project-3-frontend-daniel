import { useState, useEffect } from "react";
import { MdOutlineNetworkWifi, MdOutlineDataSaverOn, MdElectricalServices, MdWater } from "react-icons/md";
import { GrLicense } from "react-icons/gr";
import FormServices from "../../Forms/FormServices/FormServices";

const ServicesCard = (props) => {
    //isSelected determines if to show the form for the category service selected
    const { serviceTitle, serviceTypes, special, handlerOnlyOneCard, index } = props;
    const [serviceIcon, setServiceIcon] = useState(null);
    const [accountSelected, setAccountSelected] = useState("");
    const [loading, setLoading] = useState(false);
    const [accountsInfo, setAccountsInfo] = useState("");
    const [icon, setIcon] = useState(null);
    const [cardOpen, setCardOpen] = useState(false);
    const [cardHover, setCardHover] = useState(false);
    const userEmail = localStorage.getItem("userLoggedEmail");
    let token = localStorage.getItem("JWT");
    if (token) {
        token = token.replace(/^"(.+(?="$))"$/, '$1');
    }

    const handleCardClick = () => {
        if (cardOpen === true) {
            setCardOpen(false);
            handlerOnlyOneCard(false, index);
        } else {
            setCardOpen(true);
            handlerOnlyOneCard(true, index);
        }
    }








    return (
        <button className={`service-card__root ${cardOpen && "service-card__root--unique"}`}>
            <div className="service-card__info" onClick={handleCardClick}>
                <div className={`service-card__cnt service-card__cnt--left ${special && "service-card__cnt--left-special"} ${cardOpen && "service-card__cnt-special"}`}>
                    <div className="service-card__cnt-sub">
                        {serviceTitle === "Common services" && <MdElectricalServices className={`service-card__icon ${special && "service-card__icon--special"}`} />}
                        {serviceTitle === "Common services" && <MdWater className={`service-card__icon ${special && "service-card__icon--special"}`} />}
                        {serviceTitle === "Insurances" && <MdOutlineDataSaverOn className={`service-card__icon ${special && "service-card__icon--special"}`} />}
                        {serviceTitle === "Permits" && <GrLicense className={`service-card__icon ${special && "service-card__icon--special-key"}`} />}
                        {serviceTitle === "Digital services" && <MdOutlineNetworkWifi className={`service-card__icon ${special && "service-card__icon--special"}`} />}
                    </div>

                </div>
                <div className={`service-card__cnt service-card__cnt--right ${special && "service-card__cnt--right-special"}`}>
                    <div className="service-card__cnt-sub">
                        <p className={`service-card__info__text ${special && "service-card__info__text--special"}`}>{serviceTitle}</p>
                    </div>
                </div>
            </div>

            <div className={`service-card__form  `}>
                <FormServices cardOpen={cardOpen} serviceTitle={serviceTitle} serviceTypes={serviceTypes} />
            </div>


        </button>
    );
}


export default ServicesCard;