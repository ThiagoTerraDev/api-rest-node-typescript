import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Members - Create", () => {
  let cityId: number | undefined = undefined;

  beforeAll(async () => {
    const createCityResponse = await testApp
      .post("/cities")
      .send({ name: "Santa Maria" });

    expect(createCityResponse.statusCode).toEqual(StatusCodes.CREATED);
    cityId = createCityResponse.body;
  });

  it("Creates a record", async () => {
    const firstResponse = await testApp
      .post("/members")
      .send({
        cityId,
        email: "jaxteller@gmail.com",
        fullName: "Jax Teller",
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof firstResponse.body).toEqual("number");
  });

  it("Creates second record", async () => {
    const firstResponse = await testApp
      .post("/members")
      .send({
        cityId,
        email: "gemmatellermorrow@gmail.com",
        fullName: "Gemma Teller Morrow",
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof firstResponse.body).toEqual("number");
  });

  it("Tries to create a record with duplicate email", async () => {
    const firstResponse = await testApp
      .post("/members")
      .send({
        cityId,
        email: "claymorrow@gmail.com",
        fullName: "Clay Morrow"
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof firstResponse.body).toEqual("number");

    const secondResponse = await testApp
      .post("/members")
      .send({
        cityId,
        email: "claymorrow@gmail.com",
        fullName: "Morrow Clay"
      });

    expect(secondResponse.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(secondResponse.body).toHaveProperty("errors.default");
  });

  it("Tries to create a record with very short fullName", async () => {
    const firstResponse = await testApp
      .post("/members")
      .send({
        cityId,
        email: "tigtrager@gmail.com",
        fullName: "Ti"
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstResponse.body).toHaveProperty("errors.body.fullName");
  });

  it("Tries to create a record without fullName", async () => {
    const firstResponse = await testApp
      .post("/members")
      .send({
        cityId,
        email: "happylowman@gmail.com"
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstResponse.body).toHaveProperty("errors.body.fullName");
  });

  it("Tries to create a record without email", async () => {
    const firstResponse = await testApp
      .post("/members")
      .send({
        cityId,
        fullName: "Juice Ortiz"
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstResponse.body).toHaveProperty("errors.body.email");
  });

  it("Tries to create a record with invalid email", async () => {
    const firstResponse = await testApp
      .post("/members")
      .send({
        cityId,
        email: "tara knowles gmail. com",
        fullName: "Tara Knowles"
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstResponse.body).toHaveProperty("errors.body.email");
  });

  it("Tries to create a record without cityId", async () => {
    const firstResponse = await testApp
      .post("/members")
      .send({
        email: "chibstelford@gmail.com",
        fullName: "Chibs Telford"
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstResponse.body).toHaveProperty("errors.body.cityId");
  });

  it("Tries to create a record with invalid cityId", async () => {
    const firstResponse = await testApp
      .post("/members")
      .send({
        cityId: "teste",
        email: "opiewinston@gmail.com",
        fullName: "Opie Winston"
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstResponse.body).toHaveProperty("errors.body.cityId");
  });

  it("Tries to create a record without any information", async () => {
    const firstResponse = await testApp
      .post("/members")
      .send({});

    expect(firstResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstResponse.body).toHaveProperty("errors.body.cityId");
    expect(firstResponse.body).toHaveProperty("errors.body.email");
    expect(firstResponse.body).toHaveProperty("errors.body.fullName");
  });
});
