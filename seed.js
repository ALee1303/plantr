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

const gardenerData = [
  {
    name: 'Kyle',
    age: 1
  },
  {
    name: 'Elmer',
    age: 50
  },
  {
    name: 'Wilma',
    age: 20
  },
];

const plotData = [
  {
    size: 7,
    shaded: true
  },
  {
    size: 20,
    shaded: false
  },
  {
    size: 100,
    shaded: false
  },
];

db.sync({ force: true })
.then(() => {
  console.log('Database synced!');

  // start seeding
  // STEP 1 - create rows without associations
  const promiseForVegetables = Vegetable.bulkCreate(vegetableData, {returning: true});
  const promiseForGardeners = Gardener.bulkCreate(gardenerData, {returning: true});
  const promiseForPlots = Plot.bulkCreate(plotData, {returning: true});

  return Promise.all([promiseForVegetables, promiseForGardeners, promiseForPlots]);
})
.then((insertedData)=> {
  // STEP 2 - create association.
  const [vegetables, gardeners, plots] = insertedData;
  const [kale, eggplant, watermelon] = vegetables;
  const [Kyle, Elmer, Wilma] = gardeners;
  const [small, medium, hell] = plots;

  // 2-1: plot association
  const promise1 = small.setGardener(Kyle);
  const promise2 = medium.setGardener(Elmer);
  const promise3 = hell.setGardener(Wilma);

  // 2-2: vegetable_plot association
  const promise4 = kale.setPlots([small, medium, hell]);
  const promise5 = eggplant.setPlots(medium);
  const promise6 = watermelon.setPlots([medium, hell]);
  //console.log(Object.keys(Kyle.__proto__));

  // 2-3: Gardener's favorite_vegetable association
  const promise7 = Kyle.setFavorite_vegetable(kale);
  const promise8 = Elmer.setFavorite_vegetable(eggplant);
  const promise9 = Wilma.setFavorite_vegetable(watermelon);

  return Promise.all([promise1, promise2, promise3, promise4, promise5, promise6, promise7, promise8, promise9]);
})
.catch((err) => {
  console.log('Error occurred: ', err);
})
.finally(() => {
  db.close();
});


