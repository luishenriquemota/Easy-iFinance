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

describe("Delete a friend", () => {
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

  test("Should delete a friend", async () => {
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

    await request(app)
      .post(`/friends/${newFriendUser.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .delete(`/friends/${newFriendUser.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  test("Should fail to delete a friend because user dont exists", async () => {
    const login = await request(app).post("/users/login").send(userLogin);
    const { token } = login.body;

    const response = await request(app)
      .delete(`/friends/123`)
      .set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "User dont exists",
      })
    );
  });
  test("Should fail to delete a friend because friendList is empty", async () => {
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
      .delete(`/friends/newFriendUser.body.id`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "FriendList is empty",
      })
    );
  });


  test("Should fail to delete without token", async () => {
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

    await request(app)
      .post(`/friends/${newFriendUser.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app).delete(
      `/friends/${newFriendUser.body.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Missing authorization token",
      })
    );
  });

  

  
});
