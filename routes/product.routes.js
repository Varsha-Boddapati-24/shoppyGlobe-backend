import express from "express"
import validateFields from "../middleware/validate.js";
import {createProduct,updateProduct,getAllProducts,getProductById,deleteProduct} from "../controllers/product.controller.js"
import authenticateUser from "../middleware/authenticate.js";
const productRouter=express.Router();
const productFields = ["name", "description", "price", "stock"];
// @route GET /api/products - Get all products 
productRouter.get("/",getAllProducts)
// @route GET /api/products/:id - Get product by ID 
productRouter.get("/:id",getProductById)
// @route POST /api/products - Create a new product |
productRouter.post("/", authenticateUser, validateFields(productFields),createProduct)
// @route PUT /api/products/:id - Update a product 
productRouter.put("/:id",authenticateUser, validateFields(productFields),updateProduct)
// @route DELETE /api/products/:id - Delete a product
productRouter.delete("/:id",authenticateUser,deleteProduct)


export default productRouter;