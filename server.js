const express = require('express');
const { db, Gardener, Plot, Vegetable } = require('./models');
const server = express();

server.use(express.json());

db.authenticate().
then(() => {
  console.log('connected!');
});

server.get('/', async (req, res, next) => {
  try {
    const gardeners = await Gardener.findAll();
    res.send(gardeners);
  } catch (err) {
    console.log(err);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${3000}`);
});


