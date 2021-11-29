import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.page.html',
  styleUrls: ['./configuraciones.page.scss'],
})
export class ConfiguracionesPage implements OnInit {

  constructor() { }

  darkMode: boolean = false;

  ngOnInit() {
  }

  cambio(){
    this.darkMode = !this.darkMode;
    if(this.darkMode){
      document.body.classList.toggle('dark');
      document.body.setAttribute('color-theme', 'dark');
    }else{
      document.body.classList.toggle('default');
      document.body.setAttribute('color-theme', 'default')
    }
    

  }

}
