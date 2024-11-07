import { mockService } from "../services/mocks.service.js";

class MockManager {
    async createMockUsers(req, res, next) {
        return await mockService.createMocksUsers(req, res, next);
    }
    async createMockProducts(req, res, next) {
        return await mockService.createMockProducts(req, res, next);
    }
}   

export const mockManager = new MockManager();