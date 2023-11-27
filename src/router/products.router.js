import { Router } from "express";
import productsModel from "../models/products.js"

const router = Router()

router.get("/", async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const query = req.query.query || {};
    let sort = req.query.sort || "";
    if (sort != "" && sort == "asc") sort = 1
    if (sort != "" && sort == "desc") sort = -1
    const result = await productsModel.paginate(query, {
        limit, page, sort: { price: sort }, lean: true
    })
    res.render("showProducts", result)
})
router.post("/", async (req, res) => {
    const newProduct = req.body
    const result = await productsModel.create(newProduct)
    res.send({ status: "Success", payload: result })
})
export default router