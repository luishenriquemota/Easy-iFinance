export interface IUserCreate {
    name: string;
    email: string;
    password: string;
    birth_date: Date;
  }
  
export interface IUserLogin {
  email: string;
  password:string;
}  


export interface IUserUpdated {
  name: string;
  email: string;
  password: string;
}