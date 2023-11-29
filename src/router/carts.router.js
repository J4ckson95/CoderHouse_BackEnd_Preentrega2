import { Router } from "express";
import cartsModel from "../models/carts.js"
const router = Router()

router.get("/carts/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid
        const result = await cartsModel.findOne({ _id: cartId })
        res.render("showCarts", {})
    } catch (e) { }
})

export default router