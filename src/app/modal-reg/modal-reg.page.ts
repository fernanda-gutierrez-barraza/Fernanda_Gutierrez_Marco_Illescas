import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { User } from '../interfaces/user.interface';
import { BdserviceService } from '../services/bdservice.service';
/*import { CryptoService } from '../services/crypto.service';*/
import { ServicedatosService } from '../services/servicedatos.service';
import { Sweetalert2Service } from '../services/sweetalert2.service';

@Component({
  selector: 'app-modal-reg',
  templateUrl: './modal-reg.page.html',
  styleUrls: ['./modal-reg.page.scss'],
})
export class ModalRegPage implements OnInit {

  emailPattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';

  regForm: FormGroup = new FormGroup({
    name: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    age: new FormControl(),
    password: new FormControl(),
                                      });

  constructor(private alertController: AlertController,
              private router: Router,
              private fb: FormBuilder,
              private modalCtrl: ModalController,
              private storage: Storage,
              public sweet: Sweetalert2Service,
              private servDatos: ServicedatosService,
              private bdservice: BdserviceService) {
  }

  ngOnInit() {
    this.crearRegForm();
  }

  crearRegForm(){
    this.regForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3)]],
      lastname: ['',[Validators.required, Validators.minLength(3)]],
      age: ['',[Validators.required, Validators.max(99)]],
      email:['',[Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['',[Validators.required, Validators.minLength(5)]],
    });
  };

  get emailNotValid(){
    const getEmail = this.regForm.get('email');
    return getEmail.invalid && getEmail.touched;
  }

  get passwordNotValid(){
    const getPassword = this.regForm.get('password');
    return getPassword.invalid && getPassword.touched;
  }


  get nombreNotValid(){
    const getNombre = this.regForm.get('name');
    return getNombre.invalid && getNombre.touched;
  }

  get apellidoNotValid(){
    const getApellido = this.regForm.get('lastname');
    return getApellido.invalid && getApellido.touched;
  }

  get edadNotValid(){
    const getEdad = this.regForm.get('age');
    return getEdad.invalid && getEdad.touched;
  }

  onSubmit(){
    if(this.regForm.invalid){
      Object.values(this.regForm.controls).forEach(control=>{
        control.markAsTouched();
        control.setValue('');
      });
      return;
    }else{
      console.log(this.regForm.value);
    }
  }

  exit(){
    this.modalCtrl.dismiss();
  }


  createSesionData() {
    if(this.regForm.valid){
      const datoUser: User = Object.assign({},this.regForm.value);
      datoUser.active=0;
      datoUser.created = new Date().toLocaleDateString();
      this.servDatos.addData(datoUser)
      .then(()=>{
        
        this.modalCtrl.dismiss();
      })
      .catch((error)=>{
        console.log(error);
        this.modalCtrl.dismiss();
       
      });
    }
    else{
      this.sweet.sweetWarning('Error', 'You must fill in all fields');
    }
  }
}
