const db = require('../../data/db-config');

const getAll = () => {
  return db('cars');
}

const getById = (id) => {
  return db('cars').where({ id }).first();
}

const create = async (car) => {
  await db('cars').insert(car)
  return db('cars').where('vin', car.vin).first()
}

const getByVin = (vin) => {
  return db('cars').where({ vin }).first()
}

module.exports = {
  getAll,
  getById,
  create,
  getByVin
}