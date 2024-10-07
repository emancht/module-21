import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import {
  DATABASE,
  MAX_JSON_SIZE,
  PORT,
  REQUEST_NUMBER,
  REQUEST_TIME,
  URL_ENCODE,
  WEB_CACHE,
} from './app/config/config.js';
import router from './routes/api.js';

const app = express();

/// Default Middlewares
app.use(cors());
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(helmet());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static('public'));

/// Limiter
const limiter = rateLimit({ windowMs: REQUEST_TIME, max: REQUEST_NUMBER });
app.use(limiter);

/// Web Cache
app.set('etag', WEB_CACHE);

/// Database Connect
mongoose
  .connect(DATABASE, { autoIndex: true })
  .then(() => {
    console.log('MongoDB Connected!');
  })
  .catch(() => {
    console.log('MongoDB disconnected!');
  });

/// API route
app.use('/api', router);

/// Server Running URL (http://localhost:5050/api)
app.listen(PORT, () => {
  console.log('Server started on port: ' + PORT);
});
