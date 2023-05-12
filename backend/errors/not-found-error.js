export function notFoundError(message="Not Found") {
    return {
        name: "NotFoundError",
        message: message
    };
}