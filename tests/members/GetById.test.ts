import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Members - GetById", () => {
  let accessToken: "";

  beforeAll(async () => {
    const email = "testemail9@gmail.com";

    await testApp
      .post("/register").send({ name: "Test Name", email, password: "123456"});

    const signInResponse = await testApp.post("/login").send({ email, password: "123456" });

    accessToken = signInResponse.body.accessToken;
  });

  it("Prevents fetching a record without authentication", async () => {
    const firstResponse = await testApp
      .get("/members/1")
      .send();

    expect(firstResponse.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });

  let cityId: number | undefined = undefined;
  let memberId: number | undefined = undefined;

  beforeAll(async () => {
    const createCityResponse = await testApp
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}`})
      .send({ name: "Porto Alegre" });

    expect(createCityResponse.statusCode).toEqual(StatusCodes.CREATED);
    cityId = createCityResponse.body;

    const createMemberResponse = await testApp
      .post("/members")
      .set({ Authorization: `Bearer ${accessToken}`})
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
      .set({ Authorization: `Bearer ${accessToken}`})
      .send();

    expect(fetchedResponse.statusCode).toEqual(StatusCodes.OK);
    expect(fetchedResponse.body).toHaveProperty("fullName");
  });

  it("Tries to fetch a record that does not exist", async () => {
    const firstResponse = await testApp
      .get("/members/99999")
      .set({ Authorization: `Bearer ${accessToken}`})
      .send();

    expect(firstResponse.statusCode).toEqual(StatusCodes.NOT_FOUND);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });
});
