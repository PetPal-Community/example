import { Routes } from '@angular/router';
import { PetFormComponent } from './pages/pet-form/pet-form.component';
import { PetReportComponent } from './pages/pet-report/pet-report.component';
import { PetListComponent } from './pages/pet-list/pet-list.component';

export const routes: Routes = [
    
    {path:'register', component: PetFormComponent},
    {path: 'reports', component: PetReportComponent},
    {path: 'list', component:PetListComponent}, 
    {path: '', redirectTo:'/register', pathMatch:'full'},

];
