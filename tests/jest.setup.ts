import supertest from "supertest";

import { app } from "../src/server/App";
import { Knex } from "../src/server/database/knex";

beforeAll(async () => {
  await Knex.migrate.latest();
});

afterAll(async () => {
  await Knex.destroy();
});

export const testApp = supertest(app);
