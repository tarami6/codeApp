const validate = (val, rules, connectedValue) => {
    const newVal = val.trim();
    console.log("cal",rules)
    let isValid = true;
    for (let rule in rules) {
        switch (rule) {
            case 'minLength':
                isValid = isValid && minLengthValidator(val, rules[rule]);
                break;

            case 'equalTo':
                isValid = isValid && equalToValidator(val, connectedValue[rule]);
                break;

            case 'phoneValidator':
                isValid = isValid && phoneValidator(val);
                break;

            case 'faxValidator':
                isValid = isValid && faxValidator(val);
                break

            case 'isEmail':
                isValid = isValid && emailValidator(val);
                break;

            case 'ageValidator':
                isValid = isValid && ageValidator(val);
                break;


            default:
                return;
        }
    }
    return isValid;
}



const minLengthValidator = (val, minLength) => {
    return val.length >= minLength;

}

const phoneValidator = (val) => {
    let str = val;
    let patt = /^[0][5][0|2|3|4|5|9]{1}[-]{0,1}[0-9]{7}$/;
    let result = str.match(patt);
    return result && str.length > 0;
}

const faxValidator = (val) => {
    let str = val;
    let patt =  /^\d+$/;
    let result = str.match(patt);
    return result && str.length > 7;
}

const emailValidator = val => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val);
}

const ageValidator = (val) => {
    return Number(val) > 12 && Number(val) < 121;
}

const equalToValidator = (val, checkValue) => {
    return val === checkValue;
}

export default validate;
