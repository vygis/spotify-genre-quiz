import express from 'express';
import getQuizData from './data';
import path from 'path';
const app = express();
const port = 3000

// app.get('/', async (req, res) => res.json(await getQuizData(5)));
app.use(express.static('dist'));

app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.get('/data/:count', async (req, res) => res.json(await getQuizData(req.params.count)));

app.listen(port, () => console.info(`App listening on port ${port}`));
