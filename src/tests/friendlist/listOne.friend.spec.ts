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

describe("List one Friends", () => {
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

  test("Should list one friends", async () => {
    const login = await request(app).post("/users/login").send(userLogin);
    const { token } = login.body;
    const userRepository = AppDataSource.getRepository(User);
    const newFriendUser = await request(app).post("/users").send(friendUser);
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

    const response = await request(app)
      .get(`/friends/${newFriendUser.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        authToken : response.body.authToken,
        id : response.body.id,
        name : response.body.name,
        email : response.body.email,
        birth_date : response.body.birth_date,
        isActive : response.body.isActive,
        created_at : response.body.created_at,
        updated_at : response.body.updated_at,
        frinedList : response.body.friendList

      })
    );
  });
});
