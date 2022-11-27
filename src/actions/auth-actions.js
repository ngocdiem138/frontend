import axios from 'axios';

import {
    LOGIN_SUCCESS,
    FORM_RESET,
    REGISTER_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_FAILURE,
    LOGOUT_SUCCESS,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    ACTIVATE_ACCOUNT_SUCCESS,
    ACTIVATE_ACCOUNT_FAILURE,
    RESET_PASSWORD_CODE_SUCCESS,
    RESET_PASSWORD_CODE_FAILURE,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE
} from "../utils/constants/actions-types";
import { API_BASE_URL } from "../utils/constants/url";

function cutInformation(start, end, string) {
    let indexStart = string.indexOf(start) + start.length;
    let indexEnd = string.indexOf(end);
    return string.substring(indexStart, indexEnd);
}

function setRole(roles) {
    if (roles.find(role => role === 'ADMIN'))
        return 'ADMIN';
    else if (roles.find(role => role === 'EMPLOYER'))
        return 'EMPLOYER';
    else if (roles.find(role => role === 'CANDIDATE'))
        return 'CANDIDATE';
    else
        return 'USER';
};

export const login = (data, history) => async (dispatch) => {
    try {
        const response = await axios.post(API_BASE_URL + "/login", data);
        if (!response.data.errorCode) {
            let inforUser = response.config.data.replaceAll("\"", "");
            localStorage.setItem("email", cutInformation("email:", ",", inforUser));
            localStorage.setItem("token", response.data.data.jwt);
            localStorage.setItem("userRole", setRole(response.data.data.roles));
            localStorage.setItem("isLoggedIn", true);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: "Login success. Welcome!"
            });
        } else {
            dispatch({
                type: LOGIN_FAILURE,
                payload: "Email or password invalid"
            });
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: "Email or password invalid"
        })
    }
};

export const registration = (data) => async (dispatch) => {
    try {
        const response = await axios.post(API_BASE_URL + "/common/register", data);
        if (!response.data.errorCode) {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data.message
            });
        } else {
            dispatch({
                type: REGISTER_FAILURE,
                payload: response.data.message
            })
        }
    } catch (error) {
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response.data
        })
    }
};

export const logout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    window.location.assign('/');
};

export const activateAccount = (code) => async (dispatch) => {
    try {
        const response = await axios.get(API_BASE_URL + "/activate/" + code);

        dispatch({
            type: ACTIVATE_ACCOUNT_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: ACTIVATE_ACCOUNT_FAILURE,
            payload: error.response.data
        })
    }
};

export const forgotPassword = (data) => async (dispatch) => {
    try {
        const response = await axios.post(API_BASE_URL + "/forgot", data);

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAILURE,
            payload: error.response.data
        })
    }
};

export const fetchResetPasswordCode = (code) => async (dispatch) => {
    try {
        const response = await axios.get(API_BASE_URL + "/reset/" + code);

        dispatch({
            type: RESET_PASSWORD_CODE_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_CODE_FAILURE,
            payload: error.response.data
        })
    }
};

export const resetPassword = (data, history) => async (dispatch) => {
    try {
        const response = await axios.post(API_BASE_URL + "/reset", data);

        history.push("/login");

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAILURE,
            payload: error.response.data
        })
    }
};

export const formReset = () => async (dispatch) => {
    dispatch({
        type: FORM_RESET,
    })
};



