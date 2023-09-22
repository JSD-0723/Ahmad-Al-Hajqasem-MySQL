import express from 'express';
import bodyParser from 'body-parser';
import { Router } from 'express';
import dotenv from 'dotenv';
import router from './routes/bookRouter';

const app = express();
const bookRouter: Router = router; 

dotenv.config();

const port = process.env.PORT 
const host = process.env.HOST 

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/books', bookRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
