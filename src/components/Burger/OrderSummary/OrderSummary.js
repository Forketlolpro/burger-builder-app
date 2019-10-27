import React from 'react';
import Aux from '../../../hoc/Aux';
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
            <p>Continue to Checkout?</p>
        </Aux>
    );
}
export default orderSummary;