import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import activateUserService from "../../services/users/activateUser.service";

const user = {
  name: "teste",
  email: "teste@outlook.com",
  password: "senhaforte@123",
  birth_date: "05/28/1992",
};
const userLogin = {
  email: "teste@outlook.com",
  password: "senhaforte@123",
};
const friendUser = {
  name: "testando",
  email: "testando@outlook.com",
  password: "senhaforte@123",
  birth_date: "05/28/1993",
};

const friendUserLogin = {
  email: "testando@outlook.com",
  password: "senhaforte@123",
};

describe("Add a friend", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => console.error("Failure on Database Initialization", err));
    const newUser = await request(app).post("/users").send(user);

    const userRepository = AppDataSource.getRepository(User);
    if (newUser.body.id) {
      const foundUser = await userRepository.findOneBy({
        id: newUser.body.id,
      });
      if (foundUser) {
        await activateUserService(foundUser.authToken!);
      }
    }
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should add a friend", async () => {
    const login = await request(app).post("/users/login").send(userLogin);
    const { token } = login.body;

    const newFriendUser = await request(app).post("/users").send(friendUser);

    const userRepository = AppDataSource.getRepository(User);
    if (newFriendUser.body.id) {
      const foundUser = await userRepository.findOneBy({
        id: newFriendUser.body.id,
      });
      if (foundUser) {
        await activateUserService(foundUser.authToken!);
      }
    }

    const response = await request(app)
      .post(`/friends/${newFriendUser.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: response.body.message,
      })
    );
  });

  test("Should fail to add a friend with is  already add", async () => {
    const login = await request(app).post("/users/login").send(friendUserLogin);
    const { token } = login.body;

    const newFriendUser = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${token}`);

    const loginUser = await request(app).post("/users/login").send(userLogin);
    const friendToken = loginUser.body.token;

    const response = await request(app)
      .post(`/friends/${newFriendUser.body.id}`)
      .set("Authorization", `Bearer ${friendToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "you and this user are already friends.",
      })
    );
  });

  test("Should fail to add a friend without token", async () => {
    const newFriendUser = await request(app).post("/users").send(friendUser);

    const userRepository = AppDataSource.getRepository(User);
    if (newFriendUser.body.id) {
      const foundUser = await userRepository.findOneBy({
        id: newFriendUser.body.id,
      });
      if (foundUser) {
        await activateUserService(foundUser.authToken!);
      }
    }

    const response = await request(app).post(
      `/friends/${newFriendUser.body.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Missing authorization token",
      })
    );
  });
  test("Should fail if try to add himself", async () => {
    const login = await request(app).post("/users/login").send(userLogin);
    const { token } = login.body;

    const himself = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .post(`/friends/${himself.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(409);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "you can't add yourself.",
      })
    );
  });
});
