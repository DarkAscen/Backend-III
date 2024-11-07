import { userModel } from "../models/user.model.js";
import { productModel } from "../models/product.model.js";
import { faker } from "@faker-js/faker";

class MockService {
    async createMocksUsers(req, res, next) {
        const { quantity } = req.params;
        for (let i = 0; i < quantity; i++) {
            const first_name = faker.person.firstName().toLowerCase();
            const last_name = faker.person.lastName().toLowerCase();
            const data = {
                first_name,
                last_name,
                email: first_name + last_name + "@fakemail.com",
                password: "fakepassword",
                age: Math.floor(Math.random() * (50 - 18 + 1)) + 18,
                role: "user",
                carts: [],
            };
            const one = await userModel.create(data);
        }
        return res.status(201).json({
            message: "Users created successfully",
        });
    };

    async createMockProducts(req, res, next) {
        const products = productModel.find();
        const { quantity } = req.params;

        for (let i = 0; i < quantity; i++) {
            const title = faker.commerce.productName();
            const description = faker.commerce.productDescription();
            const code = "code " + products.map(product => parseInt(product.code.split(' ')[1]));
            const price = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
            const status = true;
            const stock = 20;
            const category = "category " + Math.floor(Math.random() * 5) + 1;
            const data = {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
            };
            const one = await productModel.create(data);
        }
        return res.status(201).json({
            message: "Products created successfully",
        });
    };
}

export const mockService = new MockService();