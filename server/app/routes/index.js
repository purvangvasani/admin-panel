/**
 * This file configures routing mechanism
 */

// Inject node module dependencies
const authRoutes = require('./auth');
const profileRoutes = require('./profile');
const rolesRoutes = require('./roles');
const userRoutes = require('./users');
const express = require('express');
const depositeRoutes = require('./deposite');
const pauoutsRoutes = require('./payouts');
module.exports = function (app) {
  // get an instance of the router for api routes
  const apiRoutes = express.Router();

  authRoutes(apiRoutes);
  profileRoutes(apiRoutes);
  rolesRoutes(apiRoutes);
  userRoutes(apiRoutes);
  depositeRoutes(apiRoutes);
  pauoutsRoutes(apiRoutes);

  // Add prefix to routes
  app.use('/admin-panel/', apiRoutes); // Assign name to end points (e.g., '/api/management/', '/api/users' ,etc. )
};