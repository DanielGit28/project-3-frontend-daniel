import { useEffect, useState } from "react";
import AccountHistoryCard from "./AccountHistoryCard/AccountHistoryCard";
import {IoIosClose} from "react-icons/io";

const AccountHistory = () => {
    const [accountMovements, setAccountMovements] = useState([]);
    const [loading, setLoading] = useState(false);
    const userEmail = localStorage.getItem("userLoggedEmail");
    let token = localStorage.getItem("JWT");
    if (token) {
        token = token.replace(/^"(.+(?="$))"$/, '$1');
    }

    const [filterMovements, setFilterMovements] = useState([]);
    const [filter, setFilter] = useState("");
    let handleChangeFilter = (e) => {
        setFilter(e.target.value);
    }
    useEffect(() => {
        if (loading === false) {
            const numberRegex = /^\d+$/;
            if(numberRegex.test(filter)) {
                setFilterMovements(accountMovements.filter((movement) =>  movement.amount >= filter ));
            } else {
                setFilterMovements(accountMovements.filter((movement) => movement.originAccount.toLowerCase().includes(filter.toLowerCase())  || movement.movementDate.toLowerCase().includes(filter.toLowerCase()) || movement.movementType.toLowerCase().includes(filter.toLowerCase())));
            }
            
            
        }
    }, [filter, loading]);

    const removeFilter = (e) => {
        e.preventDefault();
        setFilter("");
    }

    useEffect(() => {
        setLoading(true);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        };
        fetch(`https://project-3-backend-daniel.herokuapp.com/movements/user/${userEmail}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAccountMovements(data);
                setLoading(false);
            })

    }, [token, userEmail]);

    if (loading === false) {
        return (
            <div className="account-history__root">
                <div className="account-history__cnt">
                    <h1 className="account-history__title">Account history</h1>
                </div>
                <div className="account-history__cnt account-history__cnt-inp">
                    <input className={`result__filter__inp account-history__search ${filter.length !== 0 && "margin-left-7"}`} placeholder="Search movements by typing keywords" value={filter} onChange={e => handleChangeFilter(e)} />
                    {filter.length !== 0 && <a className="result__filter__remove--clear account-history__clear" onClick={removeFilter}><IoIosClose /></a>
                        }
                </div>
                <div className="account-history__cnt">
                    {filterMovements.map((movement, index) => {
                        return <AccountHistoryCard key={index} accountMovement={movement} />
                    })}
                </div>
            </div>
        );
    }
}

export default AccountHistory;