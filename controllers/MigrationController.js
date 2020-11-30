 const {user} = require('../model/user')
 
const superAdminData = {
    firstName: "jhon",
    lastName: "doe",
    email: "admin@gmail.com",
    phoneNumber: "+251911334455",
    password: "adminadmin",
    verified: true,
    gender: "male",
    address: {
        region: "addisababa",
        city: "addisababa",
        postalCode: "1000",
        street: "bole sinan building"
      },
    role: "admin"
}

const migrate = async (req, res)=>{
        try {
            const superAdmin = new user(
                superAdminData
            );     
            await superAdmin.save()
            return res.json({status: true, msg: "migration went successfuly"})
        } catch (error) {
            return res.json({error: true, msg: "you have already migrated"})
        }
    
}

module.exports = {
    migrate
}