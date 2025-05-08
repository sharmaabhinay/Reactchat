let initialState = {
    isLoggedIn: false,
    isValidate: false,
    jwt:''
}
export default AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGGING' :
        return {
            ...state, isLoggedIn:action.data
        }
    }
}