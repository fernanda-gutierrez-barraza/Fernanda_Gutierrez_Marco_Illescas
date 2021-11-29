import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonMenuToggle, MenuController } from '@ionic/angular';


import { Componente } from './interfaces/component.interface';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  
  componentes: Componente[] = [
    {
      icon: 'home-outline',
      name: 'Home',
      redirecTo: '/inicio'
    },{
      icon:'earth-outline',
      name:'Renewable energy',
      redirecTo:'/tipos-er'
    },
    {
      icon: 'newspaper-outline', 
      name: 'News', 
      redirecTo: '/noticias'
    }, 
    {
      icon: 'cog-outline',
      name: 'configuration',
      redirecTo: '/configuraciones'
    },
    {
      icon: 'person-outline',
      name: 'Profile',
      redirecTo: '/profile'
    },
    
  ];
  constructor(
    public auth: AuthenticationService,
    public router: Router, private menu: MenuController) {
    
  }

  checkDarkTheme(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if(prefersDark.matches)
    {
      document.body.setAttribute('color-theme', 'dark');
      
      document.body.classList.toggle('dark');
    }
  };

  ngOnInit() {
    this.checkDarkTheme();
    
  }

  onClick(){
    this.auth.logout();
    this.menu.enable(false);
    this.router.navigate(['/login']);
  }

  
}
