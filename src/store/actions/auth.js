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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
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

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTipes.SET_AUTH_REDIRECT_PATH,
        path: path
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
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', res.data.localId);
            dispatch(authSuccess(res.data.idToken, res.data.localId))
            dispatch(checkAuthTimeout(res.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }

    }
}