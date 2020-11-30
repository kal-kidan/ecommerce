const customerPermisions  = [ 'me', 'forgotPassword', 'resetPassword', 'makeAppointment', 'getAllPatientAppointments', 'uploadAppointmentsFile', 'addPaymentMethod']
const adminPermisions = ['me', 'register', 'verifyEmail', 'forgotPassword', 'resetPassword']

module.exports = {
    customerPermisions,
    adminPermisions 
}