import request from 'supertest';
import express, { Application } from 'express';
import axios from 'axios';
import topCryptos from '../top-cryptos';

jest.mock('axios');

const app: Application = express();
app.use('/api', topCryptos);

describe('GET /api/top-cryptos', () => {
    it('should return a list of top cryptos', async () => {
        // to return a successful response
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: [{ id: 'bitcoin', name: 'Bitcoin' }] });

        const response = await request(app).get('/api/top-cryptos');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 'bitcoin', name: 'Bitcoin' }]);
    });

    it('should handle errors gracefully', async () => {
        // to return an error
        (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

        const response = await request(app).get('/api/top-cryptos');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});
