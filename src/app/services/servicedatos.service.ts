import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../interfaces/user.interface';
import { Sweetalert2Service } from './sweetalert2.service';

const ITEMS_KEY = 'users';

@Injectable({
    providedIn: 'root'
})
export class ServicedatosService {

    private storageData: Storage;

    constructor(private storage: Storage , public sweet : Sweetalert2Service) {
        this.init();
    }

    async init() {
        const storage = await this.storage.create();
        this.storageData = storage;
    }

    getData(): Promise<User[]> {
        return this.storage.get(ITEMS_KEY);
    }





    async addData(data:User):Promise<any>{
        return this.getData().then((d : User[])=>{   
          if(d == null){ 
            data.username = this.autoUSername(data.name , data.lastname , data.password);
            this.sweet.sweetOK('Ok', 'User created');
            return this.storage.set(ITEMS_KEY, [data]);  
          }else{
            const result = d.find(element => element.email == data.email || element.password == data.password)
            if(result == undefined){       
                data.username = this.autoUSername(data.name , data.lastname , data.password);
                d.push(data);
                this.sweet.sweetOK('Ok', 'User created');
                return this.storage.set(ITEMS_KEY, d);
            }else{
              this.sweet.sweetWarning('Error', 'email or password already in use');
            }              
          }
        });         
    }

    autoUSername(name : string , lastname : string, pass : string ){      
        let username = name.slice(0,2 ).toUpperCase()+lastname.slice(-2).toLowerCase()+pass.toUpperCase()
        return username;
          
    }


    



    async updateData(data:User): Promise<any>{
        return this.getData().then((d : User[])=>{
          if(!d || d.length === 0 ){
            return null;
          }
          let newdata: User[] = [];
          for (let i of d){
            if(i.email === data.email){
              newdata.push(data);
              
            }else{
              newdata.push(i);
            }
          }
          return this.storage.set(ITEMS_KEY , newdata) 
        });
    }


    async updateActive(element: User, active: number): Promise<any> {
        const datos = await this.storage.get(ITEMS_KEY);
        if (!datos || datos.length === 0) {
            return null;
        }
        const newDato: User[] = [];
        for (const i of datos) {
            if (i.email === element.email) {
                element.active = active;
                newDato.push(element);
            }
            else {
                newDato.push(i);
            }
        }
        return await this.storage.set(ITEMS_KEY, newDato);
    }





    async deleteData(email : string): Promise<User>{
        return this.getData().then((data : User[])=>{
          if (!data || data.length === 0 ){
            return null;
        }
          let toKeep: User[] = [];
          for(let i of data){
            if(i.email !== email ){
              toKeep.push(i);
            }
            }
          return this.storage.set(ITEMS_KEY, toKeep); 
        });
     
     
    }


    changePassword(Currentpass : string , NewPass : string){
        return this.getData().then((d : User[])=>{
          let A = d.findIndex(element => element.password === Currentpass)
          d[A].password = NewPass 
          return this.storage.set(ITEMS_KEY, d)
        });
    
    }

    changeUsername(username: string , password : string){
        return this.getData().then((d : User[])=>{
            let A = d.findIndex(element => element.password === password)
            d[A].username = username 
            return this.storage.set(ITEMS_KEY, d)    
        });

    }


    async login(email: string, pass: string): Promise<any> {
        const datos = await this.storage.get(ITEMS_KEY);
        let encontrado = false;
        if (!datos || datos.length === 0) {
            encontrado = false;
        } else {
            datos.forEach(element => {
                if (element.email === email && element.password === pass) {
                    this.updateActive(element, 1);
                    console.log('encontrado');
                    return encontrado = true;
                }
            });
            return encontrado;

        }
    }

    async logout(): Promise<any> {
        const datos = await this.storage.get(ITEMS_KEY);
        let encontrado = false;
        if (!datos || datos.length === 0) {
            encontrado = false;
        }
        datos.forEach(element => {
            if (element.active === 1) {
                this.updateActive(element, 0);
                encontrado = true;
            }
            else {
                encontrado = false;
            }
        });
        return encontrado;
    }
}
