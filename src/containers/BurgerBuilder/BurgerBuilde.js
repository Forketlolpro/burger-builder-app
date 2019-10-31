import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Aux from '../../hoc/Auxx';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withArrorHandler from '../../hoc/withArrorHandler/withArrorHandler';
import axios from '../../axios-orders';

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
            ingrediens: null,
            totalPrice: 50,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
        };
    }

    componentDidMount () {
        axios.get('https://burger-builder-react-app-3d9ac.firebaseio.com/ingredients.json')
        .then (res => {
            this.setState({ingrediens: res.data})
        })
        .catch(error => {
            this.setState({error: true})
        })
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

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const  order ={
            ingrediens: this.state.ingrediens,
            price: this.state.totalPrice,
            customer: {
                name: 'Ilya Cheburov',
                address: {
                    street: 'test',
                    country: 'Russia'
                },
                email: 'test@test.ru'
            },
            deliveryMethod: 'faaster'
        }
        axios.post('/orders.json', order)
        .then(response => this.setState({loading: false, purchasing: false}))
        .catch(error => this.setState({loading: false, purchasing: false}));
    }
    
    render() {
        const disableButtonsInfo = {...this.state.ingrediens};

        for (let key in disableButtonsInfo) {
            disableButtonsInfo[key] = disableButtonsInfo[key] === 0;
        }

        let orderSummary = null;

        let burger = (this.state.error ? <p>Error</p> : <Spinner/>)

        if (this.state.ingrediens) {
            burger = (
                <Aux>
                    <Burger ingrediens={this.state.ingrediens}/>
                    <BuildControls 
                        price = {this.state.totalPrice} 
                        disabledButtons = {disableButtonsInfo} 
                        ingredientAdded = {this.addIngredientHandler} 
                        ingredientRemove = {this.removeIngredientHandler}
                        purchasable = {this.state.purchasable}
                        ordered = {this.purchaseHandler}/>
                </Aux>);

            orderSummary = <OrderSummary
                                onPurchaseContinue = {this.purchaseContinueHandler}
                                onPurchaseCancel ={this.purchaseCancelHandler}
                                ingrediens={this.state.ingrediens}
                                price={this.state.totalPrice} />;
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

export default withArrorHandler(BurgerBuilder, axios);