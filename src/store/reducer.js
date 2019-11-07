import * as actionsTypes from './actions';
import { stat } from 'fs';

const INGREDIENT_PRICES = {
    salad: 10,
    cheese: 15,
    meat: 40,
    bacon: 20
}


const initialState = {
    ingrediens: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 50,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingrediens: {
                    ...state.ingrediens,
                    [action.name]: state.ingrediens[action.name] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.name]
            };
        case actionsTypes.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingrediens: {
                    ...state.ingrediens,
                    [action.name]: state.ingrediens[action.name] - 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.name]
            };
        default:
            return state;  
    }
}

export default reducer;