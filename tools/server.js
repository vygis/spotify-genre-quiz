import express from 'express';
import path from 'path';
import webpack from 'webpack';
import config from '../webpack.config.js';
import quizData$ from '../src/data';

const app = express();
const compiler = webpack(config);
const port = process.env.PORT || 3000;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/data/:count', (req, res) => {
  quizData$(req.params.count).subscribe({
    next: data => res.json(data),
    error: err => res.status(500).json({error: err.stack})
  });
});

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, () => console.info(`App listening on port ${port}`));
