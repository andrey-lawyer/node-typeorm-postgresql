import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import session from 'express-session';

var cors = require('cors');

import AppRouter from './routes';
import connectDB from './config/database';
// eslint-disable-next-line import/no-extraneous-dependencies

const app = express();
app.use(cors());
const router = new AppRouter(app);
// Connect to MongoDB
connectDB();

// Express configuration
app.set('port', process.env.PORT || 6000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false
  })
);

router.init();

const port = app.get('port');
// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

export default server;
