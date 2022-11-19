import {
    FETCH_SAVEJOB_SUCCESS,
    LOADING_SAVEJOB,
    PERFUME_ADDED_TO_SAVEJOB_SUCCESS,
    PERFUME_REMOVED_FROM_SAVEJOB_SUCCESS
} from "../utils/constants/actions-types";

const initialState = {
    saveJobItems: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case LOADING_SAVEJOB:
            return {...state, loading: true};

        case FETCH_SAVEJOB_SUCCESS:
            return {...state, saveJobItems: payload, loading: false};

        case PERFUME_ADDED_TO_SAVEJOB_SUCCESS:
            return {...state};

        case PERFUME_REMOVED_FROM_SAVEJOB_SUCCESS:
            return {...state, saveJobItems: payload};

        default:
            return state;
    }
};

export default reducer;
