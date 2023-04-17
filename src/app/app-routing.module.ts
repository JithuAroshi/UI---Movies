import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';

const routes: Routes = [
{path :'' , pathMatch:'full' , component:MainComponent},
{path :'SearchResult/:search' , component:SearchComponent},
{path :'detailpage/:detail' , component:DetailComponent},
{path :'login' , component:LoginComponent},
{path :'user' , component:UserdetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
