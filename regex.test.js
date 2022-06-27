const { firstNameRE, lastNameRE, emailRE, phoneRE, dniRE, ageRE, passwordRE } = require('./src/validators/verifications');

const email = 'johndoe@hotmail.com';
const email2 = "chris.rock@amazon.co.uk";
const firstName = " ";
const lastName = " ";
const phone = 3749826172;
const age = 30;
const dni = 22333444;
const password = 'Pass123$tes#';


console.log('email', emailRE.test(email));
console.log('email2', emailRE.test(email2));
console.log('first name', firstNameRE.test(firstName.trim()));
console.log('last name', lastNameRE.test(lastName.trim()));
console.log('phone', phoneRE.test(phone));
console.log('age', ageRE.test(age));
console.log('dni', dniRE.test(dni));
console.log('password', passwordRE.test(password));