import express from 'express';
const app = express();

const PORT = 4000;
import top100cryptos from './src/api/top-cryptos';
import acceptedCurrencies from './src/api/accepted-currencies'

// app.use(express.json());

app.use("/api", top100cryptos);
app.use("/api", acceptedCurrencies);

app.listen(PORT, () => {
    console.log(`app listening on ${PORT}`);
});
