const express = require('express');
// const appRoutes = require('./app-routes.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ title: 'API', message: 'Version 1.0.0' });
});

// router.use('/app', appRoutes);

router.all('*', (req, res) => {
  // winston.error(`${404} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(404).send('Not found');
});

module.exports = router;
