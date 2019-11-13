import React from  'react';
import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.module.scss';

const controls = [
    {lable: 'Salad', type: 'salad'},
    {lable: 'Bacon', type: 'bacon'},
    {lable: 'Cheese', type: 'cheese'},
    {lable: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
    return (
        <div className={styles.BuildControls}>
            <p>Current price: <strong>{props.price}</strong></p>
            {controls.map(ctrl=>(
                <BuildControl 
                removeIngredient={()=>props.ingredientRemove(ctrl.type)} 
                addedIngredient={() => props.ingredientAdded(ctrl.type)} 
                key={ctrl.lable} 
                lable={ctrl.lable}
                disabled = {props.disabledButtons[ctrl.type]}/>
            ))}
            <button onClick= {props.ordered} disabled={!props.purchasable} className={styles.OrderButton}>{props.isAuth ? 'Order' : 'Signup plz'}</button>
        </div>
    )
}

export default buildControls;