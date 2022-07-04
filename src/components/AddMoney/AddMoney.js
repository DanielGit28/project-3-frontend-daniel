import FormAddFunds from "../Forms/FormAddFunds/FormAddFunds";

const AddMoney = (props) => {
    const {isMenuOpen} = props;
    return(
        <div>
            <FormAddFunds isMenuOpen={isMenuOpen}/>
        </div>
    );
}

export default AddMoney;