import { Router } from "express"
import cartsModel from "../models/carts.js"
const router = Router()

router.get("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid
        const result = await cartsModel.find({ _id: cartId })
        //console.log();
        const data = result.map((element) => {
            title: element.products.product.title
        })
        console.log(data);
        res.render("showCarts", { result })
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

const updateCart = (cart, productId) => {
    const indexProduct = cart.products.findIndex(element => element.product.toString() === productId);
    if (indexProduct < 0) {
        cart.products.push({ product: productId, quantity: 1 });
    } else {
        cart.products[indexProduct].quantity += 1;
    }
}
export default router