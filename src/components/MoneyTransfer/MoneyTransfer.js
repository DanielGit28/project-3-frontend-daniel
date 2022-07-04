import FormTransferFunds from "../Forms/FormTransferFunds/FormTransferFunds";

const MoneyTransfer = (props) => {
    const {isMenuOpen} = props;
    return(
        <div>
            <FormTransferFunds isMenuOpen={isMenuOpen}/>
       </div>
    );
}

export default MoneyTransfer;