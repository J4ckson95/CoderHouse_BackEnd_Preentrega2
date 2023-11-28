import { Router } from "express";
import productsModel from "../models/products.js"

const router = Router()

router.get("/", async (req, res) => {
    const limit = parseInt(req.query.limit) || 2;
    const page = parseInt(req.query.page) || 1;
    console.log(page);
    const query = req.query.query || {};
    let sort = req.query.sort || -1;
    if (sort != "" && sort == "asc") sort = 1
    if (sort != "" && sort == "desc") sort = -1
    try {
        const result = await productsModel.paginate(query, {
            limit, page, sort: ({ price: sort }), lean: true
        })
        result.payload = result.docs
        delete result.docs
        result.status = "Success"
        //console.log(result);
        res.render("showProducts", result)
    } catch (e) { console.log(e.message); }
})
router.post("/", async (req, res) => {
    const newProduct = req.body
    const result = await productsModel.create(newProduct)
    res.send({ status: "Success", payload: result })
})
export default router