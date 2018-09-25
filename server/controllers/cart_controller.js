const swag = require("../models/swag")

module.exports = {
  add(req, res, next) {
    console.log("req.session", req.session)
    console.log("req.query.id", req.query.id)
    let { cart } = req.session.user

    let index = cart.findIndex((swag) => swag.id == req.query.id) //this will return -1 if the item isn't in the cart

    if (index === -1) {
      //   console.log(swag)
      let item = swag.filter((element) => {
        // console.log(element.id)
        return element.id == req.query.id //doesn't work with triple =
      }) //this will put the item with the query's id into a variable

      //   console.log(item)
      cart.push(item)

      req.session.user.total += item[0].price
    }

    res.status(200).json(req.session.user)
  },
  remove(req, res, next) {
    const { cart } = req.session.user

    console.log("query: ", req.query.id)
    let index = cart.findIndex((swag) => {
      console.log("in indexOf: ", swag[0].id, req.query.id)
      return swag[0].id == req.query.id
    })
    console.log(index, cart[index][0].price)
    req.session.user.total -= cart[index][0].price
    // console.log(req.session.total)
    cart.splice(index, 1)

    res.status(200).json(req.session.user)
  },
  checkout(req, res, next) {
    let { user, total, cart } = req.session
    cart = []
    total = 0
    res.status(200).json(user)
  }
}
