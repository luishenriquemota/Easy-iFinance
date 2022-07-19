import  request from "supertest"
import { DataSource } from "typeorm"
import app from "../../app"
import { AppDataSource } from "../../data-source"

describe("Create a transaction",  () =>{
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
    const successTransaction ={
        description:"Azalea",
        value:200,
        type:"out",
        category:"gift"
    }
    const failTransaction ={
        value:200,
        type:"out",
        category:"gift"
    }
    
    

    test("Should create a transaction", async ()=>{
        const newUser = await request(app).post("/users").send(sucessUser);  
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;        
        
        await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard);
        
        const response = await request(app).post(`/transactions`).set("Authorization", `Bearer ${token}`).send(successTransaction);
        expect(response.status).toBe(202)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("description")
        expect(response.body).toHaveProperty("category")
        expect(response.body).toHaveProperty("value")
        expect(response.body).toHaveProperty("type")
        expect(response.body).toHaveProperty("cardId")
        expect(response.body).toHaveProperty("userId")             
    })

    test("Should fail to create a incomplete transaction", async ()=>{       
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;
              
        const response = await request(app).post(`/transactions`).set("Authorization", `Bearer ${token}`).send(failTransaction);
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")             
    })

})

describe("list transactions",  () =>{
    let connection:DataSource

    beforeAll( async ()=>{
        await AppDataSource.initialize()
        .then((res)=> (connection =res))
        .catch((err)=>console.error("Failure on Database Initialization", err))
    })

    afterAll( async ()=>{
        await connection.destroy()
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
    const successTransaction ={
        description:"Azalea",
        value:200,
        type:"out",
        category:"gift",
        card_id:1
    }
    
    

    test("Should list user transactions", async ()=>{
        const newUser = await request(app).post("/users").send(sucessUser);  
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;
        
        await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard);
        
        const response = await request(app).get(`/transactions/userTransactions`);
        expect(response.status).toBe(202)          
    })

    test("Should list card transactions", async ()=>{     
        const login =  await request(app).post("/users/login").send(sucessLogin);

        const {token} = login.body

        const response = await request(app).get(`/transactions/1`).set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(202)          
    })



})

describe("update transaction",  () =>{
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
    
    

    test("Should update a user transaction", async ()=>{
        const newUser = await request(app).post("/users").send(sucessUser);  
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;
        
        await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard);
        
        const response = await request(app).patch(`/transactions/1`).set("Authorization", `Bearer ${token}`).send(updateData);
       
        expect(response.status).toBe(202) 
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("description")
        expect(response.body).toHaveProperty("category")
        expect(response.body).toHaveProperty("value")
        expect(response.body).toHaveProperty("type")
        expect(response.body).toHaveProperty("cardId")
        expect(response.body).toHaveProperty("userId")           
    })



})

describe("delete transaction",  () =>{
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
    const successTransaction ={
        description:"Azalea",
        value:200,
        type:"out",
        category:"gift",
        card_id:1
    }
    
    

    test("Should delete a user transaction", async ()=>{
        const newUser = await request(app).post("/users").send(sucessUser);  
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body;
        console.log(newUser.body)  
        await request(app).post("/cards").set("Authorization", `Bearer ${token}`).send(sucessCard);

        const response = await request(app).delete(`/transactions/1`).set("Authorization", `Bearer ${token}`);

        
        expect(response.status).toBe(204)           
    })



})