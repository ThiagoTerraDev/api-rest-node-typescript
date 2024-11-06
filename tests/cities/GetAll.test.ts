import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Cities - GetAll", () => {
  let accessToken: "";

  beforeAll(async () => {
    const email = "testemail3@gmail.com";

    await testApp
      .post("/register").send({ name: "Test Name", email, password: "123456"});

    const signInResponse = await testApp.post("/login").send({ email, password: "123456" });

    accessToken = signInResponse.body.accessToken;
  });

  it("Prevents fetching records without authentication", async () => {
    const firstResponse = await testApp
      .get("/cities")
      .send();

    expect(firstResponse.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });

  it("Returns a list of all registered cities", async () => {
    const firstResponse = await testApp
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}`})
      .send({ name: "Belo Horizonte" });

    expect(firstResponse.statusCode).toEqual(StatusCodes.CREATED);

    const fetchedResponse = await testApp
      .get("/cities")
      .set({ Authorization: `Bearer ${accessToken}`})
      .send();

    expect(Number(fetchedResponse.header["x-total-count"])).toBeGreaterThan(0);
    expect(fetchedResponse.statusCode).toEqual(StatusCodes.OK);
    expect(fetchedResponse.body.length).toBeGreaterThan(0);
  });
});
