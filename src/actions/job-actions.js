import axios from 'axios';

import {
    FETCH_SAVEJOB_SUCCESS,
    PERFUME_ADDED_TO_SAVEJOB_SUCCESS,
    PERFUME_REMOVED_FROM_SAVEJOB_SUCCESS,
    LOADING_SAVEJOB
} from "../utils/constants/actions-types";
import {API_BASE_URL} from "../utils/constants/url";

export const fetchSaveJob = () => async (dispatch) => {
    dispatch({
        type: LOADING_SAVEJOB
    })

    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/candidate/get-job-post-saved",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });

    dispatch({
        type: FETCH_SAVEJOB_SUCCESS,
        payload: response.data.data
    })
};

export const fetchAllJobPost= () => async (dispatch) => {
    dispatch({
        type: LOADING_SAVEJOB
    })

    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/common/job-post/get-all",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });

    dispatch({
        type: FETCH_ALL_JOBPOST_SUCCESS,
        payload: response.data.data
    })
};

export const addToSaveJob = (perfume, history) => async (dispatch) => {
    await axios({
        method: "POST",
        url: API_BASE_URL + "/job/add",
        data: perfume,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })

    dispatch({
        type: PERFUME_ADDED_TO_SAVEJOB_SUCCESS,
    })

    history.push("/job")
};

export const applyToSaveJob = (jobPost) => async (dispatch) => {
    await axios({
        method: "GET",
        url: API_BASE_URL + "/candidate/apply-job-post/" + jobPost.id,
        data: jobPost,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })

    dispatch({
        type: PERFUME_ADDED_TO_SAVEJOB_SUCCESS,
    })
};

export const removeFromSaveJob = (jobPost) => async (dispatch) => {
    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/candidate/cancel-saved-job-post/" + jobPost.id,
        data: jobPost,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    dispatch({
        type: PERFUME_REMOVED_FROM_SAVEJOB_SUCCESS,
    })
};
