import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { clean } from 'config';
import routes from './routes';

const app = express();

app.set('trust proxy', true);
app.disable('x-powered-by');
app.use('/public', express.static(path.join(__dirname, '..', 'public/')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const basePath = process.env.ASSETS_PATH;

app.use((req, res, next) => {
  res.render = () => {
    res.send(
      `
      <!DOCTYPE html>
      <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes">
        <script id="hf-config">window.__CONFIG__ = ${JSON.stringify(clean())}; console.log('set config', ${JSON.stringify(clean())})</script>
        <link rel="preload" as="script" href="${basePath}/javascripts/vendors~index.bundle.js" />
        <link rel="preload" as="script" href="${basePath}/javascripts/styles.bundle.js" />
        <link rel="preload" as="script" href="${basePath}/javascripts/index.bundle.js" />
        <link href="${basePath}/stylesheets/styles.css" type="text/css" rel="stylesheet">
        </head>
        <body>
        <div id="react-app"></div>
        <script src="${basePath}/javascripts/styles.bundle.js" ></script>
        <script src="${basePath}/javascripts/vendors~index.bundle.js" ></script>
        <script src="${basePath}/javascripts/index.bundle.js" ></script>
        </body>
      </html>
    `.trim(),
    );
  };
  next();
});

app.use(routes);

app.get('*', (req, res) => {
  res.render();
});

app.use((error, req, res, next) => {
  const code = error.code || 500;
  console.error(error);
  res.status(code).end(error.message);
  next();
});

app.listen(process.env.PORT || 3000, () => {
  app.set('serverinit', true);
  console.log('listening');
});
