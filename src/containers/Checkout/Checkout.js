import React from 'react';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import ContactData from '../Checkout/ContactData/ContactData';
import * as actions from '../../store/actions/actions';
import styles from './Checkout.module.scss';

class Checkout extends React.Component {
    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        let summary = <Redirect to="/"/>;
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/'/> : null;
            summary = (
                <div className = {styles.Checkout}>
                    {purchasedRedirect}
                    <CheckoutSummary
                    ingredients = {this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinue={this.checkoutContinue}/>
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                </div>
            )
        }
        return (
            summary
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingrediens,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);