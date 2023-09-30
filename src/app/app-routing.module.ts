import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RunningTableComponent } from './components/running-table/running-table.component';
import { NewOfferComponent } from './components/new-offer/new-offer.component';
import { EditOfferComponent } from './components/edit-offer/edit-offer.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'business/offers', component: RunningTableComponent},
  {path: 'admin/offers/new', component: NewOfferComponent},
  {path: 'admin/offers/:id', component: EditOfferComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
