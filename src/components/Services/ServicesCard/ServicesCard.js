import { useState } from "react";

const ServicesCard = (props) => {
    //isSelected determines if to show the form for the category service selected
    const {  serviceTitle, serviceInfo, isSelected } = props;
    const [serviceIcon, setServiceIcon] = useState(null);

    useEffect(() => {
        if(serviceTitle === "Common services") {

        } else if(serviceTitle === "Insurances") {
            
        } else if(serviceTitle === "Permits") {
            
        } else if(serviceTitle === "Digital services") {
            
        }
    },[])

    return (
        <div className="service-card__root">
            <div className="servie-card__info">
                <div className="service-card__cnt service-card__cnt--left">
                    {serviceIcon}
                </div>
                <div className="service-card__cnt service-card__cnt--right">

                </div>
            </div>
            <div className="service-card__form">
                {isSelected && "Form"}
            </div>


        </div>
    );
}

export default ServicesCard;