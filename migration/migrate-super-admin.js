const mongoose = require('../lib/db-connect');
const {user} = require('../model/user')
const superAdminData = {
    firstName: "jhon",
    lastName: "doe",
    email: "admin@gmail.com",
    phoneNumber: "+251911334455",
    password: "adminadmin",
    verified: true,
    role: "admin"
}

const superAdmin = new user(
    superAdminData
);

superAdmin.save((err, result)=>{
        if(err){
            console.log("error occured while seeding super admin data\n", err)
            return
        }
        console.log("super admin sucessfuly registerd")
        mongoose.disconnect()

})