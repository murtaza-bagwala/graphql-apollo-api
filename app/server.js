const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const dotenv = require('dotenv');

const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const indexRouter = require('./routes');
const logger = require('../config/winston-config');
// const dbConnect = require('./services/mongodb-service');
const STATUS_CODE = require('./utils/constant');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const dbConnect = require('./services/mongo-service');
const { verifyUser } = require('./helper/context');

const app = express();

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });
dbConnect.connect();

/* Helmet can help protect app from some well-known web
vulnerabilities by setting HTTP headers appropriately. */

app.listen(4001, () => {
  logger.info(`Application running on port:${process.env.PORT}`);
  logger.info(`Graphql running on port:${apolloServer.graphqlPath}`);
});

// dbConnect.connect();

app.use(cors());

app.use(helmet());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    await verifyUser(req);
    return {
      email: req.email,
      loggedInUserId: req.loggedInUserId,
    };
  },
});
apolloServer.applyMiddleware({ app, path: '/graphql' });

// Enabling Gzip compression
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/', indexRouter);
// Error handler
app.use((error, req, res) => {
  logger.error(
    `${error.status || STATUS_CODE.INTERNAL_SERVER_ERROR} - ${
      error.message
    } - ${req.originalUrl}
      - ${req.method} - ${req.ip}`,
  );
  res.status(500).send({ error });
});

module.exports = app;
