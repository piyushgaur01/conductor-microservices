var express = require('express');
const Joi = require('joi');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/validate', async (req, res) => {
  const { body } = req;

  const schema = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    ssn: Joi.string().regex(/^\d{3}-\d{2}-\d{4}$/).required()
  });

  try {
    const value = await schema.validateAsync({
      first_name: body.first_name,
      last_name: body.last_name,
      ssn: body.ssn
    });
    console.log(value);
    res.send(value);
  }
  catch (err) {
    res.status(400).send({
      result: err.message
    });
  }
});

module.exports = router;
