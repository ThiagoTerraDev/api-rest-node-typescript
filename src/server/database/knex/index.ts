import { knex } from "knex";
import { development, test, production } from "./Environment";


const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case "production": return production;
    case "test": return test;
    
    default: return development;
  }

};

export const Knex = knex(getEnvironment());
