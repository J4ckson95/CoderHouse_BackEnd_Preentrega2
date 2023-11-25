import express from "express"
import mongoose from "mongoose"
import { DB_HOST, PORT, DB_DATABASE } from "./config.js"
import productsRouter from "./router/products.router.js"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + `/public`))

app.use("/api/products", productsRouter)

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + `/views`)
app.set("view engine", "handlebars")

mongoose.connect(DB_HOST, { dbName: DB_DATABASE })
    .then(() => {
        console.log("DB Connected ....");
        app.listen(PORT, () => console.log("Running Server ... <(--_--)>"))
    })
    .catch((e) => console.log(e.message))