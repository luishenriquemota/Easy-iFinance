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
const updatedData = {
    name:"test3"
}

describe("Update user profile",()=>{
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
   
    test("Should return the user updated data", async ()=>{        
       
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body 
        
        const response = await request(app).patch("/users").set("Authorization", `Bearer ${token}`).send(updatedData)

        expect(response.status).toBe(200)
        expect(response.body).toEqual(expect.objectContaining({
            id:response.body.id,
            name:response.body.name,
            birth_date:response.body.birth_date,
            email:response.body.email,
            created_at: response.body.created_at,
            updated_at: response.body.updated_at,
            isActive:response.body.isActive,
            friendList:response.body.friendList,
            transactions:response.body.transactions,
            authToken:response.body.authToken
        }))
        
        

    })
    test("Should fail to return the user updated data without token", async ()=>{       
        
        const response = await request(app).patch("/users").send(updatedData)

        expect(response.status).toBe(401)
        expect(response.body).toEqual(expect.objectContaining({
            message:"Missing authorization token"
        }))
    })
})

