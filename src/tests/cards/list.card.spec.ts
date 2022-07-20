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
    dueDate: new Date ("01/10/2022"), 
    closingDate: new Date("12/12/2022")
};

describe("List cards",  () =>{
    let connection:DataSource

    beforeAll( async ()=>{
        await AppDataSource.initialize()
        .then((res)=> (connection =res))
        .catch((err)=>console.error("Failure on Database Initialization", err))
        const newUser = await request(app).post("/users").send(sucessUser);    
        
    })

    afterAll( async ()=>{
        await connection.destroy()
    })  
    

    test("Should list cards", async ()=>{      
        
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;
        
        const newCard = await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard);

        const response = await request(app).get("/cards").set("Authorization", `Bearer ${token}`);
        
        expect(response.status).toBe(200)
        expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({          
            id: newCard.body.id,
            name:newCard.body.name,
            limit:newCard.body.limit,
            type:newCard.body.type,
            created_at: newCard.body.created_at,
            updated_at: newCard.body.updated_at,
            dueDate:newCard.body.dueDate,
            closingDate:newCard.body.closingDate,
            transactions:newCard.body.transactions,
            owner_id:newCard.body.owner_id
    })]))        
    })
    test("Should fail to list cards without token", async ()=>{      
        
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;
        
        const newCard = await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard);

        const response = await request(app).get("/cards");
        
        expect(response.status).toBe(401)
        expect(response.body).toEqual(expect.objectContaining({
            message:"Missing authorization token"
        }))        
    })
    test("Should list one card", async ()=>{      
        
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;        

        const response = await request(app).get(`/cards/1`).set("Authorization", `Bearer ${token}`);

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
    test("Should fail to list one card without token", async ()=>{              

        const response = await request(app).get(`/cards/1`);

        expect(response.status).toBe(401)
        expect(response.body).toEqual(expect.objectContaining({
            message:"Missing authorization token"
        }))     
    })

})