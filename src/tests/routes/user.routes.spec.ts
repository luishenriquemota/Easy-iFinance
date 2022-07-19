import  request from "supertest"
import { DataSource } from "typeorm"
import app from "../../app"
import { AppDataSource } from "../../data-source"


describe("Create new user",()=>{
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
    }
    const failUser = {
        "name":"teste2",
        "email":"teste2@teste.com",
        "password":"senhaforte@123",
       
    }
    test("Should create a new user", async ()=>{
        const response = await request(app).post("/users").send(sucessUser);
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("birth_date")
        expect(response.body).toHaveProperty("email")
    })
    test("Should fail to create a duplicated user", async ()=>{
        const response = await request(app).post("/users").send(sucessUser);
        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty("message")
    })
    test("Should fail to create a user without info", async ()=>{
        const response = await request(app).post("/users").send(sucessUser);
        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty("message")
    })
})

describe("Login a new User",()=>{
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
    }
    const sucessLogin ={
        "email":"teste@teste.com",
        "password":"senhaforte@123"
    }
    const failLogin = {
        "email":"teste@teste.com",
        "password":"123"       
    }
    const failLogin2 = {
        "email":"teste1@teste.com",
        "password":"senhaforte@123"       
    }
    test("Should login a user", async ()=>{
        const newUser = await request(app).post("/users").send(sucessUser);
        
        const response = await request(app).post("/users/login").send(sucessLogin)
        
        expect(response.status).toBe(202)
        expect(response.body).toHaveProperty("token")

    })
    test("Should fail to login a user with a invalid password", async ()=>{

        const response = await request(app).post("/users/login").send(failLogin)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })
    test("Should fail to login a user with a invalid email", async ()=>{

        const response = await request(app).post("/users/login").send(failLogin2)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })
})

describe("Get user profile",()=>{
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
    }
    const sucessLogin ={
        "email":"teste@teste.com",
        "password":"senhaforte@123"
    }
    test("Should return the user logged profile data", async ()=>{

        const newUser = await request(app).post("/users").send(sucessUser);    
        
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body   
        
        const response = await request(app).get("/users/profile").set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(202)
        expect(response.body).toHaveProperty("id") ;
        expect(response.body).toHaveProperty("created_at");
        expect(response.body).toHaveProperty("updated_at");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("cards");
        expect(response.body).toHaveProperty("transactions");
        

    })
    
})

describe("Update user profile",()=>{
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
    }
    const sucessLogin ={
        "email":"teste@teste.com",
        "password":"senhaforte@123"
    }
    const updatedData = {
        name:"test3"
    }
    test("Should return the user updated data", async ()=>{

        const newUser = await request(app).post("/users").send(sucessUser);    
        
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body 
        
        const response = await request(app).patch("/users").set("Authorization", `Bearer ${token}`).send(updatedData)

        expect(response.status).toBe(202)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("created_at");
        expect(response.body).toHaveProperty("updated_at");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("birth_date");
        expect(response.body).toHaveProperty("isActive");
        

    })
    
})

describe("Delete user profile",()=>{
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
    }
    const sucessLogin ={
        "email":"teste@teste.com",
        "password":"senhaforte@123"
    }
    const updatedData = {
        name:"test3"
    }
    test("Should delete a user", async ()=>{

        const newUser = await request(app).post("/users").send(sucessUser);    
        
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body 
        
        const response = await request(app).delete("/users").set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(204)

    })
    
})