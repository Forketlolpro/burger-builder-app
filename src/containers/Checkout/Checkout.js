import React from 'react';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
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
        let summary = <Redirect to="/"/>;
        if (this.props.ingredients) {
            summary = (
                <div className = {styles.Checkout}>
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
        ingredients: state.ingrediens,
    }
}

export default connect(mapStateToProps)(Checkout);