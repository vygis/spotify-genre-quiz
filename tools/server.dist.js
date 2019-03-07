import express from 'express';
import quizData$ from '../src/data';
import path from 'path';
import compression from 'compression';

const app = express();
const port = process.env.PORT || 3000;

app.use(compression());

app.use(express.static('dist'));

app.get('/data/:count', (req, res) => {
  quizData$(req.params.count).subscribe({
    next: data => res.json(data),
    error: err => res.status(500).json({error: err.stack})
  });
});

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../dist/index.html'));
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  }
  else {
    console.info(`App listening on port ${port}`)
  }
});

