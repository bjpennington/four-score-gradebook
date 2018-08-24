let app = require('../server');
let testServer = require('supertest');

describe('testing express apis', () => {
    test('the /api/classroom route returns a 403 when unauthenticated', async ()  => {
        let response = await testServer(app).get('/api/classroom');
        expect(response.statusCode).toBe(403);
    });
});