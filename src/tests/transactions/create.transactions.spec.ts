import request from "supertest"
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
const failTransaction ={
    value:200,
    type:"out",
    category:"gift",
    card_id:1
}



describe("Create a transaction",  () =>{
    let connection:DataSource

    beforeAll( async ()=>{
        await AppDataSource.initialize()
        .then((res)=> (connection = res))
        .catch((err)=>console.error("Failure on Database Initialization", err))
        const newUser = await request(app).post("/users").send(sucessUser);
        const userRepository = AppDataSource.getRepository(User)
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body         
        
        
        await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard);
        
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
    

    test("Should create a transaction", async ()=>{     
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body         
        const response = await request(app).post(`/transactions`).set("Authorization", `Bearer ${token}`).send(successTransaction);
      
        expect(response.status).toBe(201)
        expect(response.body).toEqual(expect.objectContaining({
            transactions_id:response.body.transactions_id,
            description:response.body.description,
            category:response.body.category,
            value:response.body.value,
            type:response.body.type,
            cardId:response.body.cardId,
            userId:response.body.transactions_id
        }))            
    })

    test("Should fail to create a incomplete transaction", async ()=>{       
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body 
        const response = await request(app).post(`/transactions`).set("Authorization", `Bearer ${token}`).send(failTransaction);
     
        expect(response.status).toBe(400)
        expect(response.body).toEqual(expect.objectContaining({
            message:"A transaction need a description, category, value and type"
        }))             
    })
    test("Should fail to create a transaction without token", async ()=>{       
        
        const response = await request(app).post(`/transactions`).send(failTransaction);
     
        expect(response.status).toBe(403)
        expect(response.body).toEqual(expect.objectContaining({
            message:"Missing authorization token"
        }))            
    })
})





