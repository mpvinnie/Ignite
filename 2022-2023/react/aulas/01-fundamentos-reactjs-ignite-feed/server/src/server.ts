import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import './containers';
import { routes } from './routes';

import './database';

const app = express()

app.use(express.json())
app.use(cors())

app.use(routes)

app.listen('3333', () => {
  console.log('Server is running on port 3333!')
})