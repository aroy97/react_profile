const initialState = {
    userName: "",
    lastLoggedIn: "",
    profileVersion: 0
};

export const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SessionModule":
            return {
                userName: action.sessionData.userName,
                lastLoggedIn: action.sessionData.lastLoggedIn,
                profileVersion: action.sessionData.profileversion
            }
        default:
            return {
                state
            }
    }
}