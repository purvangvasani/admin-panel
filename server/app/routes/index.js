/**
 * This file configures routing mechanism
 */

// Inject node module dependencies
const authRoutes = require('./auth');
const profileRoutes = require('./profile');
const rolesRoutes = require('./roles');
const userRoutes = require('./users');
const express = require('express');
const transactionRoutes = require('./transactionRequest');
const payoutsRoutes = require('./payouts');
const banksRoutes = require('./banks');
const merchantRoutes = require('./merchant');
const accountDetailsRoutes = require('./accountDetails');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

module.exports = function (app) {
  // Get an instance of the router for API routes
  const apiRoutes = express.Router();

  // Swagger configuration
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Your API Title',
        version: '1.0.0',
        description: 'API Documentation',
      },
      servers: [
        {
          url: 'http://localhost:3000', // Adjust to your server URL
        },
      ],
    },
    apis: ['./app/routes/*.js'], // Path to the API docs
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);

  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  // Serve swagger.json
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocs);
  });

  // Define routes
  authRoutes(apiRoutes);
  profileRoutes(apiRoutes);
  rolesRoutes(apiRoutes);
  userRoutes(apiRoutes);
  transactionRoutes(apiRoutes);
  payoutsRoutes(apiRoutes);
  banksRoutes(apiRoutes);
  merchantRoutes(apiRoutes);
  accountDetailsRoutes(apiRoutes);

  // Add prefix to routes
  app.use('/admin-panel/', apiRoutes); // Assign name to endpoints
};
