import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = err =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: err
    }
}

export const auth = (email, password, isSignup) =>{
    return dispatch =>{
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuwHFx-aSTck8XyxrdN_DAkTRihxqhsuY';
        
        if(isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuwHFx-aSTck8XyxrdN_DAkTRihxqhsuY';
        }

        axios.post(url, authData)
            .then(response => {
                console.log(response)
                const expirationDate = new Date( new Date().getTime() + response.data.expiresIn * 1000 );

                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expirationDate)
                dispatch(checkAuthTimeOut(response.data.expiresIn));
                dispatch(authSuccess(response.data.idToken, response.data.localId))
            })
            .catch(err =>{
                console.log('error:', err.response.data.error)
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}


export const checkAuthTimeOut = expirationTime =>{
    return dispatch =>{
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const authCheckState = () =>{
    return dispatch =>{
        const token= localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if(!token){
            dispatch(logout());
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logout());
            }
            else{
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeOut( (expirationDate.getTime() - new Date().getTime()) / 1000 ) );
            }
        }
    }
}

