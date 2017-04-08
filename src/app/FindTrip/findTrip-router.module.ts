import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FindTripComponent } from './findTrip.component';


const findTripRoutes: Routes = [
    { path: 'findTrip', component: FindTripComponent }
]
@NgModule({
    imports: [RouterModule.forChild(findTripRoutes)],
    exports: [RouterModule]
})
export class FindTripRouterModule { }