import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/route';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000, () => {
  console.log('app running...');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, token');
  next();
});

app.use('/', router);

export default app;
