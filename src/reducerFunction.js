export const stateToProps = (state) => {
    return {
        token: state.login.token
    }
}

export const dispatchToProps = (dispatch) => {
    return {
        setToken: (token) => {
            dispatch({
                type: "loginModule",
                token: token
            })
        }
    }
}