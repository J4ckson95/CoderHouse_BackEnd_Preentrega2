import { Router } from "express";
import productsModel from "../models/products.js"

const router = Router()

router.get("/", async (req, res) => {
    const limit = parseInt(req.params)
    const result = await productsModel.paginate({}, {
        limit: 2, page: 1, lean: true
    })
    console.log(result);
    res.render("showProducts", result)
})
router.post("/", async (req, res) => {
    const newProduct = req.body
    const result = await productsModel.create(newProduct)
    res.send({ status: "Success", payload: result })
})
export default router