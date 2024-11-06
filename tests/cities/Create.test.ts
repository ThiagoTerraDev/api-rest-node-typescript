import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Cities - Create", () => {
  let accessToken: "";

  beforeAll(async () => {
    const email = "testemail1@gmail.com";

    await testApp
      .post("/register").send({ name: "Test Name", email, password: "123456"});

    const signInResponse = await testApp.post("/login").send({ email, password: "123456" });

    accessToken = signInResponse.body.accessToken;
  });

  it("Prevents the creation of a record without authentication", async () => {
    const firstResponse = await testApp
      .post("/cities")
      .send({ name: "São Paulo" });

    expect(firstResponse.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });

  it("Creates a record", async () => {
    const firstResponse = await testApp
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}`})
      .send({ name: "São Paulo" });

    expect(firstResponse.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof firstResponse.body).toEqual("number");
  });

  it("Prevents the creation of a record with a very short name", async () => {
    const firstResponse = await testApp
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}`})
      .send({ name: "Sã" });

    expect(firstResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstResponse.body).toHaveProperty("errors.body.name");
  });
});
