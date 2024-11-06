import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Members - GetAll", () => {
  let accessToken: "";

  beforeAll(async () => {
    const email = "testemail8@gmail.com";

    await testApp
      .post("/register").send({ name: "Test Name", email, password: "123456"});

    const signInResponse = await testApp.post("/login").send({ email, password: "123456" });

    accessToken = signInResponse.body.accessToken;
  });

  it("Prevents fetching records without authentication", async () => {
    const firstResponse = await testApp
      .get("/members")
      .send();

    expect(firstResponse.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });

  let cityId: number | undefined = undefined;

  beforeAll(async () => {
    const createCityResponse = await testApp
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}`})
      .send({ name: "Vila Velha" });

    cityId = createCityResponse.body;
  });

  it("Returns a list of all registered members", async () => {
    const firstResponse = await testApp
      .post("/members")
      .set({ Authorization: `Bearer ${accessToken}`})
      .send({
        cityId,
        email: "testegetall@gmail.com",
        fullName: "Teste Get All",
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.CREATED);

    const fetchedResponse = await testApp
      .get("/members")
      .set({ Authorization: `Bearer ${accessToken}`})
      .send();

    expect(Number(fetchedResponse.header["x-total-count"])).toBeGreaterThan(0);
    expect(fetchedResponse.statusCode).toEqual(StatusCodes.OK);
    expect(fetchedResponse.body.length).toBeGreaterThan(0);
  });
});
