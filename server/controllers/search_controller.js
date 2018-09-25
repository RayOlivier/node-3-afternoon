const swag = require("../models/swag")

module.exports = {
  search(req, res, next) {
    //req.query.category
    if (req.query.category) {
      let filtered = swag.filter((e, i, arr) => {
        return e.category === req.query.category
      })
      res.status(200).json(filtered)
    } else {
      res.status(200).json(swag)
    }
  }
}
