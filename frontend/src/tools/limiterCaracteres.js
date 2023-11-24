export default function limiterCaracteres(text, limit) {
    if (text.length >= limit) {
        const newText = text.substring(0, limit) + '...'

        return newText
    }

    return text
}