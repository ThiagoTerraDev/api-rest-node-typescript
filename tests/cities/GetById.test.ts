import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Cities - GetById", () => {

  it("Fetches a record by id", async () => {
    const firstResponse = await testApp
      .post("/cities")
      .send({ name: "Buenos Aires" });

    expect(firstResponse.statusCode).toEqual(StatusCodes.CREATED);

    const fetchedResponse = await testApp
      .get(`/cities/${firstResponse.body}`)
      .send();
      
    expect(fetchedResponse.statusCode).toEqual(StatusCodes.OK);
    expect(fetchedResponse.body).toHaveProperty("name");
  });

  it("Tries to fetch a record that does not exist", async () => {
    const firstResponse = await testApp
      .get("/cities/99999")
      .send();

    expect(firstResponse.statusCode).toEqual(StatusCodes.NOT_FOUND);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });
});
