import React from 'react';
import Aux from '../../../hoc/Auxx';
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingrediens)
    .map((igKey)=>{
        return (<li key={igKey}><span>{igKey}</span>: {props.ingrediens[igKey]}</li>);
    })
    return (
        <Aux>
            <h3>You Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
               {ingredientsSummary}
            </ul>
            <p>Total price: {props.price}</p>
            <p>Continue to Checkout?</p>
            <Button type='Danger' clicked={props.onPurchaseCancel}>Cancel</Button>
            <Button type='Success' clicked={props.onPurchaseContinue}>Continue</Button>
        </Aux>
    );
}
export default orderSummary;