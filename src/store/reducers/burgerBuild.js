import * as actionsTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 10,
    cheese: 15,
    meat: 40,
    bacon: 20
}


const initialState = {
    ingrediens: null,
    totalPrice: 50,
    error: false
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
        case actionsTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingrediens: action.ingredients,
                error: false,
                totalPrice: 50
            };

        case actionsTypes.FETCH_INGREDIENTS_FAIL:
                return {
                    ...state,
                    error: true
                };
        default:
            return state;  
    }
}

export default reducer;