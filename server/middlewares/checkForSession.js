module.exports = function(req, res, next) {
  //   const session =

  if (!req.session.user) {
    // console.log("TRIGGERED CHECKFORSESSION IF")
    // console.log("req.session", req.session)
    req.session.user = {
      username: "",
      cart: [],
      total: 0
    }
    // console.log("req.session.user", req.session.user)
  }
  //   console.log("all caps consolelog should be above")
  next()
}
