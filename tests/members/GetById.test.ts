import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Members - GetById", () => {
  let cityId: number | undefined = undefined;
  let memberId: number | undefined = undefined;

  beforeAll(async () => {
    const createCityResponse = await testApp
      .post("/cities")
      .send({ name: "Porto Alegre" });

    expect(createCityResponse.statusCode).toEqual(StatusCodes.CREATED);
    cityId = createCityResponse.body;

    const createMemberResponse = await testApp
      .post("/members")
      .send({
        cityId,
        email: "monilakacypri@gmail.com",
        fullName: "Monilaka Cypriano",
      });
    
    expect(createMemberResponse.statusCode).toEqual(StatusCodes.CREATED);
    memberId = createMemberResponse.body;
  });

  it("Fetches a record by id", async () => {
    const fetchedResponse = await testApp
      .get(`/members/${memberId}`)
      .send();

    expect(fetchedResponse.statusCode).toEqual(StatusCodes.OK);
    expect(fetchedResponse.body).toHaveProperty("fullName");
  });

  it("Tries to fetch a record that does not exist", async () => {
    const firstResponse = await testApp
      .get("/members/99999")
      .send();

    expect(firstResponse.statusCode).toEqual(StatusCodes.NOT_FOUND);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });
});
