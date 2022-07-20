import  request from "supertest"
import { DataSource } from "typeorm"
import app from "../../app"
import { AppDataSource } from "../../data-source"
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

describe("Delete a card",  () =>{
    let connection:DataSource

    beforeAll( async ()=>{
        await AppDataSource.initialize()
        .then((res)=> (connection =res))
        .catch((err)=>console.error("Failure on Database Initialization", err))
        const newUser = await request(app).post("/users").send(sucessUser);
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;
        
        await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard);
    })

    afterAll( async ()=>{
        await connection.destroy()
    })   

    test("Should delete a card", async ()=>{        
       
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;
        
        const response = await request(app).delete(`/cards/1`).set("Authorization", `Bearer ${token}`);
        
        expect(response.status).toBe(204)     
    })
    test("Should fail delete a card without token", async ()=>{        
        
        const response = await request(app).delete(`/cards/1`);
        
        expect(response.status).toBe(401) 
        expect(response.body).toEqual(expect.objectContaining({
            message:"Missing authorization token"
        }))    
    })

})