import mongoose from "mongoose";
const collection = "carts"
const cartSchema = mongoose.Schema({
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
            },
            quantity: {
                type: Number
            }
        }],
        default: []
    }
})
cartSchema.pre("findOne", () => {
    this.populate("products.product")
})
const cartModel = mongoose.model(collection, cartSchema)
export default cartModel