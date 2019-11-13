import * as actionTipes from './actionTypes';
//добавить инстанс
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTipes.AUTH_START
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTipes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTipes.AUTH_FAIL,
        error: error
    }
}


export const logout = () => {
    return {
        type: actionTipes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout())
        }, expirationTime * 1000)
    }
} 

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkcgTFfb3LS5A5bB3mjS1WFF4cCPhyyiU';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAkcgTFfb3LS5A5bB3mjS1WFF4cCPhyyiU';
        }

        axios.post(url, authData)
        .then(res => {
            console.log(res);
            dispatch(authSuccess(res.data.idToken, res.data.localId))
            dispatch(checkAuthTimeout(res.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        })
    }
}