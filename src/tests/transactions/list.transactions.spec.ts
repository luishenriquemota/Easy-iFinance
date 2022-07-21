
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
const sucessCard2 = {
    name:"C6", 
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
const successTransaction2 ={
    description:"lotus",
    value:200,
    type:"out",
    category:"gift",
    card_id:2
}

describe("list transactions",  () =>{
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
    

    test("Should list user transactions", async ()=>{        
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body
        
        await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard);
        
        const newTransaction = await request(app).post(`/transactions`).set("Authorization", `Bearer ${token}`).send(successTransaction)
        
        const response = await request(app).get(`/transactions/userTransactions`).set("Authorization", `Bearer ${token}`);
        
        expect(response.status).toBe(200)
        expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({
            transactions_id: newTransaction.body.transactions_id,
            description: newTransaction.body.description,
            value: newTransaction.body.value,
            type: newTransaction.body.type,
            category: newTransaction.body.category,
            card_id: newTransaction.body.card_id,
            users_id: newTransaction.body.users_id,
            created_at: newTransaction.body.created_at,
            updated_at: newTransaction.body.updated_at            
            }
        )]))    
    })

    test("Should list card transactions", async ()=>{     
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body
        const newCard2 = await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard2);
       
        const newTransaction2 = await request(app).post(`/transactions`).set("Authorization", `Bearer ${token}`).send(successTransaction2)
   
        const response = await request(app).get(`/transactions/${newCard2.body.id}`).set("Authorization", `Bearer ${token}`);
        
        expect(response.status).toBe(200)
        expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining(newTransaction2.body)]))          
    })

    test("Should fail to list user transactions without token", async ()=>{ 

        const response = await request(app).get(`/transactions/userTransactions`);
       
        expect(response.status).toBe(401)
        expect(response.body).toEqual(expect.objectContaining({
            message:"Missing authorization token"
        }))    
    })

    test("Should fail to list card transactions without token", async ()=>{     
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body
        const newCard2 = await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard2);
        const newTransaction2 = await request(app).post(`/transactions`).set("Authorization", `Bearer ${token}`).send(successTransaction2)
        const response = await request(app).get(`/transactions/${newCard2.body.id}`);
        
        expect(response.status).toBe(401)
        expect(response.body).toEqual(expect.objectContaining({
            message:"Missing authorization token"
        }))          
    })



})