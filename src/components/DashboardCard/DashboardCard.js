import { useEffect, useState } from "react";
import { BankContext } from "../BankHome/BankHome";

const DashboardCard = (props) => {
    const { account } = props;
    return (
        <div className="dashboard-card__root">
            <div className="dashboard-card__row dashboard-card__cnt">
                <div className="dashboard-card__number ">
                    <p className="dashboard-card__number__text ">{account.accountNumber}</p>
                </div>

            </div>
            <div className="dashboard-card__cnt ">
                <div className="dashboard-card__row dashboard-card__balance ">
                    <p className="dashboard-card__balance__text">Balance</p>
                    <p className="dashboard-card__balance__text ">
                        {account.currency === "Colon" && "₡"}
                        {account.currency === "Dolar" && "$"}
                        {Math.round((account.accountBalance + Number.EPSILON) * 100) / 100}
                    </p>
                </div>
                <div className="dashboard-card__kb ">
                    <p>KB</p>
                </div>
            </div>

            <div className="dashboard-card__row dashboard-card__cnt">
                <div className="dashboard-card__date ">
                    <p className="dashboard-card__date__text ">Payment date</p>
                    <p className="dashboard-card__date__text ">{account.paymentDate.substring(0, 10)}</p>
                </div>

            </div>

        </div>
    );
}

export default DashboardCard;