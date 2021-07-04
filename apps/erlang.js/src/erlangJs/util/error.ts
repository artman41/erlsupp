export function NewError(name: string, message?: string): Error {
    let err = message ? new Error(message) : new Error()
    err.name = name;
    return err;
}

export function NotImplemented(): Error {
    return new Error("Not Implemented");
}