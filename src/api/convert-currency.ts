import axios from 'axios';
import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get("/convert-currency", async (req: Request, res: Response) => {
    try {
        const { sourceCrypto, amount, targetCurrency } = req.query as {
            sourceCrypto: string;
            amount: string;
            targetCurrency: string;
        };
        console.log(sourceCrypto, amount, targetCurrency)
        if (!sourceCrypto || !amount || !targetCurrency) {
            return res.status(400).json({ error: 'Bad request, Invalid parameters' });
        }
        const exchangeRateResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: sourceCrypto,
                vs_currencies: targetCurrency,
            },
        });
        const exchangeRate = exchangeRateResponse.data[sourceCrypto][targetCurrency];
        const convertedAmount = parseFloat(amount) * exchangeRate;

        res.json({ convertedAmount, sourceCrypto, amount, targetCurrency, exchangeRate });
    } catch (error) {
        console.error('Error performing currency conversion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
