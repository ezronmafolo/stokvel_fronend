import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Register } from './register/register';
import { Statement } from './statement/statement';
import { Allusers } from './allusers/allusers';
import { Upload } from './upload/upload';
import { Resetpassword } from './resetpassword/resetpassword';

export const routes: Routes = [
    {path: 'login', component:Login},
    {path: 'home', component:Home},
    {path: 'register', component:Register},
    {path: 'statement', component:Home},
    {path: 'allusers', component:Allusers},
    {path: 'upload', component:Upload},
    {path: 'resetpassword', component:Resetpassword},
    {path: 'statement/:id', component: Statement},
    {path: '', component:Home},
    {path: '*', component:Home}
];
