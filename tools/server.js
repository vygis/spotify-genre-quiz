import express from 'express';
import getQuizData from '../src/data';
import path from 'path';
import webpack from 'webpack';
import config from '../webpack.config.js';

const app = express();
const compiler = webpack(config);
const port = process.env.PORT || 3000;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.get('/data/:count', async (req, res) => res.json(await getQuizData(req.params.count)));

app.listen(port, () => console.info(`App listening on port ${port}`));
