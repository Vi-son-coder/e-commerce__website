const Users = require("../../models/client/users.model");
module.exports.index = async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  let find = { username: username, password: password };
  const users = await Users.find(find);
  console.log(users);
  res.json(users);
};
module.exports.add = async (req,res) => {
  
}
