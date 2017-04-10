import { async, ComponentFixture, TestBed, fakeAsync, inject, tick, getTestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { FindTripComponent } from './FindTrip/findTrip.component';
import { FindTripModel } from './FindTrip/FindTripDataModel'
import { RouterLinkStubDirective } from '../testing/router-stubs';
import { RouterOutletStubComponent } from '../testing/router-stubs';
import { FindTripService } from './FindTrip/findTrip.service';
import { FindTripMockService } from '../testing/FindTripMock.service';
import { Observable } from 'rxjs/Rx';
import { FindTripModule } from './FindTrip/findTrip.module';
//Import Mock Input Data (BookingCode & Family Name) for Validation testing
import {

  defaultTestData,
  validTestData,
  minLengthBookingCodeTest,
  maxLengthBookingCodeTest,
  patternBookingCodeTest,
  minLengthFamilyNameTest,
  maxLengthFamilyNameTest,
  patternFamilyNameTest

} from '../testing/mockFindTripData';
import { ServiceResponse, serviceTestData } from '../testing/serviceData';
let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

let findTripComp: FindTripComponent;
let findTripFixture: ComponentFixture<FindTripComponent>;

// let retrieveBtn: DebugElement;
let retreiveBookingBtn: HTMLElement;

//let findTripService: FindTripService; // the actually injected service
//let findTripSpy: jasmine.Spy;
let findTripMockService: FindTripMockService;
import { AppModule } from './app.module';
import { AppRouterModule } from './app-router.module';

describe('AppComponent & AppModule', () => {


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: FindTripService, useClass: FindTripMockService }
      ]

    })
      .overrideModule(AppModule, {
        remove: {
          imports: [AppRouterModule],

        },
        add: {
          declarations: [RouterLinkStubDirective, RouterOutletStubComponent]

          //  imports:[FormGroup,ReactiveFormsModule]

        }
      })

      .compileComponents()

      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
        findTripFixture = TestBed.createComponent(FindTripComponent);
        findTripComp = findTripFixture.componentInstance;

        // findTripService actually injected into the component
        //findTripService = findTripFixture.debugElement.injector.get(FindTripService);

        findTripFixture.detectChanges();
      });
  }));

  tests();
});

/* ..................***************Creating Find TRIP SPECIFIC TestBed*********** .. */

describe('FIndTrip COmponent & FindTrip Module', () => {


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [FindTripModule]

    })

      .overrideModule(FindTripModule, {

        set: {
          providers: [
            { provide: FindTripService, useClass: FindTripMockService }
          ]
        }
      })

      .compileComponents()

      .then(() => {
        findTripFixture = TestBed.createComponent(FindTripComponent);
        findTripComp = findTripFixture.componentInstance;
        // findTripFixture = TestBed.createComponent(FindTripComponent);
        // findTripComp = findTripFixture.componentInstance;

        // findTripService actually injected into the component
        //findTripService = findTripFixture.debugElement.injector.get(FindTripService);
        findTripMockService = fixture.debugElement.injector.get(FindTripService);
        //findTripFixture.detectChanges();
      });
  }));

  findTripTest();
});
/* ....*****************END OF FIND TRIP........ */


// create reusable function for a dry spec.
function updateForm(bookingCode, familyName) {
  findTripComp.findTripForm.controls['bookingCode'].setValue(bookingCode);
  findTripComp.findTripForm.controls['familyName'].setValue(familyName);
}
function tests() {
  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];

  beforeEach(() => {


    fixture.detectChanges();
    findTripFixture.autoDetectChanges();
    //const findTripService = TestBed.get(FindTripService);
    //findTripSpy = spyOn(findTripService, 'getBookingData');


    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkStubDirective));

    // get the attached link directive instances using the DebugElement injectors
    links = linkDes
      .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  });


  it('should create the app component with router-outlet in it', () => {
    expect(comp).not.toBeNull();
  });

  it('should not contain routerLink in template of app Component', () => {
    expect(links.length).toBe(0, 'should not have any routerLink Element in component');

  });


  it('should create FindTrip Component', () => {
    expect(findTripComp).not.toBeNull();
  });

  it('default Value for form field & form Model', fakeAsync(() => {
    updateForm(defaultTestData.bookingCode, defaultTestData.familyName);
    expect(findTripComp.findTripForm.value).toEqual(defaultTestData);
  }));


  it('form value should update from form changes--data binding between model & formControl', fakeAsync(() => {
    updateForm(validTestData.bookingCode, validTestData.familyName);
    expect(findTripComp.findTripForm.value).toEqual(validTestData);
  }));


  it('min length Validation check for BookingCode', fakeAsync(() => {
    updateForm(minLengthBookingCodeTest.bookingCode, minLengthBookingCodeTest.familyName);
    expect(findTripComp.findTripForm.valid).toBeFalsy();
  }));


  it('max length Validation check for BookingCode', fakeAsync(() => {
    updateForm(maxLengthBookingCodeTest.bookingCode, maxLengthBookingCodeTest.familyName);
    expect(findTripComp.findTripForm.valid).toBeFalsy();
  }));

  it('pattern Validation check for BookingCode', fakeAsync(() => {
    updateForm(patternBookingCodeTest.bookingCode, patternBookingCodeTest.familyName);
    expect(findTripComp.findTripForm.valid).toBeFalsy();
  }));

  it('min length Validation check for familyName', fakeAsync(() => {
    updateForm(minLengthFamilyNameTest.bookingCode, minLengthFamilyNameTest.familyName);
    expect(findTripComp.findTripForm.valid).toBeFalsy();
  }));

  it('max length Validation check for familyName', fakeAsync(() => {
    updateForm(maxLengthFamilyNameTest.bookingCode, maxLengthFamilyNameTest.familyName);
    expect(findTripComp.findTripForm.valid).toBeFalsy();
  }));

  it('pattern Validation check for familyName', fakeAsync(() => {
    updateForm(patternFamilyNameTest.bookingCode, patternFamilyNameTest.familyName);
    expect(findTripComp.findTripForm.valid).toBeFalsy();
  }));


  /*
    it('should update findTripDataModel on submit', fakeAsync(() => {
      updateForm(validTestData.bookingCode, validTestData.familyName);
      findTripFixture.detectChanges();
     // findTripComp.retrieveBooking();
      expect(findTripComp.findTripModel).toEqual(validTestData);
    }));*/



}

function findTripTest() {

  it('service should get called on findTripComponent submit click', fakeAsync(() => {
    const spy = spyOn(findTripMockService, 'getBookingData').and.returnValue(
      Observable.of(serviceTestData)
    );
    findTripComp.retrieveBooking();
    findTripFixture.detectChanges();
    // expect(findTripComp.bookingData).toEqual(serviceTestData);
    expect(spy.calls.any()).toEqual(true);




  }));
}
