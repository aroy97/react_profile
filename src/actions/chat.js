export const SetChat = (name, email, picture, pictureversion) => {
    return {
        type: "chatModule",
        name: name,
        email: email,
        picture: picture,
        pictureversion: pictureversion

    }
}