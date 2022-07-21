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

const friendUser2 = {
  name: "testandodo",
  email: "testandodo@outlook.com",
  password: "senhaforte@123",
  birth_date: "05/28/1993",
};

describe("List all Friends", () => {
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
  
  test("Should fail to list all friends because dont have friends in friendlist", async () => {
    const login = await request(app).post("/users/login").send(userLogin);
    const { token } = login.body;

    const response = await request(app)
      .get(`/friends`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "your friends list is empty",
      })
    );
  });

  test("Should fail list all friends without token", async () => {
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
    const newFriendUser2 = await request(app).post("/users").send(friendUser2);
    
    if (newFriendUser2.body.id) {
      const foundUser = await userRepository.findOneBy({
        id: newFriendUser2.body.id,
      });
      if (foundUser) {
        await activateUserService(foundUser.authToken!);
      }
    }

    await request(app)
      .post(`/friends/${newFriendUser.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    await request(app)
      .post(`/friends/${newFriendUser2.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app).get(`/friends`);

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Missing authorization token",
      })
    );
  });

  test("Should list all friends", async () => {
    const login = await request(app).post("/users/login").send(userLogin);
    const { token } = login.body;

    const newFriendUser = await request(app).post("/users").send(friendUser);
    const newFriendUser2 = await request(app).post("/users").send(friendUser2);

    await request(app)
      .post(`/friends/${newFriendUser.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    await request(app)
      .post(`/friends/${newFriendUser2.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get(`/friends`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});
