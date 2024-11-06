import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Members - DeleteById", () => {
  let accessToken: "";

  beforeAll(async () => {
    const email = "testemail7@gmail.com";

    await testApp
      .post("/register").send({ name: "Test Name", email, password: "123456"});

    const signInResponse = await testApp.post("/login").send({ email, password: "123456" });

    accessToken = signInResponse.body.accessToken;
  });

  let cityId: number | undefined = undefined;
  let memberId: number | undefined = undefined;

  beforeAll(async () => {
    const createCityResponse = await testApp
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}`})
      .send({ name: "Ouro Preto" });

    expect(createCityResponse.statusCode).toEqual(StatusCodes.CREATED);
    cityId = createCityResponse.body;

    const createMemberResponse = await testApp
      .post("/members")
      .set({ Authorization: `Bearer ${accessToken}`})
      .send({
        cityId,
        email: "monilakadelete@gmail.com",
        fullName: "Monilaka Cypriano",
      });

    expect(createMemberResponse.statusCode).toEqual(StatusCodes.CREATED);
    memberId = createMemberResponse.body;
  });

  it("Tries to delete a record without authentication", async () => {
    const firstResponse = await testApp
      .delete(`/members/${memberId}`)
      .send();

    expect(firstResponse.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });

  it("Deletes a record", async () => {
    const deletedResponse = await testApp
      .delete(`/members/${memberId}`)
      .set({ Authorization: `Bearer ${accessToken}`})
      .send();

    expect(deletedResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tries to delete a record that does not exist", async () => {
    const firstResponse = await testApp
      .delete("/members/99999")
      .set({ Authorization: `Bearer ${accessToken}`})
      .send();

    expect(firstResponse.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });
});
