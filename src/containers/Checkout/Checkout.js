import React from 'react';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import styles from './Checkout.module.scss';

class Checkout extends React.Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredient = {};
        for (let param of query.entries()) {
            ingredient[param[0]] = +param[1];
        }

        this.setState({ingredients: ingredient})
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
            <CheckoutSummary ingredients = {this.state.ingredients} checkoutCancelled={this.checkoutCancelled} checkoutContinue={this.checkoutContinue}/>
        </div>
        )
    }
}

export default Checkout;