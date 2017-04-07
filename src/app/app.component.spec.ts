import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {FindTripComponent} from './FindTrip/findTrip.component';
import { RouterOutletStubComponent } from '../testing/router-stubs';
import {FormGroup,ReactiveFormsModule }from '@angular/forms';

 
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, RouterOutletStubComponent,FindTripComponent
      ],
       imports: [ReactiveFormsModule] 
    }).compileComponents();
  }));

  it('should create the app with router-outlet ', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  
});
