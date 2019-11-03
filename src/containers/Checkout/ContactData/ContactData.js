import React from 'react';
import axios from '../../../axios-orders';
import styles from './ContactData.module.scss';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';

class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
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


    render () {
        let form = (
        <form>
            <input type ="text" name ="name" placeholder="name"></input>
            <input type ="email" name ="email" placeholder="email"></input>
            <input type ="text" name ="street" placeholder="street"></input>
            <input type ="text" name ="postal" placeholder="postal"></input>
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
