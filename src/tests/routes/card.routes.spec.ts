import  request from "supertest"
import { DataSource } from "typeorm"
import app from "../../app"
import { AppDataSource } from "../../data-source"

describe("Create Card",  () =>{
    let connection:DataSource

    beforeAll( async ()=>{
        await AppDataSource.initialize()
        .then((res)=> (connection =res))
        .catch((err)=>console.error("Failure on Database Initialization", err))
    })

    afterAll( async ()=>{
        await AppDataSource.destroy()
    })

    const sucessUser = {
        "name":"teste",
        "email":"teste@teste.com",
        "password":"senhaforte@123",
        "birth_date":"05/28/1992"
    };
    const sucessLogin ={
        "email":"teste@teste.com",
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
    
   

    test("Should create a new card", async ()=>{
        const newUser = await request(app).post("/users").send(sucessUser);  
              
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;
        const response = await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard);

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("limit")
        expect(response.body).toHaveProperty("type")
        expect(response.body).toHaveProperty("dueDate")
        expect(response.body).toHaveProperty("closingDate")
    })

    test("Should fail to create a duplicated card", async ()=>{
          
        const login =  await request(app).post("/users/login").send(sucessLogin);
        
        const {token} = login.body;

        const response = await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard);

        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty("message")
    })

    test("Should fail to create a card missing info", async ()=>{    
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;       

        const response = await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(failCard);

        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty("message")
    })


})

describe("List cards",  () =>{
    let connection:DataSource

    beforeAll( async ()=>{
        await AppDataSource.initialize()
        .then((res)=> (connection =res))
        .catch((err)=>console.error("Failure on Database Initialization", err))
    })

    afterAll( async ()=>{
        await AppDataSource.destroy()
    })

    const sucessUser = {
        "name":"teste",
        "email":"teste@teste.com",
        "password":"senhaforte@123",
        "birth_date":"05/28/1992"
    };
    const sucessLogin ={
        "email":"teste@teste.com",
        "password":"senhaforte@123"
    };
    const sucessCard = {
        name:"nubank", 
        limit:2000, 
        type:"credit", 
        dueDate:"01/10/2022", 
        closingDate:"20/12/2022"
    };
    
    

    test("Should list cards", async ()=>{      
        const newUser = await request(app).post("/users").send(sucessUser);  
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;
        
        await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard);

        const response = await request(app).get("/cards").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200)        
    })
    test("Should list one card", async ()=>{      
        
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;        

        const response = await request(app).get(`/cards/1`).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("limit")
        expect(response.body).toHaveProperty("type")
        expect(response.body).toHaveProperty("dueDate")
        expect(response.body).toHaveProperty("closingDate")         
    })

})



describe("Update a card",  () =>{
    let connection:DataSource

    beforeAll( async ()=>{
        await AppDataSource.initialize()
        .then((res)=> (connection =res))
        .catch((err)=>console.error("Failure on Database Initialization", err))
    })

    afterAll( async ()=>{
        await AppDataSource.destroy()
    })

    const sucessUser = {
        "name":"teste",
        "email":"teste@teste.com",
        "password":"senhaforte@123",
        "birth_date":"05/28/1992"
    };
    const sucessLogin ={
        "email":"teste@teste.com",
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
    
    

    test("Should update a card", async ()=>{
        const newUser = await request(app).post("/users").send(sucessUser);  
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;
        
        await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard);   

        const response = await request(app).patch(`/cards/1`).set("Authorization", `Bearer ${token}`).send(updateData);

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("limit")
        expect(response.body).toHaveProperty("type")
        expect(response.body).toHaveProperty("dueDate")
        expect(response.body).toHaveProperty("closingDate")        
    })

})

describe("Delete a card",  () =>{
    let connection:DataSource

    beforeAll( async ()=>{
        await AppDataSource.initialize()
        .then((res)=> (connection =res))
        .catch((err)=>console.error("Failure on Database Initialization", err))
    })

    afterAll( async ()=>{
        await AppDataSource.destroy()
    })

    const sucessUser = {
        "name":"teste",
        "email":"teste@teste.com",
        "password":"senhaforte@123",
        "birth_date":"05/28/1992"
    };
    const sucessLogin ={
        "email":"teste@teste.com",
        "password":"senhaforte@123"
    };
    const sucessCard = {
        name:"nubank", 
        limit:2000, 
        type:"credit", 
        dueDate:"01/10/2022", 
        closingDate:"20/12/2022"
    };

    
    

    test("Should delete a card", async ()=>{
        const newUser = await request(app).post("/users").send(sucessUser);
       
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;
        
        await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard);
        
        const response = await request(app).delete(`/cards/1`).set("Authorization", `Bearer ${token}`);
        
        expect(response.status).toBe(204)     
    })

})

