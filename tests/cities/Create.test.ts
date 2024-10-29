import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Cities - Create", () => {

  it("Creates a record", async () => {
    const firstResponse = await testApp
      .post("/cities")
      .send({ name: "São Paulo" });

    expect(firstResponse.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof firstResponse.body).toEqual("number");
  });

  it("Prevents the creation of a record with a very short name", async () => {
    const firstResponse = await testApp
      .post("/cities")
      .send({ name: "Sã" });

    expect(firstResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstResponse.body).toHaveProperty("errors.body.name");
  });
});
