import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Cities - UpdateById", () => {
  let accessToken: "";

  beforeAll(async () => {
    const email = "testemail5@gmail.com";

    await testApp
      .post("/register").send({ name: "Test Name", email, password: "123456"});

    const signInResponse = await testApp.post("/login").send({ email, password: "123456" });

    accessToken = signInResponse.body.accessToken;
  });

  it("Prevents updating a record without authentication", async () => {
    const firstResponse = await testApp
      .put("/cities/1")
      .send({ name: "São Paulo" });

    expect(firstResponse.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });

  it("Updates a record", async () => {
    const firstResponse = await testApp
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}`})
      .send({ name: "Caxias do Sul" });

    expect(firstResponse.statusCode).toEqual(StatusCodes.CREATED);

    const updatedResponse = await testApp
      .put(`/cities/${firstResponse.body}`)
      .set({ Authorization: `Bearer ${accessToken}`})
      .send({ name: "Caxias" });

    expect(updatedResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tries to update a record that does not exist", async () => {
    const firstResponse = await testApp
      .put("/cities/99999")
      .set({ Authorization: `Bearer ${accessToken}`})
      .send({ name: "Caxias" });

    expect(firstResponse.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });
});
