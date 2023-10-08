export default class UserDataValidator {
    static validateName(name) {
        if (typeof name !== 'string' || name.length === 0 || name.length > 255) {
            throw new Error('O nome é obrigatório e deve ser uma string com até 255 caracteres.');
        }
    }

    static validateBirthday(birthday) {
        const dateParts = birthday.split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);
      
        if (isNaN(year) || isNaN(month) || isNaN(day)) {
          throw new Error('A data de nascimento é obrigatória e deve ser uma data válida.');
        }
      
        // Verifique se a data está em um intervalo razoável (por exemplo, não no futuro)
        const currentDate = new Date();
        const inputDate = new Date(year, month - 1, day); // O mês deve ser subtraído 1 porque janeiro é 0
        if (inputDate > currentDate) {
          throw new Error('A data de nascimento não pode ser no futuro.');
        }
      }
      

    static validateEmail(email) {
        if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
            throw new Error('O email é obrigatório e deve ser um email válido com até 255 caracteres.');
        }
    }

    static validatePassword(password) {
        if (typeof password !== 'string') {
            throw new Error('A senha deve ser uma string.');
        }

        const patternStrongPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
        const isStrongPassword = patternStrongPassword.test(password);

        if (!isStrongPassword) {
            throw new Error('A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais ($, *, &, @, #).');
        }
    }

    static validatePasswordConfirmation(password, confirmedPassword) {
        if (password !== confirmedPassword) {
            throw new Error('A senha e a confirmação de senha não coincidem.');
        }
    }
}
