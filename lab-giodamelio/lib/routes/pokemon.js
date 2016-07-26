const Router = require('express').Router;

const router = new Router();

router.get('/', (req, res) => {
  res.send('Hello Pokemon');
});

module.exports = router;
