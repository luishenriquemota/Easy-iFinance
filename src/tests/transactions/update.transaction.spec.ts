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
const updateData = {
    value:150
}


describe("update transaction",  () =>{
    let connection:DataSource

    beforeAll( async ()=>{
        await AppDataSource.initialize()
        .then((res)=> (connection =res))
        .catch((err)=>console.error("Failure on Database Initialization", err))
        const newUser = await request(app).post("/users").send(sucessUser);
        const userRepository = AppDataSource.getRepository(User)
        const foundUser = await userRepository.findOneBy({
            id:newUser.body.id
        })
            
            if(foundUser){
                const activation = await activateUserService(foundUser.authToken!)
            }
        
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body
        await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard);
        
    })

    afterAll( async ()=>{
        await connection.destroy()
    })   
    

    test("Should update a user ", async ()=>{  
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body      
        const newTransaction = await request(app).post(`/transactions`).set("Authorization", `Bearer ${token}`).send(successTransaction)
        const response = await request(app).patch(`/transactions/${newTransaction.body.transactions_id}`).set("Authorization", `Bearer ${token}`).send(updateData);
        
        expect(response.status).toBe(200) 
        expect(response.body).toEqual(expect.objectContaining({
            transactions_id:response.body.transactions_id,
            description:response.body.description,
            category:response.body.category,
            value:response.body.value,
            type:response.body.type,
            card_id:response.body.card_id,
            users_id:response.body.users_id,
            created_at:response.body.created_at,
            updated_at:response.body.updated_at
        }))        
    
    })
    test("Should fail to update a user transaction transaction without token", async ()=>{  
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body      
        const response = await request(app).patch(`/transactions/1`).send(updateData);
        
        expect(response.status).toBe(401)
        expect(response.body).toEqual(expect.objectContaining({
            message:"Missing authorization token"
        }))           
    })



})