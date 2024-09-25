import supertest from "supertest";

import { app } from "../src/server/App";

export const testApp = supertest(app);
