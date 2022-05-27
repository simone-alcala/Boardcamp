import express, { json } from 'express';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';

import categoriesRouter from './routers/categoriesRouter.js';
import gamesRouter from './routers/gamesRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use(categoriesRouter);
app.use(gamesRouter);

app.listen(process.env.PORT || 4000, () => 
  console.log(chalk.green(`Server running on ${process.env.PORT }`))
)