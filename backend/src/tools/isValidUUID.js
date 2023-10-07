export function isValidUUID(id) {
    const uuidPattern = /^[0-9a-fA-F]{8}(-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}$/;
    return uuidPattern.test(id);
}