// app.test.js
const request = require('supertest'); 
const { app, pool } = require('../app.js');

describe('GET /users', () => {
  it('should return status 200 and an array of users', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should return users with correct fields', async () => {
    const res = await request(app).get('/users');

    res.body.forEach(user => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
    });
  });

  

  it('should not expose sensitive fields like password', async () => {
    const res = await request(app).get('/users');
    res.body.forEach(user => {
      expect(user).not.toHaveProperty('password');
    });
  });

  afterAll(async () => {
    await pool.end(); // Clean up the database connection
  });
});
