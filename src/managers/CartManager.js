import { productManager } from "./ProductManager.js";
import { ticketModel } from "../models/ticket.model.js";
import { userManager } from "./UserManager.js";
import { v4 as uuid } from "uuid";

class CartManager {
    constructor(productManager) {
        this.productManager = productManager;
    }

    async getCarts() {
        try {
            return await cartService.getCarts();
        } catch (error) {
            res.status(500).json({ message: "Error while finding carts", details: error.message });
        }
    }

    async getCartById(cid) {
        try {
            const cart = await cartService.getCartById(cid);

            if (!cart) {
                res.status(404).json({ message: "Cart not found"});
            } else {
                return cart;
            }
        } catch (error) {
            res.status(500).json({ message: "Error while finding cart", details: error.message });
        }
    }

    async getProductsInCart(cid) {
        try {
            const cart = await cartService.getCartById(cid).populate("products.product");

            if (!cart) {
                res.status(404).json({ message: "Cart not found"});
            } else {
                return cart.products;
            }
        } catch (error) {
            res.status(500).json({ message: "Error while getting products", details: error.message });
        }
    }

    async addCart() {
        try {
            return await cartService.addCart();
        } catch (error) {
            res.status(500).json({ message: "Error while adding cart", details: error.message });
        }
    }

    async addProductToCart(cid, pid) {
        const product = await productManager.getProductById(pid);
        const cart = await cartService.getCartById(cid);
        if (!cart) {
            res.status(404).json({ message: "Cart not found"});
        } 

        if (!product) {
            res.status(404).json({ message: "Product not found"});
        }
        
        try {
            const productAlreadyExists = cart.products.find(product => product.product === pid);

            if (productAlreadyExists) {
                productAlreadyExists.quantity += 1;
            } else {
                cart.products.push({ product: pid, quantity: 1});
            }
            await cart.save();
            res.status(201).json({ message: "Product added correctly"});
        } catch (error) {
            res.status(500).json({ message: "Error while adding product to cart", details: error.message });
        }
    } 

    async updateProductQuantity(cid, pid, quantity) {
        const product = await productManager.getProductById(pid);
        const cart = await cartService.getCartById(cid);
        
        if (!cart) {
            res.status(404).json({ message: "Cart not found"});
        } 

        if (!product) {
            res.status(404).json({ message: "Product not found"});
        }

        try {
            const productAlreadyExists = cart.products.find(product => product.product === pid);

            if (productAlreadyExists) {
                productAlreadyExists.quantity = quantity;
            } else {
                res.status(404).json({ message: "Product not found"});
            }
            await cart.save();
            res.status(200).json({ message: "Product quantity updated correctly"});
        } catch (error) {
            res.status(500).json({ message: "Error while updating product", details: error.message });
        }
    }

    async updateCartProducts(cid, products) {
        const cart = await cartService.getCartById(cid);
        if (!cart) {
            res.status(404).json({ message: "Cart not found"});
        } 

        try {
            cart.products = products;
            await cart.save();
            res.status(200).json({ message: "Cart products updated correctly"});
        } catch (error) {
            res.status(500).json({ message: "Error while updating cart", details: error.message });
        }
    }

    async deleteProductFromCart(cid, pid) {
        const product = await productManager.getProductById(pid);
        const cart = await cartService.getCartById(cid);
        
        if (!cart) {
            res.status(404).json({ message: "Cart not found"});
        } 

        if (!product) {
            res.status(404).json({ message: "Product not found"});
        }
        
        try {
            const index = cart.products.findIndex(product => product.product === pid);
            cart.products.splice(index, 1);
            await cart.save();
        } catch (error) {
            res.status(500).json({ message: "Error while deleting product", details: error.message });
        }
    }
    
    async deleteProductsFromCart(cid) {
        const cart = await cartService.getCartById(cid);
        if (!cart) {
            res.status(404).json({ message: "Cart not found"});
        } 

        try {
            cart.products = [];
            await cart.save();
            res.status(200).json({ message: "Products deleted correctly"});
        } catch (error) {
            res.status(500).json({ message: "Error while deleting products", details: error.message });
        }
    }

    async purchaseCart(req, res) {
        try {
            const { id } = req.params;

            const user = await userManager.getUserById(req.user.id);

            const cart = await cartManager.getCartById(id).populate("products.product");

            if (!cart) {
                return res.status(404).json({ error: "Cart not found" });
            }

            const productsWithoutStock = [];

            cart.products.forEach(p => {
                if (product.quantity > p.product.stock) {
                    productsWithoutStock.push({
                        pid: p.product._id,
                        product: p.product.title,
                        quantity: p.quantity,
                        stock: p.product.stock,
                    });
                }
            });

            if (productsWithoutStock.length > 0) {
                return res.status(400).json({ error: "Some products are out of stock", details: productsWithoutStock });
            };

            const promises = cart.products.map(p => productManager.updateProductStock(p.product._id, p.quantity));

            await Promise.all(promises);

            const amount = cart.products.reduce((acc, p) => acc + p.quantity * p.product.price, 0);

            const ticket = await ticketModel.create({ code: uuid(), purchase_date: new Date(), amount, purchaser: {
                _id: req.user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            }, cart: cart._id });

            res.status(200).json({ message: "Cart purchased successfully", ticket });
        } catch (error) {
            res.status(500).json({ error: "Error while purchasing cart", details: error.message });
        }
    } 
}

export const cartManager = new CartManager();
