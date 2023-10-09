export default class UserDataValidator {
    static validateUserName(name) {
        const trimmedName = name.trim();
        if (typeof trimmedName !== 'string' || trimmedName.length === 0 || trimmedName.length > 255) {
            throw new Error('O nome é obrigatório e deve ser uma string com até 255 caracteres.');
        }
    }

    static validateBirthday(birthday) {
        const trimmedBirthday = birthday.trim();
        const dateParts = trimmedBirthday.split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);

        if (isNaN(year) || isNaN(month) || isNaN(day)) {
            throw new Error('A data de nascimento é obrigatória e deve ser uma data válida.');
        }

        const currentDate = new Date();
        const inputDate = new Date(year, month - 1, day);
        if (inputDate > currentDate) {
            throw new Error('A data de nascimento não pode ser no futuro.');
        }
    }

    static validateEmail(email) {
        const trimmedEmail = email.trim();
        if (typeof trimmedEmail !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) || trimmedEmail.length > 255) {
            throw new Error('O email é obrigatório e deve ser um email válido com até 255 caracteres.');
        }
    }

    static validatePassword(password) {
        if (typeof password !== 'string') {
            throw new Error('A senha deve ser uma string.');
        }
        const trimmedPassword = password.trim();

        const patternStrongPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
        const isStrongPassword = patternStrongPassword.test(trimmedPassword);

        if (!isStrongPassword) {
            throw new Error('A senha deve ter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial ($, *, &, @, #).');
        }
    }

    static validatePasswordConfirmation(password, confirmedPassword) {
        const trimmedPassword = password.trim();
        const trimmedConfirmedPassword = confirmedPassword.trim();

        if (trimmedPassword !== trimmedConfirmedPassword) {
            throw new Error('A senha e a confirmação de senha não coincidem.');
        }
    }
}
