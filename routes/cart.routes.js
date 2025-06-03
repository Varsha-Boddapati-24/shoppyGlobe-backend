import express from "express"
import { addItemToCart ,updateCartItem,removeItemFromCart,clearCart,getAllCarts,getCartByUserId} from "../controllers/cart.controller.js";
import validateFields from "../middleware/validate.js";
import authenticateUser from "../middleware/authenticate.js";
const cartRouter=express.Router();
// Allowed fields for adding an item to cart
const addItemFields = ["productId", "quantity"];

// Allowed fields for updating cart item
const updateItemFields = ["quantity"];
// ------------------------ ROUTES ------------------------
// @route POST /api/cart/ - Add item to cart | Private
cartRouter.post("/",authenticateUser, validateFields(addItemFields),addItemToCart)
// @route PUT /api/cart/:id - Update item quantity in cart | Private
cartRouter.put("/:id",authenticateUser,  validateFields(updateItemFields),updateCartItem)
// @route DELETE /api/cart/:id - Delete a single item from cart | Private
cartRouter.delete("/:id", authenticateUser, removeItemFromCart);
// @route DELETE /api/cart/ - Clear entire cart for user | Private
cartRouter.delete("/", authenticateUser, clearCart);
// @route GET /api/cart/me - Get logged-in user's cart | Private
cartRouter.get("/me", authenticateUser, getCartByUserId);
// @route GET /api/cart/ - Get all carts | Private
cartRouter.get("/", authenticateUser, getAllCarts);


export default cartRouter;