import React from 'react';
import axios from '../../axios-instance';
import {connect} from 'react-redux';
import Order from '../../components/Checkout/Order/Order';
import * as actions from '../../store/actions/actions';
import withErrorHandler from '../../hoc/withArrorHandler/withArrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render () {
        let orders = <Spinner/>;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
                return <Order key={order.id} ingredients = {order.ingrediens} price ={order.price}/>
            })
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        token: state.auth.token,
        loading: state.order.loading
    }
}

const  mapDispatchToprops = (dispatch) => {
    return {
        onFetchOrders: (token)=>dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(withErrorHandler(Orders, axios));