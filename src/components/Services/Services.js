import { useState, useEffect, useRef } from "react";
import ServicesCard from "./ServicesCard/ServicesCard";

const Services = (props) => {
    const {isMenuOpen} = props;
    const [onlyOneCard, setOnlyOneCard] = useState(false);
    const [onlyCardIndex, setOnlyCardIndex] = useState(null);
    const [servicesInfo, setServicesInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const serviceCard = useRef(null);

    const userEmail = localStorage.getItem("userLoggedEmail");
    let token = localStorage.getItem("JWT");
    if (token) {
        token = token.replace(/^"(.+(?="$))"$/, '$1');
    }

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

    useEffect(() => {
        setLoading(true);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        };
        fetch(`https://project-3-backend-daniel.herokuapp.com/services/user/${userEmail}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                setServicesInfo(data);
                setLoading(false);
            })

    }, [token, userEmail]);

    useEffect(() => {
        if (loading === false) {
            if (isMenuOpen) {
                serviceCard.current.classList.add("z-index-minus-1");
            } else {
                serviceCard.current.classList.remove("z-index-minus-1");
            }
        }
    }, [isMenuOpen, loading])


    if(loading === false) {
        return (
            <div ref={serviceCard} className="services__root">
                {services.map((service, index) => {
    
                    if (servicesInfo.length > 0) {
                        let serviceClear = true;
                        let remainingServices = [];
                        //Destructures the services info array into only an array of string of the service types
                        const servicesInfoTypes = servicesInfo.map(({serviceType}) => (serviceType));
                        //Compares if arr is contained in target
                        let checker = (arr, target) => target.every(v => arr.includes(v));
                        if (checker( servicesInfoTypes, service.serviceTypes) === true) {
                            serviceClear = false;
                        } else {
                            for (let j = 0; j < service.serviceTypes.length; j++) {
                                if(!servicesInfo.find(e => e.serviceType === service.serviceTypes[j])) {
                                    if (remainingServices.find(e => e === service.serviceTypes[j])) {
                                        console.log( "Service found.");
                                    } else {
                                        remainingServices.push(service.serviceTypes[j]);
                                    }
                                }
                            }
                        }
                        
                        if (serviceClear === true) {
                            if (onlyOneCard === true) {
                                if (index === onlyCardIndex) {
                                    return <ServicesCard key={index} serviceTitle={service.serviceTitle} serviceInfo={service.serviceInfo} index={index} handlerOnlyOneCard={handlerOnlyOneCard} serviceTypes={remainingServices} />;
                                }
                            } else {
                                if (index === 2 || index === 3) {
                                    return <ServicesCard key={index} serviceTitle={service.serviceTitle} serviceInfo={service.serviceInfo} special={true} index={index} handlerOnlyOneCard={handlerOnlyOneCard} serviceTypes={remainingServices} />;
                                } else {
                                    return <ServicesCard key={index} serviceTitle={service.serviceTitle} serviceInfo={service.serviceInfo} index={index} handlerOnlyOneCard={handlerOnlyOneCard} serviceTypes={remainingServices} />;
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
                                return <ServicesCard key={index} serviceTitle={service.serviceTitle} serviceInfo={service.serviceInfo} special={true} index={index} handlerOnlyOneCard={handlerOnlyOneCard} serviceTypes={service.serviceTypes} />;
                            } else {
                                return <ServicesCard key={index} serviceTitle={service.serviceTitle} serviceInfo={service.serviceInfo} index={index} handlerOnlyOneCard={handlerOnlyOneCard} serviceTypes={service.serviceTypes} />;
                            }
                        }
                    }
                })}
    
            </div>
        );
    }
}

export default Services;