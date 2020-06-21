const initialState = {
    token: ''
}

export const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case "loginModule":
            return {
                token: action.token
            }
        default:
            return state
    }
}