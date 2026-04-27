import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from "./action/userAction";

const INITAL_STATE = {
    account: {
        access_token: '',
        refrest_token: '',
        username: '',
        email: '',
        iamge: '',
        role: ''
    },
    isAuthenticated: false
}
const userReducer = (state = INITAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state, account: {
                    access_token: action?.payload?.DT.access_token,
                    refresh_token: action?.payload?.DT.refresh_token,
                    username: action?.payload?.DT.username,
                    email: action?.payload?.DT.email,
                    iamge: action?.payload?.DT.image,
                    role: action?.payload?.DT.role
                },
                isAuthenticated: true
            }
        case USER_LOGOUT_SUCCESS:
            return {
                account: {
                    access_token: '',
                    refrest_token: '',
                    username: '',
                    email: '',
                    iamge: '',
                    role: ''
                },
                isAuthenticated: false
            }

        default: return state
    }
}
export default userReducer;