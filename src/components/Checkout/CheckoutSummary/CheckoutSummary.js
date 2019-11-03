import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.scss'

const checkoutSummary = (props) => {
    return (
        <div className = {styles.CheckoutSummary}>
            <h1>We hope it tastes well</h1>
            <div styles = {{width: '100%', margin: 'auto'}}>
                <Burger ingrediens = {props.ingredients}/>
            </div>
            <Button type="Danger"  clicked = {null}>Cancel</Button>
            <Button type="Success" clicked = {null}>Continue</Button>
        </div>
    )
}

export default checkoutSummary;