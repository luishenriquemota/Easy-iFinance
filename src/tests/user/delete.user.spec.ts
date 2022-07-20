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

describe("Delete user profile",()=>{
    let connection:DataSource
    
    beforeAll( async ()=>{
        await AppDataSource.initialize()
        .then((res)=> (connection =res))
        .catch((err)=>console.error("Failure on Database Initialization", err))
        const newUser = await request(app).post("/users").send(sucessUser);
        const userRepository = AppDataSource.getRepository(User)
        if(newUser.body.id){
            const foundUser = await userRepository.findOneBy({
                id:newUser.body.id
            })
            if(foundUser){
                const activation = await activateUserService(foundUser.authToken!)
            }
        }
    })

    afterAll( async ()=>{
        await connection.destroy()
    })
    
    test("Trying to delete a user with token", async ()=>{
        
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body 
        
        const response = await request(app).delete("/users").set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(204)

    })
    test("Trying To delete a user without a token", async ()=>{
        
        const response = await request(app).delete("/users")

        expect(response.status).toBe(401)
        expect(response.body).toEqual(expect.objectContaining({
            message:"Missing authorization token"
        }))

    })
    
})