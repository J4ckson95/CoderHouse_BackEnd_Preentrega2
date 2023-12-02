import { Router } from "express"
import cartsModel from "../models/carts.js"
const router = Router()

router.get("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid
        const result = await cartsModel.find({ _id: cartId }).lean()
        res.render("showCarts", { data: result[0].products })
    } catch (e) { res.status(500).send({ status: "Error", message: e.message }); }
})
router.post("/product/:idp", async (req, res) => {
    try {
        const productId = req.params.idp
        let cart = await cartsModel.findOne()
        if (!cart) cart = await cartsModel.create({});
        updateCart(cart, productId)
        const result = await cartsModel.updateOne({ _id: cart._id }, { $set: { products: cart.products } })
        res.send({ status: "Success", result })
        res.json({ dataCartId: cart._id })
    } catch (e) { res.status(500).send({ status: "Error", message: e.message }); }
})
router.delete("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid
    const productId = req.params.pid
    const cart = await cartsModel.findOne({ _id: cartId })
    const newProducts = cart.products.filter((element) => element.product.toString() !== productId)
    await cartsModel.updateOne({ _id: cartId }, { $set: { products: newProducts } })
    res.send({ status: "Succes" })
})

const updateCart = (cart, productId) => {
    const indexProduct = cart.products.findIndex(element => element.product.toString() === productId);
    if (indexProduct < 0) {
        cart.products.push({ product: productId, quantity: 1 });
    } else {
        cart.products[indexProduct].quantity += 1;
    }
}
export default router