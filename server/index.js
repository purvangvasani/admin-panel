require('dotenv-safe').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const passport = require('passport')
require('./passport-config');
const app = express()
const i18n = require('i18n')
const initMongo = require('./config/mongo')
const appRoutes = require('./app/routes')

// Setup express server port from ENV, default: 3000
app.set('port', process.env.PORT || 3000)

// Enable only in development HTTP request logger middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Redis cache enabled by env variable
if (process.env.USE_REDIS === 'true') {
  const getExpeditiousCache = require('express-expeditious')
  const cache = getExpeditiousCache({
    namespace: 'expresscache',
    defaultTtl: '1 minute',
    engine: require('expeditious-engine-redis')({
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
      }
    })
  })
  app.use(cache)
}

// for parsing json
app.use(
  bodyParser.json({
    limit: '20mb'
  })
)
// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    extended: true
  })
)

// i18n
i18n.configure({
  locales: ['en', 'es'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en',
  objectNotation: true
})
app.use(i18n.init)

// Init all other stuff
app.use(cors({ exposedHeaders: ['x-filename', 'x-mimetype'], preflightContinue: true }));// Cors

// app.use(cors({
//   origin: 'http://localhost:4200', // Adjust this to specify the allowed origin(s)
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: [
//     'Content-Type',
//     'Authorization',
//     'Content-Security-Policy-Report-Only', // Add the required header here
//     'X-Requested-With' // Add any other headers you expect
//   ]
// }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust as needed for security
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  // Allow specific headers
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Content-Security-Policy');
  
  // CSP header for additional security (consider if it's necessary)
  res.setHeader('Content-Security-Policy', 'frame-ancestors none;');
  
  // Prevents the page from being framed
  res.setHeader('X-Frame-Options', 'DENY');
  
  // HSTS header to enforce secure connections
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(204).end(); // Respond with 204 No Content for OPTIONS requests
  }

  next(); // Continue to the next middleware/route handler
});


app.use(passport.initialize())
app.use(compression())
app.use(helmet())
app.use(express.static('public'))
// app.set('views', path.join(__dirname, 'views'))
// app.engine('html', require('ejs').renderFile)
// app.set('view engine', 'html')
appRoutes(app);
// app.use(require('./app/routes'))
app.listen(app.get('port'))

// Init MongoDB
initMongo()

module.exports = app // for testing