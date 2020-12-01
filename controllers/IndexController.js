const  {user} = require("./../model/user");

const me = async (req, res) => {
    return res.json({user: req.user})
}
 
module.exports = {
    me
}