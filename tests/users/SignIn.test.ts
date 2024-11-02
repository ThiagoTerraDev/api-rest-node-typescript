import { StatusCodes } from "http-status-codes";
import { testApp } from "../jest.setup";


describe("Users - SignIn", () => {
  beforeAll(async () => {
    const firstResponse = await testApp
      .post("/register")
      .send({
        name: "Jax Teller",
        email: "jaxteller@gmail.com",
        password: "12x3456",
      });
    
    expect(firstResponse.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof firstResponse.body).toEqual("number");
  });

  it("Tries to login", async () => {
    const firstResponse = await testApp
      .post("/login")
      .send({
        email: "jaxteller@gmail.com",
        password: "12x3456",
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.OK);
    expect(firstResponse.body).toHaveProperty("accessToken");
  });

  it("Tries to login using incorrect password", async () => {
    const firstResponse = await testApp
      .post("/login")
      .send({
        email: "jaxteller@gmail.com",
        password: "12x3456lpk",
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });

  it("Tries to login using incorrect email", async () => {
    const firstResponse = await testApp
      .post("/login")
      .send({
        email: "jaxyteller@gmail.com",
        password: "12x3456",
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(firstResponse.body).toHaveProperty("errors.default");
  });

  it("Tries to login using invalid email", async () => {
    const firstResponse = await testApp
      .post("/login")
      .send({
        email: "jaxteller gmail.com",
        password: "12x3456",
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstResponse.body).toHaveProperty("errors.body.email");
  });

  it("Tries to login using invalid password", async () => {
    const firstResponse = await testApp
      .post("/login")
      .send({
        email: "jaxteller@gmail.com",
        password: "12",
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstResponse.body).toHaveProperty("errors.body.password");
  });

  it("Tries to login without providing the password", async () => {
    const firstResponse = await testApp
      .post("/login")
      .send({
        email: "jaxteller@gmail.com",
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstResponse.body).toHaveProperty("errors.body.password");
  });

  it("Tries to login without providing the email", async () => {
    const firstResponse = await testApp
      .post("/login")
      .send({
        password: "12x3456",
      });

    expect(firstResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstResponse.body).toHaveProperty("errors.body.email");
  });
}); 
