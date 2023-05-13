export function badRequestError(message) {
    return {
        name: "BadRequestError",
        message: message
    };
}
