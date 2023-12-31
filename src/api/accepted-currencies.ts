import axios from 'axios';
import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get("/accepted-currencies", async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/supported_vs_currencies`);
        const currencies = response.data;
        res.status(200).json(currencies);
    } catch (error) {
        console.error("Error in fetching currencies");
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
