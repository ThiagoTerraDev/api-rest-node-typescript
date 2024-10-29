import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Members - UpdateById", () => {
  let cityId: number | undefined = undefined;
  let memberId: number | undefined = undefined;

  beforeAll(async () => {
    const createCityResponse = await testApp
      .post("/cities")
      .send({ name: "Santa Maria" });

    expect(createCityResponse.statusCode).toEqual(StatusCodes.CREATED);
    cityId = createCityResponse.body;

    const createMemberResponse = await testApp
      .post("/members")
      .send({
        cityId,
        email: "monilakaupdate@gmail.com",
        fullName: "Monilaka Cypriano",
      });

    expect(createMemberResponse.statusCode).toEqual(StatusCodes.CREATED);
    memberId = createMemberResponse.body;
  });

  it("Updates a record", async () => {
    const updatedResponse = await testApp
      .put(`/members/${memberId}`)
      .send({ 
        cityId,
        email: "monilakaupdate@gmail.com",
        fullName: "Monilaka Terra",
      });

    expect(updatedResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tries to update a record that does not exist", async () => {
    const firstResponse = await testApp
      .put("/members/99999")
      .send({
        cityId,
        email: "juca@gmail.com",
        fullName: "Juca da Silva",
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });
});
