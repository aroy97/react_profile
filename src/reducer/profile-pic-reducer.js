const initialState = {
    profilePic: ""
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "PhotoModule":
            return {
                profilePic: action.photoData.profilePic
            }
        default:
            return {
                state
            }
    }
}