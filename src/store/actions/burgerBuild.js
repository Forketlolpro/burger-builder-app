import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        name: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        name: ingName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFail = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then (res => {
            dispatch(setIngredients(res.data))
        })
        .catch(error => {
            dispatch(fetchIngredientsFail())
        })
    }
}