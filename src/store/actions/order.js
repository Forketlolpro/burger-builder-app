import * as actionTypes from './actionTypes';
import axios from '../../axios-instance'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}   

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}


export const purchaseBurger = (order, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth=' + token, order)
        .then(response => {
            console.log(response)
            dispatch(purchaseBurgerSuccess(response.data, order))
        })
        .catch(error => {
            console.log(error)
            dispatch(purchaseBurgerFail(error))
        });
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('/orders.json?auth=' + token)
        .then((res) => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({...res.data[key], id: key})
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch((err) => {
            dispatch(fetchOrdersFail(err))
        })
    }
}