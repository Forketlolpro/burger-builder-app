import React from 'react';
import Order from '../../components/Checkout/Order/Order';

class Orders extends React.Component {
    render () {
        return (
            <div>
                <Order/>
                <Order/>
            </div>
        );
    }
}

export default Orders;