import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { FindTripRouterModule } from './findTrip-router.module';

import { FindTripComponent } from './findTrip.component';
import {FindTripService} from './findTrip.service';

@NgModule({
    declarations: [FindTripComponent],
    imports: [CommonModule, HttpModule, ReactiveFormsModule, FindTripRouterModule],
    providers:[FindTripService]
})
export class FindTripModule { }