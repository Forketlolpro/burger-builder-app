import React from 'react';
import axios from '../../../axios-orders';
import styles from './ContactData.module.scss';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

class ContactData extends React.Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name' 
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street' 
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code' 
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country' 
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email' 
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'}, {value: 'cheapest', displayValue: 'Cheapest'}]
                },
                value: ''
            }
        },
        loading: false
    };

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const  order ={
            ingrediens: this.props.ingredients,
            price: this.props.totalPrice,
            deliveryMethod: 'faaster'
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/')
        })
        .catch(error => this.setState({loading: false}));
    }

    inputChangedHandler = (e, input) => {
        const updateOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {...updateOrderForm[input]};
        updatedFormElement.value = e.target.value;
        updateOrderForm[input] = updatedFormElement;

        this.setState({orderForm: updateOrderForm});
    }


    render () {
        let formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        };

        let form = (
        <form>
            {formElementsArray.map(elem => {
                return <Input key={elem.id}
                elementType={elem.config.elementType} 
                elementConfig={elem.config.elementConfig} 
                value={elem.config.value} 
                changed={(event) => this.inputChangedHandler(event, elem.id)}/>
            })}
            <Button type ="Success" clicked={this.orderHandler}>Order</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
