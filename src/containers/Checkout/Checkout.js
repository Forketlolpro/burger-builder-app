import React from 'react';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import ContactData from '../Checkout/ContactData/ContactData';
import styles from './Checkout.module.scss';

class Checkout extends React.Component {
    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
        <div className = {styles.Checkout}>
            <CheckoutSummary
                ingredients = {this.props.ingredients}
                checkoutCancelled={this.checkoutCancelled}
                checkoutContinue={this.checkoutContinue}/>
            <Route component={ContactData}/>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingrediens,
    }
}

export default connect(mapStateToProps)(Checkout);