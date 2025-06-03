import mongoose from "mongoose"

// ------------------ Schema for Individual Cart Item ------------------
// Each item in the cart refers to a product and its selected quantity.
const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,// References the Product model
        ref: "productModel",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    }
})
// ------------------ Schema for User Cart ------------------
// Represents a single cart per user.
// Each cart is associated with one user and contains multiple cart items.
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,// References the User model
        ref: "User",
        required: true,
        unique: true,
    },
    items: [cartItemSchema] // Embeds an array of cart items
}, {
    timestamps: true,// Automatically adds createdAt and updatedAt fields
})
// Creating the Cart model from the schema
const cartModel = mongoose.model('Cart', cartSchema);
// Exporting the model for use in controllers
export default cartModel;