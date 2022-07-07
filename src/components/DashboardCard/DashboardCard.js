import { useEffect, useState } from "react";
import { BankContext } from "../BankHome/BankHome";

const DashboardCard = (props) => {
    const { account } = props;
    return (
        <button className="dashboard-card__root">
            <div className="dashboard-card__number ">
                <p className="dashboard-card__number__text ">{account.accountNumber}</p>
            </div>
            <div className="dashboard-card__cnt-general">
                <div className="dashboard-card__row dashboard-card__cnt ">
                    <p className="dashboard-card__info__text">Balance</p>
                    <p className="dashboard-card__info__text ">
                        {account.currency === "Colon" && "₡"}
                        {account.currency === "Dollar" && "$"}
                        {Math.round((account.accountBalance + Number.EPSILON) * 100) / 100}
                    </p>
                </div>

                <div className="dashboard-card__row dashboard-card__cnt">
                    <p className="dashboard-card__info__text ">Payment date</p>
                    <p className="dashboard-card__info__text ">{account.paymentDate.substring(0, 10)}</p>

                </div>
            </div>
            <div className="dashboard-card__logo__cnt">
            <svg  xmlns="http://www.w3.org/2000/svg" className="dashboard-card__logo"  viewBox="0 0 183.787 184.04"><path d="M0 0v48.47l67.68 67.77 67.7 67.8h48.4L91.89 92 0 0M0 116.68v67.36h67.36l-33.68-33.68L0 116.68M67.97 0l50.52 50.51L169 0z" fill="#000000" className="k-logo dashboard-card__logo__path"></path></svg>
            </div>

        </button>
    );
}

export default DashboardCard;