const { db, Gardener, Plot, Vegetable } = require('./models');

const vegetableData = [
  {
    name: 'Kale',
    color: 'Green',
    planted_on: new Date()
  },
  {
    name: 'Eggplant',
    color: 'Purple',
    planted_on: new Date()
  },
  {
    name: 'Watermelon',
    color: 'Pink',
    planted_on: new Date()
  },
];

db.sync({ force: true })
.then(() => {
  console.log('Database synced!');

  // start seeding
  // STEP 1 - create rows without associations
  const promiseForVegetables = Vegetable.bulkCreate(vegetableData, {returning: true});
  return promiseForVegetables;
})
.catch((err) => {
  console.log('Error occurred: ', err);
})
.finally(() => {
  db.close();
});


