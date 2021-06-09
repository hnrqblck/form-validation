class ValidatesForm {
    constructor() {
        this.form = document.querySelector('.form');
        this.formEvents();
    }

    formEvents() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e); 
        })

    }

    handleSubmit(e) {
        e.preventDefault();
        this.areFieldsValid();
        this.isUsernameValid();
        this.isPasswordValid();
        this.arePasswordsEqual();
        this.isCPFValid();

        if (this.valid) {
            alert('Form submitted successfully!');
            this.form.submit();
        }
    }

    areFieldsValid() {
        this.valid = true;

        for(let errorMessage of this.form.querySelectorAll('.err-message')) {
            errorMessage.remove();
        }

        for(let field of this.form.querySelectorAll('.valid')) {
            let label = field.previousElementSibling.innerHTML.slice(0, -1);
            if(!field.value) {
                this.createError(field, `${label} cannot be empty`);
                this.valid = false;
            }; 
        };
    }

    createError(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('err-message');
        field.insertAdjacentElement('afterend', div);
        
    }

    isUsernameValid() {
        const username = this.form.querySelector('.username');
        const userNLength = username.value.length;
        if(userNLength < 3 || userNLength > 13){
            this.createError(username, `Username's length must be between 3 and 12 characters`)
            this.valid = false;
        };
        if(!/^[a-z0-9]*$/.test(username.value)){
            this.createError(username, `Username can only be written with letters and numbers`)
            this.valid = false;
        };
    }

    isPasswordValid() {
        const password = this.form.querySelector('.password');
        const passowrdLength = password.value.length;
        if(passowrdLength < 6 || passowrdLength > 13) {
            this.createError(password, `Password's length must be between 6 and 12 characters`)
            this.valid = false;
        };
    }

    arePasswordsEqual() {
        const password = this.form.querySelector('.password');
        const confirmPassowrd = this.form.querySelector('.confirm-password');
        const samePassword = password.value === confirmPassowrd.value;
        if (!samePassword) {
            this.createError(confirmPassowrd, `Passwords are not identical`)
            this.valid = false;
        };
    }

    isCPFValid() {
        const cpf = this.form.querySelector('.cpf');
        const cleanCpf = cpf.value.replace(/\D+/g, '');

        if (!cleanCpf) {
            this.valid = false;
            return this.createError(cpf, `The cpf isn't valid.`)
        };
        if (typeof cleanCpf !== 'string') {
            this.valid = false;
            return this.createError(cpf, `The cpf isn't valid.`)
        };
        if (cleanCpf.length !== 11) {
            this.valid = false;
            return this.createError(cpf, `The cpf isn't valid.`)
        };
        if (this.isASequence(cleanCpf)) {
            this.valid = false;
            return this.createError(cpf, `The cpf isn't valid.`)
        };
        this.cleanCPF(cleanCpf);
        this.getDigit();
        this.cpfArr.push(this.digit);
        this.getDigit();
        this.cpfArr.push(this.digit);

        const validation = this.cpfArr.join('') === this.cleanCpf;
        return validation ? `The cpf is valid!` :  `The cpf isn't valid.`;
    }

    isASequence(cleanCpf) {
        return cleanCpf.charAt(0).repeat(11) === cleanCpf;
    }

    cleanCPF (cleanCpf) {
        this.cpfArr = Array.from(cleanCpf);
        this.cpfArr.splice(-2, 2);
        return this.cpfArr;
    }

    getDigit() {
        const cpfToDigit = [...this.cpfArr];
        const total = cpfToDigit.reverse().map((value, i) => {
            i += 2;
            value *= i;
            return value;
        })
        .reduce((acc, value) => acc += value, 0);
        this.digit = 11 - (total % 11);
        if (this.digit > 9) return this.digit = '0';
        return this.digit = String(this.digit);
    }
}

const validated = new ValidatesForm();