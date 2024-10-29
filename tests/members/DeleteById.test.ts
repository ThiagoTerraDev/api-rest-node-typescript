import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Members - DeleteById", () => {
  let cityId: number | undefined = undefined;
  let memberId: number | undefined = undefined;

  beforeAll(async () => {
    const createCityResponse = await testApp
      .post("/cities")
      .send({ name: "Ouro Preto" });

    expect(createCityResponse.statusCode).toEqual(StatusCodes.CREATED);
    cityId = createCityResponse.body;

    const createMemberResponse = await testApp
      .post("/members")
      .send({
        cityId,
        email: "monilakadelete@gmail.com",
        fullName: "Monilaka Cypriano",
      });

    expect(createMemberResponse.statusCode).toEqual(StatusCodes.CREATED);
    memberId = createMemberResponse.body;
  });

  it("Deletes a record", async () => {
    const deletedResponse = await testApp
      .delete(`/members/${memberId}`)
      .send();

    expect(deletedResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tries to delete a record that does not exist", async () => {
    const firstResponse = await testApp
      .delete("/members/99999")
      .send();

    expect(firstResponse.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });
});
