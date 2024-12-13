import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:" + PORT + "/api");
const PORT = process.env.PORT;
const dbName = process.env.MONGO_URI;

describe(
    "Products Routes",
    () =>{
        it(
            "Get all products",
            async () => {
                const response = await requester.get("/products");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(200);
            }
        )
        it(
            "Get product by id",
            async () => {
                const response = await requester.get("/products/pid");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(200);
            }
        )
        it(
            "Add product",
            async () => {
                const response = await requester.post("/products");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(201);
            }
        )
        it(
            "Update product data",
            async () => {
                const response = await requester.put("/products/pid");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(200);
            }
        )
        it(
            "Delete product",
            async () => {
                const response = await requester.delete("/products/pid");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(200);
            }
        )
    }
)