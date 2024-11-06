import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Cities - DeleteById", () => {
  let accessToken: "";

  beforeAll(async () => {
    const email = "testemail2@gmail.com";

    await testApp
      .post("/register").send({ name: "Test Name", email, password: "123456"});

    const signInResponse = await testApp.post("/login").send({ email, password: "123456" });

    accessToken = signInResponse.body.accessToken;
  });

  it("Prevents deleting a record without authentication", async () => {
    const firstResponse = await testApp
      .delete("/cities/1")
      .send({ name: "São Paulo" });

    expect(firstResponse.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });

  it("Deletes a record", async () => {
    const firstResponse = await testApp
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}`})
      .send({ name: "Cabo Frio" });

    expect(firstResponse.statusCode).toEqual(StatusCodes.CREATED);

    const deletedResponse = await testApp
      .delete(`/cities/${firstResponse.body}`)
      .set({ Authorization: `Bearer ${accessToken}`})
      .send();

    expect(deletedResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tries to delete a record that does not exist", async () => {
    const firstResponse = await testApp
      .delete("/cities/99999")
      .set({ Authorization: `Bearer ${accessToken}`})
      .send();

    expect(firstResponse.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });
});
