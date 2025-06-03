import productModel from "../models/product.model.js";

// ------------------------ Get All Products ------------------------
export const getAllProducts = async (req, res) => {
    try {
          // Fetch all products from the database
        const products = await productModel.find()
         // If no products found, return 404
        if (!products) {
            return res.status(404).json({ error: "No Product Found" })
        }
          // Return all products
        res.status(200).json(products)
    }
    catch (error) {
        //handle server error
        console.error("Error fetching  products:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}
// ------------------------ Get Product By ID ------------------------
export const getProductById = async (req, res) => {
    try {
        // Extract product ID from URL params
        const productId = req.params.id;
        // Find product by its ID
        const product = await productModel.findById(productId)
         // If product not found, return 404
        if (!product) {
            return res.status(404).json({ error: "Product not found" })
        }
        // Return the found product
        res.status(200).json(product)
    }
    catch (error) {
         //handle server error
        console.error("Error fetching  product:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}
// ------------------------ Create New Product ------------------------

export const createProduct = async (req, res) => {
    try {
         // Destructure product fields from request body
        const { name, price, description, stock } = req.body;
         // Create a new product object
        const newProduct = {
            name,
            price,
            description,
            stock,
        };
          // Save the new product to the database
        const savedProduct = await productModel.create(newProduct);
        
        // Return the created product with 201 Created status
        res.status(201).json(savedProduct);
    }
    catch (error) {
         //handle server error
        console.error("Error creating product:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }

}
// ------------------------ Update Product ------------------------
export const updateProduct = async (req, res) => {
    try {
           // Extract product ID from URL params
        const productId = req.params.id;
          // Find product by ID and update it with request body data
        const updatedProduct = await productModel.findByIdAndUpdate(productId, req.body, { new: true })
          // If product not found, return 404
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" })
        }
          // Return success message with updated product
        res.status(200).json({ message: "Product updated successfully", updatedProduct});
    }
    catch (error) {
         //handle server error
        console.error("Error updating product:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }

}
// ------------------------ Delete Product ------------------------
export const deleteProduct=async(req,res)=>{
    try{
          // Extract product ID from URL params
          const productId = req.params.id;
          
        // Find and delete the product by ID
        const deletedProduct = await productModel.findByIdAndDelete(productId)
          // If product not found, return 404
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" })
        }
        // Return success message with deleted product info
          res.status(200).json({ message: "Product deleted successfully", deletedProduct });

    }
      catch (error) {
         //handle server error
        console.error("Error deleting product:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}