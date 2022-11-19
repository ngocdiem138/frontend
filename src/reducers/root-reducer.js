import {combineReducers} from "redux";

import perfumeReducer from "../reducers/perfume-reducer";
import authReducer from "../reducers/auth-reducer";
import saveJobReducer from "../reducers/saveJob-reducer";
import adminReducer from "../reducers/admin-reducer";
import orderReducer from "../reducers/order-reducer";
import userReducer from "../reducers/user-reducer";

const rootReducer = combineReducers({
    perfume: perfumeReducer,
    auth: authReducer,
    saveJob: saveJobReducer,
    admin: adminReducer,
    order: orderReducer,
    user: userReducer
});

export default rootReducer;