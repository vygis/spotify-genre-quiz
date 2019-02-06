import express from 'express';
import getResults from './data';
const app = express();
const port = 3000

app.get('/', async (req, res) => res.json(await getResults(5)));

app.get('/data/:count', async (req, res) => res.json(await getResults(req.params.count)));

app.listen(port, () => console.info(`App listening on port ${port}`));
