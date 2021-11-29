import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ServicedatosService } from './servicedatos.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    authState = new BehaviorSubject(false);
    constructor(
        private router: Router,
        
        public toastController: ToastController,
        private servidata: ServicedatosService
    ) {
     
    }

   

    logout() {
        this.servidata.logout();
        this.authState.next(false);
    }

    login(email: string, pass: string) {
        const valido = this.servidata.login(email,pass).then(res=>{
            console.log(res);
            if(res){
                this.router.navigate(['/inicio']);
                this.presentToast(`Welcome/ @ ${email}`);
                return this.authState.next(true);
            }else{
                return this.authState.next(false);
            }
        });
    };

    async presentToast(message: string, duration?: number) {
        const toast = await this.toastController.create(
            {
                message,
                duration: duration ? duration : 2000
            }
        );
        toast.present();
    }
    isAuthenticated() {
        return this.authState.value;
    }
}
