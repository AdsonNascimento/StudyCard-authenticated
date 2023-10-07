import { strongPassword } from "./strongPassword.js";

export function isValidPassword(password, confirmedPassword) {
    if (typeof password !== 'string' || typeof confirmedPassword !== 'string') {
        return new Error;
    }

    if (password !== confirmedPassword) {
        return false;
    }

    if (!strongPassword(password)) {
        return false;
    }

    return true;
}
