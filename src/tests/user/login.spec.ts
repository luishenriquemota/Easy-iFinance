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
const sucessLogin ={
    "email":"paulo.morolol@gmail.com",
    "password":"senhaforte@123"
}

const failLogin = {
    "email":"teste@teste.com",
    "password":"123"       
}
const failLogin2 = {
    "email":"teste1@teste.com",
    "password":"senhaforte@123"       
}

describe("Login a new User",()=>{
    let connection:DataSource

    beforeAll( async ()=>{
        await AppDataSource.initialize()
        .then((res)=> (connection =res))
        .catch((err)=>console.error("Failure on Database Initialization", err))  
    })

    afterAll( async ()=>{
        await connection.destroy()
    })    

    test("Should login a user", async ()=>{
        const newUser = await request(app).post("/users").send(sucessUser);
        const userRepository = AppDataSource.getRepository(User)
        if(newUser.body.id){
            const foundUser = await userRepository.findOneBy({
                id:newUser.body.id
            })
            if(foundUser){
                await activateUserService(foundUser.authToken!)
            }
        }
        
        const response = await request(app).post("/users/login").send(sucessLogin)
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("token")

    })
    test("Should fail to login a user with a invalid password", async ()=>{     
        const newUser = await request(app).post("/users").send(sucessUser);
        const userRepository = AppDataSource.getRepository(User)
        if(newUser.body.id){
            const foundUser = await userRepository.findOneBy({
                id:newUser.body.id
            })
            if(foundUser){
                await activateUserService(foundUser.authToken!)
            }
        }   

        const response = await request(app).post("/users/login").send(failLogin)

        expect(response.status).toBe(403)
        expect(response.body).toEqual(expect.objectContaining({
            message:"Wrong email/password"            
        }))
    })
    test("Should fail to login a user with a invalid email", async ()=>{
        const newUser = await request(app).post("/users").send(sucessUser);
        const userRepository = AppDataSource.getRepository(User)
        if(newUser.body.id){
            const foundUser = await userRepository.findOneBy({
                id:newUser.body.id
            })
            if(foundUser){
                await activateUserService(foundUser.authToken!)
            }
        }

        const response = await request(app).post("/users/login").send(failLogin2)

        expect(response.status).toBe(403)
        expect(response.body).toEqual(expect.objectContaining({
            message:"Wrong email/password"            
        }))
    })
})




