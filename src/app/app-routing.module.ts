import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate:[AuthGuardService]
  },{
    path: 'tipos-er',
    loadChildren: () => import('./pages/tipos-er/tipos-er.module').then( m => m.TiposERPageModule),
    canActivate:[AuthGuardService]
    
  },
  {
    path: 'noticias',
    loadChildren: () => import('./pages/noticias/noticias.module').then( m => m.NoticiasPageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'configuraciones',
    loadChildren: () => import('./pages/configuraciones/configuraciones.module').then( m => m.ConfiguracionesPageModule),
    canActivate:[AuthGuardService]
  },
  
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'modify-user',
    loadChildren: () => import('./pages/modify-user/modify-user.module').then( m => m.ModifyUserPageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'change-username',
    loadChildren: () => import('./pages/change-username/change-username.module').then( m => m.ChangeUsernamePageModule),
    canActivate:[AuthGuardService]
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
