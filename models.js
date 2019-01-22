const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/plantr');

const Gardener = db.define('gardener', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER
});

const Plot = db.define('plot', {
  size: Sequelize.INTEGER,
  shaded: Sequelize.BOOLEAN
});

const Vegetable = db.define('vegetable', {
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  planted_on: Sequelize.DATE
});

// create foreign key in Plot that points to an instance of Gardener
Plot.belongsTo(Gardener);
Gardener.hasOne(Plot);

// create a JOIN table called vegetable_plot with vegetableId & plotId
Vegetable.belongsToMany(Plot, {through: 'vegetable_plot'});
Plot.belongsToMany(Vegetable, {through: 'vegetable_plot'});

// create foreign key in Gardener that points to an instance of Vegetable
Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'});

module.exports = { db, Gardener, Plot, Vegetable };
