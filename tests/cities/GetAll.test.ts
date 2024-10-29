import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Cities - GetAll", () => {

  it("Returns a list of all registered cities", async () => {
    const firstResponse = await testApp
      .post("/cities")
      .send({ name: "Belo Horizonte" });

    expect(firstResponse.statusCode).toEqual(StatusCodes.CREATED);

    const fetchedResponse = await testApp
      .get("/cities")
      .send();

    expect(Number(fetchedResponse.header["x-total-count"])).toBeGreaterThan(0);
    expect(fetchedResponse.statusCode).toEqual(StatusCodes.OK);
    expect(fetchedResponse.body.length).toBeGreaterThan(0);
  });
});
