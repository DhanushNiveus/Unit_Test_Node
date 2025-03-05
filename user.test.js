const request = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("./server"); // Import the server instance
require("dotenv").config();
const User = require("./Schema/UserSchema");

describe("User API Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close(); // Properly close the server after tests
  });

  it("should create a new user", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "John Doe", email: "john@example.com", age: 25 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });

  it("should return a list of users", async () => {
    await request(app)
      .post("/users")
      .send({ name: "Admin", email: "admin@example.com", age: 24 });

    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update a user", async () => {
    const newUser = await request(app)
      .post("/users")
      .send({ name: "Foo", email: "foo@example.com", age: 25 });
    const userId = newUser.body._id;

    const res = await request(app)
      .put(`/users/${userId}`)
      .send({ name: "Niv", age: 30 });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Niv");
  });
});
