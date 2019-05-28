const app = require('./app');
const { syncAndSeed } = require('./db');

const port = process.env.PORT || 3000;

syncAndSeed().then(() => {
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`Listening on port ${port}...`));
});
