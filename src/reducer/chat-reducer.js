const initialState = {
    name: '',
    email: '',
    picture: '',
    pictureversion: ''
}

export const chatReducer = (state = initialState, action) => {
    switch(action.type) {
        case "chatModule":
            return {
                name: action.name,
                email: action.email,
                picture: action.picture,
                pictureversion: action.pictureversion
            }
        default:
            return state
    }
}