import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Aux from '../../hoc/Auxx';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 10,
    cheese: 15,
    meat: 40,
    bacon: 20
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state= {
            ingrediens: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 50,
            purchasable: false,
            purchasing: false
        };
    }
    //вот тут можно улучшить
    updatePurchaseState = (updatedIngridient) => {
        const ingrediens = {...updatedIngridient};
        const sum = Object.keys(ingrediens)
        .map((key) => {
                return ingrediens[key];
        }).reduce((sum, elem)=>{
            return sum + elem;
        },0);

        this.setState({purchasable: sum > 0})
    }

    purchaseHandler =  () => {
        this.setState({purchasing: true});
    }

    addIngredientHandler = (type) => {
        const updatedIngridient = {
            ...this.state.ingrediens,
        }
        updatedIngridient[type] = this.state.ingrediens[type] + 1;

        this.setState({
            totalPrice: this.state.totalPrice  + INGREDIENT_PRICES[type],
            ingrediens: updatedIngridient
        });

        this.updatePurchaseState(updatedIngridient);
    }

    removeIngredientHandler = (type) => {
        const updatedIngridient = {
            ...this.state.ingrediens,
        }
        updatedIngridient[type] = ((this.state.ingrediens[type] - 1) < 0 ? 0 : this.state.ingrediens[type] - 1) ;

        this.setState({
            totalPrice: this.state.totalPrice  - INGREDIENT_PRICES[type],
            ingrediens: updatedIngridient
        });
        this.updatePurchaseState(updatedIngridient);
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    
    render() {
        const disableButtonsInfo = {...this.state.ingrediens};

        for (let key in disableButtonsInfo) {
            disableButtonsInfo[key] = disableButtonsInfo[key] === 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed= {this.purchaseCancelHandler}>
                    <OrderSummary ingrediens={this.state.ingrediens}/>
                </Modal>
                <Burger ingrediens={this.state.ingrediens}/>
                <BuildControls 
                    price = {this.state.totalPrice} 
                    disabledButtons = {disableButtonsInfo} 
                    ingredientAdded = {this.addIngredientHandler} 
                    ingredientRemove = {this.removeIngredientHandler}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;