import { useEffect, useState } from "react";


const AccountHistoryCard = (props) => {
    const { accountMovement } = props;
    return (
        <button className="dashboard-card__root history-card__root">
            <div className="dashboard-card__number ">
                <p className="dashboard-card__number__text ">{accountMovement.movementType}</p>
            </div>
            <div className="dashboard-card__cnt-general history-card__cnt-general">
                <div className="dashboard-card__row dashboard-card__cnt history-card__row">
                    <p className="dashboard-card__info__text history-card__info__text history-card__info__text--left">Amount</p>
                    <p className="dashboard-card__info__text history-card__info__text history-card__info__text--right">
                        {accountMovement.currency === "Colon" && "₡"}
                        {accountMovement.currency === "Dollar" && "$"}
                        {Math.round((accountMovement.amount + Number.EPSILON) * 100) / 100}
                    </p>
                </div>

                <div className="dashboard-card__row dashboard-card__cnt history-card__row">
                    <p className="dashboard-card__info__text history-card__info__text history-card__info__text--left">Date</p>
                    <p className="dashboard-card__info__text history-card__info__text history-card__info__text--right">{accountMovement.movementDate.substring(0, 10)}</p>

                </div>
                <div className="dashboard-card__row dashboard-card__cnt history-card__row">
                    <p className="dashboard-card__info__text history-card__info__text history-card__info__text--left">Time</p>
                    <p className="dashboard-card__info__text history-card__info__text history-card__info__text--right">{accountMovement.movementDate.substring(11, 16)}</p>

                </div>
                <div className="dashboard-card__row dashboard-card__cnt history-card__row">
                    <p className="dashboard-card__info__text history-card__info__text history-card__info__text--left">Origin account</p>
                    <p className="dashboard-card__info__text history-card__info__text history-card__info__text--right">{accountMovement.originAccount}</p>

                </div>
                {accountMovement.destinationAccount && <div className="dashboard-card__row dashboard-card__cnt history-card__row">
                    <p className="dashboard-card__info__text history-card__info__text history-card__info__text--left">Destination account</p>
                    <p className="dashboard-card__info__text history-card__info__text history-card__info__text--right">{accountMovement.destinationAccount}</p>
                </div>}
            </div>
            

        </button>
    );
}

export default AccountHistoryCard;