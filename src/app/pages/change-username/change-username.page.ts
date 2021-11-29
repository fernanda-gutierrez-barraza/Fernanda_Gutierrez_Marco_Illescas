import { Component, OnInit } from '@angular/core';
import { ServicedatosService } from 'src/app/services/servicedatos.service';

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.page.html',
  styleUrls: ['./change-username.page.scss'],
})
export class ChangeUsernamePage implements OnInit {

  constructor(private storageService : ServicedatosService) { }

  ngOnInit() {
  }

  user ={ 
    pass:'',
    NewUsername:'',
    ConfirmUsername:''
  
  }
  
    changeUsername(){
  
      if(this.user.NewUsername === this.user.ConfirmUsername){
        this.storageService.changeUsername(this.user.NewUsername , this.user.pass);
      }
      
      
      
  
    }

}
