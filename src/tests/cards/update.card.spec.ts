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
const updateData = {
    limit:3000
}

describe("Update a card",  () =>{
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

    test("Should update a card", async ()=>{
        
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;   

        const response = await request(app).patch(`/cards/1`).set("Authorization", `Bearer ${token}`).send(updateData);

        expect(response.status).toBe(200)
        expect(response.body).toEqual(expect.objectContaining(response.body.type === "credit"?{
            id:response.body.id,
            name:response.body.name,
            limit:response.body.limit,
            type:response.body.type,
            created_at: response.body.created_at,
            updated_at: response.body.updated_at,
            dueDate:response.body.dueDate,
            closingDate:response.body.closingDate,
            transactions:response.body.transactions,
            owner_id:response.body.owner_id
        }:{          
            id:response.body.id,
            name:response.body.name,
            limit:response.body.limit,
            type:response.body.type,
            created_at: response.body.created_at,
            updated_at: response.body.updated_at,
            transactions:response.body.transactions,
            owner_id:response.body.owner_id
        }))      
    })
    test("Should fail update a card without token", async ()=>{
      
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;
       
        const response = await request(app).patch(`/cards/1`).set("Authorization", `Bearer ${token}`).send(updateData);

        expect(response.status).toBe(403)
        expect(response.body).toEqual(expect.objectContaining({
            message:"Missing authorization token"
        }))        
    })

})