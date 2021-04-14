const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  const { id } = req.params
  try {
    const car = await Cars.getById(id)
    if(car) {
      req.car = car
      next();
    }else {
      res.status(404).json({
        message: `car with id ${car} is not found`
      });
    }
  }catch(error) {
    next(error);
  }
}

const checkCarPayload = async (req, res, next) => {
  const { vin, make, model, mileage } = req.body
  try {
    if(!vin) {
      res.status(400).json({
        message: 'vin is missing'
      });
    }if(!make) {
      res.status(400).json({
        message: 'make is missing'
      });
    }if(!model) {
      res.status(400).json({
        message: 'model is missing'
      });
    }if(!mileage) {
      res.status(400).json({
        message: 'mileage is missing'
      });
    }else {
      next()
    }
  }catch(error) {
    next(error);
  }
}

const checkVinNumberValid = async (req, res, next) => {
  const { vin } = req.body
  try {
    if(vinValidator.validate(vin)) {
      next();
    }else {
      res.status(400).json({
        message: `vin ${vin} is invalid`
      });
    }
  }catch(error) {
    next(error);
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body
  try {
    const car = await Cars.getByVin(vin)
      if(car) {
        res.status(400).json({
          message: `vin ${vin} already exists`
        });
      }else {
        next();
      }
  }catch(error) {
    next(error);
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
