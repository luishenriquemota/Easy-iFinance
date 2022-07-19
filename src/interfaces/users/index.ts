export interface IUserCreate {
  name: string;
  email: string;
  password?: string;
  birth_date: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdated {
  name: string;
  email: string;
  password: string;
}

export interface IUserReturn {
  id: string;
  name: string;
  email: string;
  birth_date: Date;
  created_at: Date;
  updated_at: Date;
  isActive?: Boolean;
  friendList_id?: Number;
  ownCardList_id?: Number;
  allowedCardList_id?: Number;
}

export interface Idecoded {
  id:string
}
