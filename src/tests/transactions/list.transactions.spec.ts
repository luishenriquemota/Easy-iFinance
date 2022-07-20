import  request from "supertest"
import { DataSource } from "typeorm"
import app from "../../app"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import activateUserService from "../../services/users/activateUser.service"

const sucessUser = {
    "name":"teste",
    "email":"teste@outlook.com",
    "password":"senhaforte@123",
    "birth_date":"05/28/1992"
};
const sucessLogin ={
    "email":"teste@outlook.com",
    "password":"senhaforte@123"
};
const sucessCard = {
    name:"nubank", 
    limit:2000, 
    type:"credit", 
    dueDate:"01/10/2022", 
    closingDate:"20/12/2022"
};
const successTransaction ={
    description:"Azalea",
    value:200,
    type:"out",
    category:"gift",
    card_id:1
}

describe("list transactions",  () =>{
    let connection:DataSource
    let token = ""
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
        const login =  await request(app).post("/users/login").send(sucessLogin);
        token = login.body.token
        await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard);
        
        await request(app).post(`/transactions`).set("Authorization", `Bearer ${token}`).send(successTransaction)
        
    })

    afterAll( async ()=>{
        await connection.destroy()
    })    
    

    test("Should list user transactions", async ()=>{        
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body
        const response = await request(app).get(`/transactions/userTransactions`).set("Authorization", `Bearer ${token}`);
       
        expect(response.status).toBe(202)          
    })

    test("Should list card transactions", async ()=>{     
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body
        const response = await request(app).get(`/transactions/1`).set("Authorization", `Bearer ${token}`);
        

        expect(response.status).toBe(202)          
    })



})