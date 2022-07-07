import { useState, useEffect } from "react";
import ServicesCard from "./ServicesCard/ServicesCard";

const Services = () => {
    const [onlyOneCard, setOnlyOneCard] = useState(false);
    const [onlyCardIndex, setOnlyCardIndex] = useState(null);
    const [servicesInfo, setServicesInfo] = useState("");
    const [loading, setLoading] = useState(true);
    const services = [
        {
            serviceTitle: "Common services",
            serviceInfo: "Like electricity and water",
            serviceTypes: ["Electricity", "Water"]
        },
        {
            serviceTitle: "Insurances",
            serviceInfo: "Health insurance, Work insurance, Car insurance",
            serviceTypes: ["Health insurance", "Work insurance", "Car insurance"]
        },
        {
            serviceTitle: "Permits",
            serviceInfo: "Annual driving permit",
            serviceTypes: ["Annual driving permit"]
        },
        {
            serviceTitle: "Digital services",
            serviceInfo: "Phone, internet and digital TV",
            serviceTypes: ["Phone", "Internet"]
        }
    ]

    const handlerOnlyOneCard = (state, index) => {
        if (state === true) {
            setOnlyOneCard(true);
            setOnlyCardIndex(index)
        } else {
            setOnlyOneCard(false);
            setOnlyCardIndex(null);
        }
    }

   
    return (
        <div className="services__root">
            {services.map((service, index) => {
                
                if (servicesInfo.length > 0) {
                    let serviceClear = true;
                    for (let i = 0; i < servicesInfo.length; i++) {
                        for (let j = 0; j < service.serviceTypes.length; j++) {
                            if (servicesInfo[i].serviceType === service.serviceTypes[j]) {
                                serviceClear = false;
                            }
                        }
                    }
                    if (serviceClear === true) {
                        if (onlyOneCard === true) {
                            if (index === onlyCardIndex) {
                                return <ServicesCard key={index} serviceTitle={service.serviceTitle} serviceInfo={service.serviceInfo} index={index} handlerOnlyOneCard={handlerOnlyOneCard} serviceTypes={service.serviceTypes}/>;
                            }
                        } else {
                            if (index === 2 || index === 3) {
                                return <ServicesCard key={index} serviceTitle={service.serviceTitle} serviceInfo={service.serviceInfo} special={true} index={index} handlerOnlyOneCard={handlerOnlyOneCard} serviceTypes={service.serviceTypes}/>;
                            } else {
                                return <ServicesCard key={index} serviceTitle={service.serviceTitle} serviceInfo={service.serviceInfo} index={index} handlerOnlyOneCard={handlerOnlyOneCard} serviceTypes={service.serviceTypes}/>;
                            }
                        }
                    }
                } else {
                    if (onlyOneCard === true) {
                        if (index === onlyCardIndex) {
                            return <ServicesCard key={index} serviceTitle={service.serviceTitle} serviceInfo={service.serviceInfo} index={index} handlerOnlyOneCard={handlerOnlyOneCard} serviceTypes={service.serviceTypes} />;
                        }
                    } else {
                        if (index === 2 || index === 3) {
                            return <ServicesCard key={index} serviceTitle={service.serviceTitle} serviceInfo={service.serviceInfo} special={true} index={index} handlerOnlyOneCard={handlerOnlyOneCard} serviceTypes={service.serviceTypes}/>;
                        } else {
                            return <ServicesCard key={index} serviceTitle={service.serviceTitle} serviceInfo={service.serviceInfo} index={index} handlerOnlyOneCard={handlerOnlyOneCard} serviceTypes={service.serviceTypes}/>;
                        }
                    }
                }
            })}

        </div>
    );
}

export default Services;