import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Cities - DeleteById", () => {

  it("Deletes a record", async () => {

    const firstResponse = await testApp
      .post("/cities")
      .send({ name: "Cabo Frio" });

    expect(firstResponse.statusCode).toEqual(StatusCodes.CREATED);

    const deletedResponse = await testApp
      .delete(`/cities/${firstResponse.body}`)
      .send();

    expect(deletedResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tries to delete a record that does not exist", async () => {

    const firstResponse = await testApp
      .delete("/cities/99999")
      .send();

    expect(firstResponse.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });
});
