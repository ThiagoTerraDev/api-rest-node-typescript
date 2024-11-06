import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Cities - GetById", () => {
  let accessToken: "";

  beforeAll(async () => {
    const email = "testemail4@gmail.com";

    await testApp
      .post("/register").send({ name: "Test Name", email, password: "123456"});

    const signInResponse = await testApp.post("/login").send({ email, password: "123456" });

    accessToken = signInResponse.body.accessToken;
  });

  it("Prevents fetching a record without authentication", async () => {
    const firstResponse = await testApp
      .get("/cities/1")
      .send();

    expect(firstResponse.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });

  it("Fetches a record by id", async () => {
    const firstResponse = await testApp
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}`})
      .send({ name: "Buenos Aires" });

    expect(firstResponse.statusCode).toEqual(StatusCodes.CREATED);

    const fetchedResponse = await testApp
      .get(`/cities/${firstResponse.body}`)
      .set({ Authorization: `Bearer ${accessToken}`})
      .send();
      
    expect(fetchedResponse.statusCode).toEqual(StatusCodes.OK);
    expect(fetchedResponse.body).toHaveProperty("name");
  });

  it("Tries to fetch a record that does not exist", async () => {
    const firstResponse = await testApp
      .get("/cities/99999")
      .set({ Authorization: `Bearer ${accessToken}`})
      .send();

    expect(firstResponse.statusCode).toEqual(StatusCodes.NOT_FOUND);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });
});
