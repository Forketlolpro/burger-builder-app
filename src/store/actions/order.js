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


export const purchaseBurger = (order) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', order)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data, order))
        })
        .catch(error => dispatch(purchaseBurgerFail(error)));
    }
}