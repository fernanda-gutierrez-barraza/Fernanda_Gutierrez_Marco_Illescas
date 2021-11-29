import { Component, OnInit } from '@angular/core';
import { ServicedatosService } from 'src/app/services/servicedatos.service';


@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.page.html',
  styleUrls: ['./modify-user.page.scss'],
})
export class ModifyUserPage implements OnInit {

  constructor(private storageService : ServicedatosService  ) { }

  ngOnInit() {
  }
user ={ 
  Currentpass:'',
  NewPass:'',
  ConfirmPass:''

}

  changePassword(){

    if(this.user.NewPass === this.user.ConfirmPass){
      this.storageService.changePassword(this.user.Currentpass , this.user.NewPass);
    }
    
    
    

  }

}
