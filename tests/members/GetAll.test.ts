import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Members - GetAll", () => {
  let cityId: number | undefined = undefined;

  beforeAll(async () => {
    const createCityResponse = await testApp
      .post("/cities")
      .send({ name: "Vila Velha" });

    cityId = createCityResponse.body;
  });

  it("Returns a list of all registered members", async () => {
    const firstResponse = await testApp
      .post("/members")
      .send({
        cityId,
        email: "testegetall@gmail.com",
        fullName: "Teste Get All",
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.CREATED);

    const fetchedResponse = await testApp
      .get("/members")
      .send();

    expect(Number(fetchedResponse.header["x-total-count"])).toBeGreaterThan(0);
    expect(fetchedResponse.statusCode).toEqual(StatusCodes.OK);
    expect(fetchedResponse.body.length).toBeGreaterThan(0);
  });
});
