import { Router } from "express"
import cartsModel from "../models/carts.js"
const router = Router()
const updateCart = (cart, productId) => {
    const indexProduct = cart.products.findIndex(element => element._id.toString() === productId);
    if (indexProduct < 0) {
        cart.products.push({ _id: productId, quantity: 1 });
    } else {
        cart.products[indexProduct].quantity += 1;
    }
}

router.get("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid
        const result = await cartsModel.findOne({ _id: cartId })
        res.render("showCarts", result)
    } catch (e) { res.status(500).send({ status: "Error", message: e.message }); }
})
router.post("/product/:idp", async (req, res) => {
    try {
        const productId = req.params.idp
        let cart = await cartsModel.findOne()
        if (!cart) cart = await cartsModel.create({});
        updateCart(cart, productId)
        const result = await cartsModel.updateOne({ _id: cart._id }, { $set: { products: cart.products } })
        return res.send({ status: "Success", result })
    } catch (e) { res.status(500).send({ status: "Error", message: e.message }); }
})

export default router