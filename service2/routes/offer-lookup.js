var express = require('express');
// const path = require('path');
var fs = require('fs');
const { builtinModules } = require('module');
var path = require('path');
var router = express.Router();

const mockData =
  /* GET users listing. */
  router.get('/', function (req, res, next) {
    const { body } = req;
    var jsonPath = path.join(__dirname, '..','data', 'MOCK_DATA.json');
    const mockData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const ret = mockData.find((user) => {
      return (user.last_name === body.last_name
      && user.first_name === body.first_name
      && user.ssn === body.ssn)
    });
    if (ret) {
      res.send(ret);
    } else {
      res.status(404).send('NO OFFER!');
    }
  });

module.exports = router;
