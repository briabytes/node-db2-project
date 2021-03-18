const vinValidator = require('vin-validator');
const Car = require('./cars-model');

const checkCarId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const car = await Car.getById(id);
    if(car) {
      req.car = car;
      next();
    }else {
      res.status(404).json({
        message: `car with id ${id} is not found`
      });
    }
  }catch(e) {
    next(e);
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;

  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: `request is missing a car object`
    });
  }else if(!vin) {
    res.status(400).json({
      message: `vin is missing`
    });
  }else if(!make) {
    res.status(400).json({
      message: `make is missing`
    });
  }else if(!model) {
    res.status(400).json({
      message: `model is missing`
    });
  }else if(!mileage) {
    res.status(400).json({
      message: `mileage is missing`
    });
  }else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;

  if(vinValidator.validate(vin)) {
    next();
  }else {
    res.status(400).json({
      message: `vin ${vin} is invalid`
    });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body;
  const car = await Car.getByVin(vin);

  if(car) {
    res.status(400).json({
      message: `vin ${vin} already exists`
    });
  }else {
    next();
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
