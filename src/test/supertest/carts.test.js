import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:" + PORT + "/api");
const PORT = process.env.PORT;
const dbName = process.env.MONGO_URI;

describe(
    "Carts Routes",
    () =>{
        it(
            "Get all carts",
            async () => {
                const response = await requester.get("/carts");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(200);
            }
        )
        it(
            "Get cart by id",
            async () => {
                const response = await requester.get("/carts/cid");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(200);
            }
        )
        it(
            "Add cart",
            async () => {
                const response = await requester.post("/carts");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(201);
            }
        )
        it(
            "Add product to cart",
            async () => {
                const response = await requester.post("/carts/cid/product/pid");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(201);
            }
        )
        it(
            "Update cart products",
            async () => {
                const response = await requester.put("/carts/cid");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(200);
            }
        )
        it(
            "Update product quantity",
            async () => {
                const response = await requester.put("/carts/cid/product/pid");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(200);
            }
        )
        it(
            "Delete product from cart",
            async () => {
                const response = await requester.delete("/carts/cid/product/pid");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(200);
            }
        )
        it( 
            "Delete products from cart",
            async () => {
                const response = await requester.delete("/carts/cid");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(200);
            }
        )
        it(
            "Purchase cart",
            async () => {
                const response = await requester.post("/carts/cid/purchase");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(200);
            }
        )
    }
)