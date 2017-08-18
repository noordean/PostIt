import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import router from './routes/route';
import webpackConfig from '../webpack.config';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, token, userrs');
  next();
});

app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(webpackHotMiddleware(webpack(webpackConfig)));

app.listen(process.env.PORT || 3333, () => {
  console.log('app running...');
});

app.use('/', router);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
});

export default app;
