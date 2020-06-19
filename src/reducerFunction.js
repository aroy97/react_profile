export const stateToProps = (state) => {
    return {
        token: state.login.token,
        userName: state.session.userName,
        profilePic: state.session.profilePic,
        lastLoggedIn: state.session.lastLoggedIn
    }
}

export const dispatchToProps = (dispatch) => {
    return {
        setToken: (token) => {
            console.log(token);
            dispatch({
                type: "loginModule",
                token: token
            })
        },
        setSession:(session) => {
            console.log(session);
            dispatch({
                type: "SessionModule",
                sessionData: {
                    userName: session.username,
                    profilePic: session.profilepic,
                    lastLoggedIn: session.lastLoggedIn
                }
            })
        }
    }
}