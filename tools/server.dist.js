import express from 'express';
import getQuizData from '../src/data';
import path from 'path';
import compression from 'compression';

const app = express();
const port = process.env.PORT || 3000;

app.use(compression());

app.use(express.static('dist'));

app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../dist/index.html'));
});

app.get('/data/:count', async (req, res) => res.json(await getQuizData(req.params.count)));

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  }
  else {
    console.info(`App listening on port ${port}`)
  }
});

