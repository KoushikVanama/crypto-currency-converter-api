import express from 'express';
const app = express();

const PORT = 4000;
import top100cryptos from './src/api/top-cryptos';

app.use("/api", top100cryptos);

app.listen(PORT, () => {
    console.log(`app listening on ${PORT}`);
});
