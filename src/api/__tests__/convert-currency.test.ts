import request from 'supertest';
import express, { Application } from 'express';
import axios from 'axios';
import convertCurrency from '../convert-currency';

jest.mock('axios');

const app: Application = express();
app.use('/api', convertCurrency);

describe('GET /api/convert-currency', () => {
    it('should convert currency successfully', async () => {
        // to return a successful response
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: { bitcoin: { usd: 50000 } } });

        const response = await request(app).get('/api/convert-currency').query({
            sourceCrypto: 'bitcoin',
            amount: '1',
            targetCurrency: 'usd',
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            convertedAmount: 50000,
            sourceCrypto: 'bitcoin',
            amount: '1',
            targetCurrency: 'usd',
            exchangeRate: 50000,
        });
    });

    it('should handle invalid parameters', async () => {
        const response = await request(app).get('/api/convert-currency').query({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Bad request, Invalid parameters' });
    });

    it('should handle errors gracefully', async () => {
        // to return an error
        (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

        const response = await request(app).get('/api/convert-currency').query({
            sourceCrypto: 'bitcoin',
            amount: '1',
            targetCurrency: 'usd',
        });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});
