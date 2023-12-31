import request from 'supertest';
import express, { Application } from 'express';
import axios from 'axios';
import currenciesRouter from '../accepted-currencies';

jest.mock('axios');

const app: Application = express();
app.use('/api', currenciesRouter); // Assuming the route is mounted under /api

describe('GET /api/accepted-currencies', () => {
  it('should return a list of accepted currencies', async () => {
    // to return a successful response
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: ['usd', 'eur', 'btc'] });

    const response = await request(app).get('/api/accepted-currencies');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(['usd', 'eur', 'btc']);
  });

  it('should handle errors gracefully', async () => {
    // to return an error
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    const response = await request(app).get('/api/accepted-currencies');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });
});
