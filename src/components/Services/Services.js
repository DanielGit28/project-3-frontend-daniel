import { useState } from "react";
import ServicesCard from "./ServicesCard/ServicesCard";

const Services = () => {
    const [onlyOneCard, setOnlyOneCard] = useState(false);
    const [onlyCardIndex, setOnlyCardIndex] = useState(null);

    const services = [
        {
            serviceTitle: "Common services",
            serviceInfo: "Like electricity and water"
        },
        {
            serviceTitle: "Insurances",
            serviceInfo: "Health insurance, Work insurance, Car insurance"
        },
        {
            serviceTitle: "Permits",
            serviceInfo: "Annual driving permit"
        },
        {
            serviceTitle: "Digital services",
            serviceInfo: "Phone, internet and digital TV"
        }
    ]

    const handlerOnlyOneCard = (state, index) => {
        if(state === true) {
            setOnlyOneCard(true);
            setOnlyCardIndex(index)
        } else {
            setOnlyOneCard(false);
            setOnlyCardIndex(null);
        }
    }

    return(
        <div className="services__root">
            {services.map((service, index) => {
                if(onlyOneCard === true) {
                    if(index === onlyCardIndex) {
                        return <ServicesCard key={index} serviceTitle={service.serviceTitle} serviceInfo={service.serviceInfo} index={index} handlerOnlyOneCard={handlerOnlyOneCard}/>;
                    }
                } else {
                    if(index === 2 || index === 3) {
                        return <ServicesCard key={index} serviceTitle={service.serviceTitle} serviceInfo={service.serviceInfo} special={true} index={index} handlerOnlyOneCard={handlerOnlyOneCard} />;
                    } else {
                        return <ServicesCard key={index} serviceTitle={service.serviceTitle} serviceInfo={service.serviceInfo} index={index} handlerOnlyOneCard={handlerOnlyOneCard}/>;
                    }
                }
            })}
            
        </div>
    );
}

export default Services;