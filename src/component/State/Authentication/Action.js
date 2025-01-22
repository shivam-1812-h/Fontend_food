import axios from "axios";
import {
    ADD_TO_FAVORITE_FAILURE,
    ADD_TO_FAVORITE_REQUEST,
    ADD_TO_FAVORITE_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
} from "./ActionType";
import { api, API_URL } from "../../config/api";

export const registerUser = (reqData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.useData);
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurant");
        } else {
            reqData.navigate("/");
        }
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
        console.log("Register success:", data);
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.message });
        console.log("Error:", error);
    }
};

export const loginUser = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.useData);
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurant");
        } else {
            reqData.navigate("/");
        }
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
        console.log("Login success:", data);
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
        console.log("Error:", error);
    }
};

export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
        const { data } = await api.get(`${API_URL}/api/user/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        dispatch({ type: GET_USER_SUCCESS, payload: data.jwt });
        console.log("User profile:", data);
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error.message });
        console.log("Error:", error);
    }
};

export const addToFavorite = (jwt, restaurantId) => async (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITE_REQUEST });
    try {
        const { data } = await api.put(
            `${API_URL}/api/restaurant/${restaurantId}/add-favorite`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data });
        console.log("Added to favorite:", data);
    } catch (error) {
        dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error.message });
        console.log("Error:", error);
    }
};

export const logout = () => (dispatch) => {
    try {
        localStorage.clear();
        dispatch({ type: LOGOUT });
        console.log("Logout success");
    } catch (error) {
        console.log("Error:", error);
    }
};
