export interface urlParameters{
    restaurant_id: string, 
    table_number: string, 
    restaurant_name: string 
}

export interface tokenRequest{
    uid: string
    restaurantID: string,
    restaurantName: string,
    tableNumber: string
    date: string
  }

  export interface event_ {

    isLogged: boolean,
    isAdmin: boolean,
    userName?: string,
    isSignedOut?: boolean,
    restaurantName?: string
  
  }

  export class FileUpload {
    key: string;
    name: string;
    url: string;
    file: File;
   
    constructor(file: File) {
      this.file = file;
    }
  }


  export interface Registration{

    date_: Date ;
    phone_: string;
    email_: string;
    name_: string;
    uuid_: string


  }