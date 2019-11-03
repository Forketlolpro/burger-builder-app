import React from 'react';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';
import styles from './Checkout.module.scss';

class Checkout extends React.Component {
    constructor(props) {
        super(props);

        const query = new URLSearchParams(this.props.location.search);
        const ingredient = {};
        let price = 0;
        for (let param of query.entries()) {
            if(param[0]==='price') {
                price = param[1];
            } else {
                ingredient[param[0]] = +param[1];
            }
        }

        this.state = {
            ingredients: ingredient,
            totalPrice: price
        }
    }


    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
        <div>
            <CheckoutSummary
                ingredients = {this.state.ingredients}
                checkoutCancelled={this.checkoutCancelled}
                checkoutContinue={this.checkoutContinue}/>
            <Route render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)} path={this.props.match.path + '/contact-data'}/>
        </div>
        )
    }
}

export default Checkout;