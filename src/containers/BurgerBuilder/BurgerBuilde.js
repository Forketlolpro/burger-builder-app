import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/actions';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Aux from '../../hoc/Auxx';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withArrorHandler from '../../hoc/withArrorHandler/withArrorHandler';
import axios from '../../axios-instance';


class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state= {
            purchasing: false,
            loading: false,
            error: false
        };
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    //вот тут можно улучшить
    updatePurchaseState = (updatedIngridient = this.props.ingrediens) => {
        const ingrediens = {...updatedIngridient};
        const sum = Object.keys(ingrediens)
        .map((key) => {
                return ingrediens[key];
        }).reduce((sum, elem)=>{    
            return sum + elem;
        },0);

       return  sum > 0
    }

    purchaseHandler =  () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }
    
    render() {
        const disableButtonsInfo = {...this.props.ingrediens};

        for (let key in disableButtonsInfo) {
            disableButtonsInfo[key] = disableButtonsInfo[key] === 0;
        }

        let orderSummary = null;

        let burger = (this.props.error ? <p>Error</p> : <Spinner/>)

        if (this.props.ingrediens) {
            burger = (
                <Aux>
                    <Burger ingrediens={this.props.ingrediens}/>
                    <BuildControls 
                        price = {this.props.totalPrice} 
                        disabledButtons = {disableButtonsInfo} 
                        ingredientAdded = {this.props.onIngredientAdd} 
                        ingredientRemove = {this.props.onIngredientRemove}
                        purchasable = {this.updatePurchaseState()}
                        ordered = {this.purchaseHandler}/>
                </Aux>);

            orderSummary = <OrderSummary
                                onPurchaseContinue = {this.purchaseContinueHandler}
                                onPurchaseCancel ={this.purchaseCancelHandler}
                                ingrediens={this.props.ingrediens}
                                price={this.props.totalPrice} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed= {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdd: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

const mapStateToProps = (state) => {
    return {
        ingrediens: state.ingrediens,
        totalPrice: state.totalPrice,
        error: state.error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withArrorHandler(BurgerBuilder, axios));