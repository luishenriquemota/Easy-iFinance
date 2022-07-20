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
const failCard = {
    limit:2000, 
    type:"credit", 
    dueDate:"01/10/2022", 
    closingDate:"20/12/2022"
};


describe("Create Card",  () =>{
    let connection:DataSource

    beforeAll( async ()=>{
        await AppDataSource.initialize()
        .then((res)=> (connection =res))
        .catch((err)=>console.error("Failure on Database Initialization", err))
        
    })

    afterAll( async ()=>{
        await connection.destroy()
    })

    test("Should create a new card", async ()=>{       
        const newUser = await request(app).post("/users").send(sucessUser); 
        
        const login =  await request(app).post("/users/login").send(sucessLogin);

        const {token} = login.body;

        const response = await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard);

        expect(response.status).toBe(201)
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
            owner_id:response.body.owner_id,
            allowedUsers:response.body.allowedUsers
        }:{          
            id:response.body.id,
            name:response.body.name,
            limit:response.body.limit,
            type:response.body.type,
            created_at: response.body.created_at,
            updated_at: response.body.updated_at,
            transactions:response.body.transactions,
            owner_id:response.body.owner_id,
            allowedUsers:response.body.allowedUsers
        }))
    })

    test("Should fail to create a duplicated card", async ()=>{
          
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;

        await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard)
        const response = await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard);

        expect(response.status).toBe(409)
        expect(response.body).toEqual(expect.objectContaining({
            message:"Card already exist"
        }))
    })

    test("Should fail to create a card missing info", async ()=>{    
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;       

        const response = await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(failCard);
        
        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty("message")
    })
    
    test("Should fail to create a card without token", async ()=>{    
        
        const response = await request(app).post("/cards").send(sucessCard);
        
        expect(response.status).toBe(401)
        expect(response.body).toEqual(expect.objectContaining({
            message:"Missing authorization token"
        })) 
    })
})









