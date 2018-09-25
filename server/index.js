require("dotenv").config()

const express = require("express"),
  app = express(),
  { json } = require("body-parser")

const session = require("express-session")

const checkForSession = require("./middlewares/checkForSession")
const swag_controller = require("./controllers/swag_controller")
const auth_controller = require("./controllers/auth_controller")
const cart_controller = require("./controllers/cart_controller")

app.use(json())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    // secret: "test",
    resave: false,
    saveUninitialized: true
  })
)
app.use(checkForSession)

app.get("/api/swag", swag_controller.read)
app.post("/api/login", auth_controller.login)
app.post("/api/register", auth_controller.register)
app.post("/api/signout", auth_controller.signout)
app.get("/api/user", auth_controller.getUser)
app.post("/api/cart", cart_controller.add)
app.post("/api/cart/checkout", cart_controller.checkout)
app.delete("/api/cart", cart_controller.remove)

const port = process.env.SERVER_PORT || 3000
app.listen(port, () =>
  console.log(`Tuesday afternoon proj listening on ${process.env.SERVER_PORT}`)
)
