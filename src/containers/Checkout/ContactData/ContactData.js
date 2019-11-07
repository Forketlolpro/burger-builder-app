import React from 'react';
import { connect } from 'react-redux';
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
                validationKey: {
                    required: true
                },
                valid: false,
                value: '',
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street' 
                },
                validationKey: {
                    required: true
                },
                valid: false,
                value: '',
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code' 
                },
                validationKey: {
                    required: true,
                    minLength: 6,
                    maxLength: 10
                },
                valid: false,
                value: '',
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country' 
                },
                validationKey: {
                    required: true
                },
                valid: false,
                value: '',
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email' 
                },
                validationKey: {
                    required: true
                },
                valid: false,
                value: '',
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'}, {value: 'cheapest', displayValue: 'Cheapest'}]
                },
                valid: true,
                value: 'fastest'
            }
        },
        formIsValid: false,
        loading: false
    };

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value
        }
        const  order ={
            ingrediens: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/')
        })
        .catch(error => this.setState({loading: false}));
    }


    checkValidity(value, rules) {
        let isValid  = true;
        if (rules.required) {
            isValid =  value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (e, input) => {
        const updateOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {...updateOrderForm[input]};
        updatedFormElement.value = e.target.value;
        if (updatedFormElement.validationKey) {
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validationKey);
            updatedFormElement.touched = true;
        }
        updateOrderForm[input] = updatedFormElement;
        let formIsValid = true;
        for (let id in updateOrderForm) {
            formIsValid = updateOrderForm[id].valid && formIsValid
        }
        this.setState({orderForm: updateOrderForm, formIsValid: formIsValid});
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
        <form onSubmit={this.orderHandler}>
            {formElementsArray.map(elem => {
                return <Input key={elem.id}
                elementType={elem.config.elementType} 
                elementConfig={elem.config.elementConfig} 
                value={elem.config.value}
                invalid={!elem.config.valid}
                shouldValidate={elem.config.validationKey}
                touched = {elem.config.touched}
                changed={(event) => this.inputChangedHandler(event, elem.id)}/>
            })}
            <Button type ="Success" disabled = {!this.state.formIsValid}>Order</Button>
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingrediens,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);
