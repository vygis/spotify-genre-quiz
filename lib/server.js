import express from 'express';
import getQuizData from './data';
const app = express();
const port = 3000

app.get('/', async (req, res) => res.json(await getQuizData(5)));

app.get('/data/:count', async (req, res) => res.json(await getQuizData(req.params.count)));

app.listen(port, () => console.info(`App listening on port ${port}`));
