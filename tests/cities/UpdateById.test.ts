import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Cities - UpdateById", () => {

  it("Updates a record", async () => {
    const firstResponse = await testApp
      .post("/cities")
      .send({ name: "Caxias do Sul" });

    expect(firstResponse.statusCode).toEqual(StatusCodes.CREATED);

    const updatedResponse = await testApp
      .put(`/cities/${firstResponse.body}`)
      .send({ name: "Caxias" });

    expect(updatedResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tries to update a record that does not exist", async () => {
    const firstResponse = await testApp
      .put("/cities/99999")
      .send({ name: "Caxias" });

    expect(firstResponse.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });
});
