/**
 * @jest-environment node
 */


import supertest from 'supertest'
import { Chance } from 'chance'
import app from '../server/server'

// Test for error handler
describe('404 error handler', () => {
  test('should respond with a 404 status code for unknown API route', async () => {
    const res = await supertest(app).get('/non-existent-request')
    expect(res.statusCode).toEqual(404)
  })
})
