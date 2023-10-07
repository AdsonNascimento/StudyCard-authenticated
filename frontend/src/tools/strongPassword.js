export default function strongPassword(password) {
    if (typeof password !== 'string') {
        console.error("Input não é uma string");
        return false;
    }

    const patternStrongPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
    const filterPassWord = password.match(patternStrongPassword)

    if (filterPassWord === null) {
        return false;
    }

    return true;
}
