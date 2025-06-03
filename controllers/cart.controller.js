import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

/* ------------------ GET CART BY USER ID ------------------ */
// Controller to get the cart of the currently logged-in user
export const getCartByUserId = async (req, res) => {
  try {
    // Extract userId from the authenticated user (set by auth middleware)
    const userId = req.user.id;
    // Find the cart document for the current user
    const cart = await cartModel.findOne({ userId })
    // If no cart found, return 404 Not Found
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // If cart found, return it with status 200
    res.status(200).json(cart);
  } catch (error) {
    // Handle unexpected errors
    console.error("Fetching cart failed:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

/* ------------------ GET ALL CARTS ------------------ */
// Controller to fetch all carts 
export const getAllCarts = async (req, res) => {
  try {
    // Fetch all cart documents from the database
    const carts = await cartModel.find();
    // If no carts exist, return 404
    if (carts.length === 0) {
      return res.status(404).json({ message: "no cart found" });
    }
    // Return the list of carts
    res.status(200).json(carts);
  } catch (error) {
    // Handle unexpected errors
    console.error("Fetching all carts failed:", error);
    res.status(500).json({ error: "Failed to fetch carts" });
  }
};
/* ------------------ ADD ITEM TO CART ------------------ */
// Controller to add a product to the user's cart
export const addItemToCart = async (req, res) => {
  try {
    // Extract userId
    const userId = req.user.id;
    // Destructure productId and quantity from request body
    const { productId, quantity } = req.body;
    // Check if product exists in the product collection
    const productExists = await productModel.findById(productId);
    if (!productExists) {
      return res.status(404).json({ error: "Product not found" });
    }
    // Validate that quantity is a positive number
    if (typeof quantity !== 'number' || quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be positive number" });
    }
    // updating the quantity if product already exists in the user's cart

    const updatedCart = await cartModel.findOneAndUpdate(
      { userId, "items.productId": productId },// Match user and product
      { $inc: { "items.$.quantity": quantity } }, // Increment quantity
      { new: true }// Return the updated document
    )
    // If product was found and quantity updated, return the updated cart
    if (updatedCart) {
      return res.status(200).json(updatedCart);
    }
  // If product not in cart or cart doesn't exist, push new item or create new cart
    const cart = await cartModel.findOneAndUpdate(
      { userId },
      { $push: { items: { productId, quantity } } },
      { upsert: true, new: true }
    )
    // Return new cart
    return res.status(201).json(cart);
  }
  catch (error) {
    // Handle unexpected errors
    console.error("Add to cart failed:", error);
    res.status(500).json({ error: "Failed to add to cart" });

  }

}

/* ------------------ UPDATE CART ITEM QUANTITY ------------------ */
// Controller to update quantity of a specific product in the user's cart
export const updateCartItem = async (req, res) => {
  try {
    // Extract userId 
    const userId = req.user.id;

    // Get productId from request params
    const productId = req.params.id;
    // Destructure quantity from request body
    const { quantity } = req.body;
    // Check if product exists
    const productExists = await productModel.findById(productId);
    if (!productExists) {
      return res.status(404).json({ error: "Product not found" });
    }
    // Validate that quantity is a positive number
    if (typeof quantity !== 'number' || quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be a positive number" });
    }
    // Find and update the product quantity in the user's cart
    const updatedCart = await cartModel.findOneAndUpdate(
      { userId, "items.productId": productId },// Match user and product
      { $set: { "items.$.quantity": quantity } },// Set new quantity
      { new: true } // Return updated document
    );
    // If cart or item doesn't exist, return 404
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart or product not found" });
    }
    // Return success response with updated cart
    res.status(200).json({ message: "Cart item updated", cart: updatedCart });
  }
  catch (error) {
    // Handle errors
    console.error("Updating cart failed:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
/* ------------------ REMOVE ITEM FROM CART ------------------ */
// Controller to remove a specific product from the user's cart
export const removeItemFromCart = async (req, res) => {
  try {
    // Extract userId and productId
    const userId = req.user.id;
    const productId = req.params.id;
    // Check if user's cart exists
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // Check if the product exists in the cart items array
    const itemExists = cart.items.some(
      item => item.productId.toString() === productId
    );
    if (!itemExists) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    // Remove the product from the items array
    const updatedCart = await cartModel.findOneAndUpdate(
      { userId },// Match user
      { $pull: { items: { productId } } },// Remove item
      { new: true }// Return updated cart
    );
    // Return success response with updated cart
    res.status(200).json({ message: "Item removed from cart", updatedCart });
  } catch (error) {
    // Handle unexpected errors
    console.error("Remove from cart failed:", error);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};
/* ------------------ CLEAR ENTIRE CART ------------------ */
// Controller to clear all items from a user's cart
export const clearCart = async (req, res) => {
  try {
    // Extract userId
    const userId = req.user.id;
    // Delete the entire cart document
    const deletedCart = await cartModel.findOneAndDelete({ userId });
    // If cart not found, return 404
    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // Return success message
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    // Handle unexpected errors
    console.error("Clearing cart failed:", error);
    res.status(500).json({ error: "Failed to clear cart" });
  }
};
