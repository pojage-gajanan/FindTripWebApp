import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: '/findTrip', pathMatch: 'full' },
     { path: '**', redirectTo: '/findTrip', pathMatch: 'full' }
]
@NgModule({

    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRouterModule { }