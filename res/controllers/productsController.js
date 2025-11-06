const {Product} = require("../model");

require("dotenv").config();

async function createProduct(req, res) {
    const {name, description, price, category, image} = req.body;

    try {
        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            image
        });
        res.status(201).json({
            status: "success",
            data: {
                product: newProduct
            }
        });
    } catch (error) {
        res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
}
async function getAllProducts(req, res) {
    try {
        const products = await Product.find();  
        res.status(200).json({
            status: "success",
            results: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({ error: `Internal Server Error: ${error}` });
    }

}
async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({
            status: "success",
            data: {
                product
            }
        });
    }
    catch (error) {
        res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
}
async function updateProduct(req, res) {
    try {
        const updatedProduct = await
            Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }   
        res.status(200).json({
            status: "success",
            data: {
                product: updatedProduct
            }
        });
    } catch (error) {
        res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
}
async function deleteProduct(req, res) {
    try {   
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(204).json({
            status: "success",
            data: null
        });
    } catch (error) {
        res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
}   
module.exports = {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct}; 

