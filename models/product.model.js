import mongoose from "mongoose"

// ------------------ Product Schema Definition ------------------
// Includes essential fields like name, price, description, and stock quantity.
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },

}, {
    timestamps: true,// Automatically adds createdAt and updatedAt fields
})
// Creating the product model from the schema
const productModel = mongoose.model("products", productSchema)
// Exporting the model for use in controllers
export default productModel;