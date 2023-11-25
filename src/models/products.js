import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const collection = "products"
const productsSchema = mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    thumbnail: { type: String, require: true },
    code: {
        type: Number,
        require: true,
        unique: true
    },
    stock: { type: Number, require: true }
})
productsSchema.plugin(mongoosePaginate)
const productsModel = mongoose.model(collection, productsSchema)
export default productsModel