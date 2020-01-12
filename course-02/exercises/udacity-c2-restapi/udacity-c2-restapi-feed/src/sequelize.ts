import {Sequelize} from 'sequelize-typescript';
import { config } from './config/config';


const c = config.prod;

// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  "username": c.username,
  "password": c.password,
  "database": c.database,
  "host":     "shadevdb.cywj6c7gn6vx.us-east-2.rds.amazonaws.com",

  dialect: 'postgres',
  storage: ':memory:',
});

