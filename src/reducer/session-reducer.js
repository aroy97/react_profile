const initialState = {
    userName: "",
    lastLoggedIn: "",
    profileVersion: "",
    profilePic: ""
};

export const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SessionModule":
            return {
                userName: action.sessionData.userName,
                lastLoggedIn: action.sessionData.lastLoggedIn,
                profileVersion: action.sessionData.profileVersion,
                profilePic: action.sessionData.profilePic

            }
        default:
            return state
    }
}