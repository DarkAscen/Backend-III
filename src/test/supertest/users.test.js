import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:" + PORT + "/api");
const PORT = process.env.PORT;
const dbName = process.env.MONGO_URI;

describe(
    "Users Routes",
    () =>{
        it(
            "Get all users",
            async () => {
                const response = await requester.get("/users");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(200);
            }
        )
        it(
            "Get user by id",
            async () => {
                const response = await requester.get("/users/uid");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(200);
            }
        )
        it(
            "Add user",
            async () => {
                const response = await requester.post("/users");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(201);
            }
        )
        it(
            "Update user",
            async () => {
                const response = await requester.put("/users/uid");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(200);
            }
        )
        it(
            "Delete user",
            async () => {
                const response = await requester.delete("/users");
                const { _body, statusCode} = response;
                expect(statusCode).to.equal(200);
            }
        )
    }
)