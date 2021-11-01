import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';

const app = express();

const whitelist = [
  'http://localhost:8080', // Port matters.
  'https://new-world-siege-organizer.firebaseapp.com',
  'https://new-world-siege-organizer.web.app',
];
const corsOptionsDelegate = function (req: any, callback: any) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    // reflect (enable) the requested origin in the CORS response
    corsOptions = { origin: true };
  } else {
    // disable CORS for this request
    corsOptions = { origin: false };
  }
  // callback expects two parameters: error and options
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

// Debug only.
// app.use(cors('*'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

// Routes
import { RosterRouter } from './routes/roster';

/**
 * Exposed APIs
 */
app.use('/roster', RosterRouter);

/**
 * Health Check.
 */
app.get('/health', (req, res) => {
  res.status(200).send();
});

// End of exposed API.

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);
