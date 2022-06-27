const firstNameRE = /^[a-zA-ZÁÉÍÓÚáéíóú\s]{2,}$/; //eslint-disable-line
const lastNameRE = /^[a-zA-ZÁÉÍÓÚáéíóú\s]{2,}$/; //eslint-disable-line
const emailRE = /^([a-zA-Z\d_\-\.]{2,})@([a-z\d-]+)\.([a-z]{2,})(\.[a-z]{2,8})?$/; //eslint-disable-line
const phoneRE = /^\d{10}$/; //eslint-disable-line
const dniRE = /^\d{7,8}$/; //eslint-disable-line
const ageRE = /^[0-9]{2}$/; //eslint-disable-line
const passwordRE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?&#]{8,15}/; //eslint-disable-line

module.exports = { firstNameRE, lastNameRE, emailRE, phoneRE, dniRE, ageRE, passwordRE };