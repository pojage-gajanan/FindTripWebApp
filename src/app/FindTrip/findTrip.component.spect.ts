import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { FindTripComponent } from './findTrip.component';

describe('FindTripComponent (templateUrl)', () => {

  let comp:    FindTripComponent;
  let fixture: ComponentFixture<FindTripComponent>;
  let labelElem:      DebugElement;
  let label_el:      HTMLElement;

//Input box for Booking Code
  let bookingCodeElem:      DebugElement;
  let bookingCode_el:      HTMLElement;

//Input Box FamilyName 
    let familyNameElem:      DebugElement;
  let familyName_el:      HTMLElement;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindTripComponent ], // declare the test component
    })
    .compileComponents();  // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(FindTripComponent);

    comp = fixture.componentInstance; // FindTripComponent test instance

    // query for the top <label> by CSS element selector
    labelElem = fixture.debugElement.query(By.css('.label_checkin'));
    label_el = labelElem.nativeElement;

       // query for the Input -BookingCode  by CSS element selector
    bookingCodeElem = fixture.debugElement.query(By.css('input'));
    bookingCode_el = bookingCodeElem.nativeElement;
  
  });

  it('FindTrip Page should display title as "CHECK_IN"', () => {
    expect(label_el.textContent).toEqual('CHECK-IN');
  });

/* it('Booking Code Should be blank', () => {
    expect(el.textContent).toEqual('');
  });
  it('Family Name should be blank', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(comp.title);
  });

  it('should display a different booking Code', () => {
    comp.title = 'Test Title';
    fixture.detectChanges();
    expect(el.textContent).toContain('Test Title');
  });

    it('should display a different family Name', () => {
    comp.title = 'Test Title';
    fixture.detectChanges();
    expect(el.textContent).toContain('Test Title');
  });
*/

});
