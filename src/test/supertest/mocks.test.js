import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:" + PORT + "/api");
const PORT = process.env.PORT;
const dbName = process.env.MONGO_URI;

describe(
    "Mocks Routes",
    () =>{
        it(
            "Create product mocks",
            async () => {
                const response = await requester.get("/mocks/products/n");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(201);
            }
        )
        it(
            "Create user mocks",
            async () => {
                const response = await requester.get("/mocks/users/n");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(201);
            }
        )
    }
)