import { TestBed,ComponentFixture, async } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { By }              from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {FindTripComponent} from './FindTrip/findTrip.component';
import { RouterOutletStubComponent } from '../testing/router-stubs';
import {FormGroup,ReactiveFormsModule }from '@angular/forms';

 
describe('AppComponent', () => {
   let comp:    FindTripComponent;
  let fixture:  ComponentFixture<FindTripComponent>;
  let labelElem:      DebugElement;
  let label_el:      HTMLElement;

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

 beforeEach(() => {
   const fixture1 = TestBed.createComponent(FindTripComponent);

    const comp1 = fixture1.componentInstance; // FindTripComponent test instance

    // query for the top <label> by CSS element selector
    labelElem = fixture.debugElement.query(By.css('.label_checkin'));
    label_el = labelElem.nativeElement;


  
  });

  it('FindTrip Page should display title as "CHECK_IN"', () => {
    expect(label_el.textContent).toEqual('CHECK-IN');
  });


  
});
