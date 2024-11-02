import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Users - SignUp", () => {
  it("Tries to register user 1", async () => {
    const firstResponse = await testApp
      .post("/register")
      .send({
        name: "Jax Teller",
        email: "jaxteller@gmail.com",
        password: "123456",
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof firstResponse.body).toEqual("number");
  });

  it("Tries to register user 2", async () => {
    const firstResponse = await testApp
      .post("/register")
      .send({
        name: "Gemma Teller",
        email: "gemmateller@gmail.com",
        password: "654321",
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof firstResponse.body).toEqual("number");
  });

  it("Tries to register a user with duplicate email", async () => {
    const firstResponse = await testApp
      .post("/register")
      .send({
        name: "Clay Morrow",
        email: "claymorrow@gmail.com",
        password: "gyhuljk",
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof firstResponse.body).toEqual("number");

    const secondResponse = await testApp
      .post("/register")
      .send({
        name: "Morrow Clay",
        email: "claymorrow@gmail.com",
        password: "ilovegemma",
      });

    expect(secondResponse.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(secondResponse.body).toHaveProperty("errors.default");
  });

  it("Tries to register a user without name", async () => {
    const firstResponse = await testApp
      .post("/register")
      .send({
        email: "happylowman@gmail.com",
        password: "eerewrf",
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstResponse.body).toHaveProperty("errors.body.name");
  });

  it("Tries to register a user without email", async () => {
    const firstResponse = await testApp
      .post("/register")
      .send({
        name: "Juice Ortiz",
        password: "dsferwfew"
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstResponse.body).toHaveProperty("errors.body.email");
  });

  it("Tries to register a user without password", async () => {
    const firstResponse = await testApp
      .post("/register")
      .send({
        name: "Chibs Telford",
        email: "chibstelford@gmail.com",
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstResponse.body).toHaveProperty("errors.body.password");
  });

  it("Tries to register a user with invalid email", async () => {
    const firstResponse = await testApp
      .post("/register")
      .send({
        name: "Tara Knowles",
        email: "tara knowles gmail. com",
        password: "ilovejax"
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstResponse.body).toHaveProperty("errors.body.email");
  });

  it("Tries to register a user with very short password", async () => {
    const firstResponse = await testApp
      .post("/register")
      .send({
        name: "Opie Winston",
        email: "igotthis@gmail.com",
        password: "op",
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstResponse.body).toHaveProperty("errors.body.password");
  });

  it("Tries to register a user with very short name", async () => {
    const firstResponse = await testApp
      .post("/register")
      .send({
        name: "Bo",
        email: "bobbymunson@gmail.com",
        password: "ieofjowiej",
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstResponse.body).toHaveProperty("errors.body.name");
  });
}); 
