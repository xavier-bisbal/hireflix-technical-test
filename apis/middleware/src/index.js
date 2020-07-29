import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from 'routes';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '25mb' }));
app.use(bodyParser.json({ extends: true, limit: '25mb' }));

app.use('/', routes);

app.all('*', (req, res) => {
  res.status(404).end();
});

app.use((err, req, res, next) => {
  const code = err.code || err.statusCode || 500;
  res.status(code).json({
    code,
    error: err.message,
  });
  next();
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`listening ${process.env.PORT || 3001}`);
});
