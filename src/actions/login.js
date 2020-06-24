export const SetToken = (token) => {
    return {
        type: "LoginModule",
        token: token

    }
}

export const SetSession = (session) => {
    return {
        type: "SessionModule",
        sessionData: session
    }
}