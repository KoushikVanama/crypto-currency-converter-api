import axios from 'axios';
import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get("/top-cryptos", async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
            params: {
                'vs_currency': 'usd',
                'order': 'market_cap_desc',
                'per_page': 100,
                'page': 1,
            }
        });
        const cryptos = response.data;
        res.status(200).json(cryptos);
    } catch (error) {
        console.error("Error in fetching top cryptos");
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
