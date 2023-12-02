import express from "express"
import mongoose from "mongoose"
import productsRouter from "./router/products.router.js"
import cartsRouter from "./router/carts.router.js"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", productsRouter)
app.use("/api/cart", cartsRouter)

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + `/views`)
app.set("view engine", "handlebars")

mongoose.connect("mongodb+srv://J4ckson:IIQyDhhK1Ax1pSgX@coderhousebackend.jdnxmo1.mongodb.net/", { dbName: "ecommerce" })
    .then(() => {
        console.log("DB Connected ....");
        app.listen(8080, () => console.log("Running Server ... <(--_--)>"))
    })
    .catch((e) => console.log(e.message))