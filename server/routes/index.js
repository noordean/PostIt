import user from './user';
import group from './group';
import message from './message';

module.exports = (app) => {
  app.use('/', user);
  app.use('/', group);
  app.use('/', message);
};

