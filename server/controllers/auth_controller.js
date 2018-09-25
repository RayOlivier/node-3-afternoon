const users = require("../models/users")
//A user object looks like: { id: integer, username: string, password: string }

var id = 1

module.exports = {
  login(req, res, next) {
    let { username, password } = req.body
    console.log("USERS: ", users)
    console.log("username", username)
    console.log(users.find((user) => user.password === password))
    if (
      users.find((user) => user.username === username) &&
      users.find((user) => user.password === password)
    ) {
      console.log("triggered if statement")
      req.session.user.username = users.username
      res.status(200).json(req.session.user)
    } else {
      console.log("went to else statement")
      res.status(500).json("Unauthorized")
    }
  },
  register(req, res, next) {
    users.push({
      username: req.body.username,
      password: req.body.password,
      id
    })
    id += id
    req.session.user.username = req.body.username
    console.log(users)
    res.status(200).json(req.session.user)
  },
  signout(req, res, next) {
    console.log("hopefully words :", req.session)
    req.session.destroy()
    console.log("blank please... ", req.session)
    res.status(200).json(req.session)
  },
  getUser(req, res, next) {
    // console.log("in get user now")
    console.log(req.session)
    res.status(200).json(req.session.user)
  }
}
