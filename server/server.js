import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../webpack.config';

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, '../client/src/build')));
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, token, currentmembers, mailToken');
  next();
});

if (process.env.NODE_ENV === 'development') {
  app.use(webpackMiddleware(webpack(webpackConfig)));
  app.use(webpackHotMiddleware(webpack(webpackConfig)));
}

app.listen(process.env.PORT || 3333, () => {
});

require('./routes')(app);

if (process.env.NODE_ENV === 'development') {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/src/index.html'));
  });
}

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/build/index.html'));
});

export default app;
