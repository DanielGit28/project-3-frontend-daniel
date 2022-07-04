import { useEffect, useState } from "react";
import { BankContext } from "../BankHome/BankHome";
import useFetch from "../hooks/useFetch";
import DashboardCard from "../DashboardCard/DashboardCard";

const Dashboard = (props) => {
    const { userEmail } = props;
    const [accountsInfo, setAccountsInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    let token = localStorage.getItem("JWT");
    if (token) {
        token = token.replace(/^"(.+(?="$))"$/, '$1');
    }
    
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        };
        console.log(userEmail)
        fetch(`https://project-3-backend-daniel.herokuapp.com/bank-accounts/user/${userEmail}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAccountsInfo(data);
                setLoading(false);
            })
    }, [token, userEmail]);

    if(loading === false) {
        return (
            <div className="dashboard__root">
                <div className="dashboard__cnt dashboard__cnt-cards">
                    <DashboardCard account={accountsInfo[0]} />
                    <DashboardCard account={accountsInfo[1]} />
                </div>
                <div className="dashboard__cnt dashboard__cnt-charts">
    
                </div>
    
            </div>
        );
    }
}

export default Dashboard;