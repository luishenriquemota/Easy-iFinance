import  request from "supertest"
import { DataSource } from "typeorm"
import app from "../../app"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import activateUserService from "../../services/users/activateUser.service"

const sucessUser = {
    "name":"teste",
    "email":"paulo.morolol@gmail.com",
    "password":"senhaforte@123",
    "birth_date":"05/28/1992"
}
const failUser = {
    "name":"teste",
    
    "password":"senhaforte@123",
    "birth_date":"05/28/1992"
}


describe("Create new user",()=>{
    let connection:DataSource

    beforeAll( async ()=>{
        await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);})
    })

    afterAll( async ()=>{
        await connection.destroy()
    })
    
    test("Should create a new user", async ()=>{

        const response = await request(app).post("/users").send(sucessUser);
    
        const userRepository = AppDataSource.getRepository(User);
        if(response.body.id){
            const foundUser = await userRepository.findOneBy({
                id:response.body.id
            })
            if(foundUser){
                const activation = await activateUserService(foundUser.authToken!)
            }
        }
        
        expect(response.status).toBe(201)
        expect(response.body).toEqual(expect.objectContaining({
            id:response.body.id,
            name:response.body.name,
            birth_date:response.body.birth_date,
            email:response.body.email,
            created_at: response.body.created_at,
            updated_at: response.body.updated_at,
            isActive:response.body.isActive,
            friendList:response.body.friendList,
            transactions:response.body.transactions
        }))

        
    })
    test("Should fail to create a duplicated user", async ()=>{
        const response = await request(app).post("/users").send(sucessUser);
        expect(response.status).toBe(409)
        expect(response.body).toEqual(expect.objectContaining({
            message:"User with this email already exist"
        }))
    })
    test("Should fail to create a user without info", async ()=>{
        const response = await request(app).post("/users").send(failUser);
        expect(response.status).toBe(400)
        expect(response.body).toEqual(expect.objectContaining({
            message:"User need a name, email, passowrd and birth date to be created."
        }))
    })
})

