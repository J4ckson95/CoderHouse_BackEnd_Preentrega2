import { Router } from "express"
import cartsModel from "../models/carts.js"
const router = Router()

router.get("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid
        const result = await cartsModel.findOne({ _id: cartId })
        res.render("showCarts", result)
    } catch (e) { res.status(500).send({ status: "Error", message: e.message }); }
})
router.get("/product/:idp", async (req, res) => {
    try {
        const productId = req.params.idp
        let cart = await cartsModel.findOne()
        if (!cart) cart = await cartsModel.create()
        console.log(cart, productId);
        res.send(cart)
    } catch (e) { res.status(500).send({ status: "Error", message: e.message }); }
})

export default router