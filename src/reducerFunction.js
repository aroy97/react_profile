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
        },
        setSession:(session) => {
            dispatch({
                type: "SessionModule",
                sessionData: {
                    userName: session.userName,
                    profilePic: session.profilePic,
                    lastLoggedIn: session.lastLoggedIn
                }
            })
        }
    }
}