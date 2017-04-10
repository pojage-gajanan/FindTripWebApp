import { async, ComponentFixture, TestBed, fakeAsync, inject, tick, getTestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { AppRouterModule } from './app-router.module';

import { RouterLinkStubDirective } from '../testing/router-stubs';
import { RouterOutletStubComponent } from '../testing/router-stubs';

import { FindTripComponent } from './FindTrip/findTrip.component';

import { FindTripService } from './FindTrip/findTrip.service';
import { FindTripModule } from './FindTrip/findTrip.module';
import { dummyResponse } from '../testing/dummyResponse';

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

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

let findTripComp: FindTripComponent;
let findTripFixture: ComponentFixture<FindTripComponent>;

let findTripServiceSpy: FindTripServiceSpy;   //Must get instantiated from Injector Only

/* **************Test Description for AppComponent and AppModule **********/

describe('AppComponent & AppModule', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [AppModule]
    })
      .overrideModule(AppModule, {
        remove: {
          imports: [AppRouterModule],
        },
        add: {
          declarations: [RouterLinkStubDirective, RouterOutletStubComponent]
        },
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
      });
  }));

  appComponentTests();
});


/* **************Test Description for FindTripComponent and FindTripModule **********/

describe('FIndTrip COmponent & FindTrip Module', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FindTripModule]
    })
      .overrideModule(FindTripModule, {
        set: {
          providers: [
            { provide: FindTripService, useClass: FindTripServiceSpy }
          ]
        }
      })
      .compileComponents()
      .then(() => {
        findTripFixture = TestBed.createComponent(FindTripComponent);
        findTripComp = findTripFixture.componentInstance;
        findTripServiceSpy = findTripFixture.debugElement.injector.get(FindTripService);
      });
  }));

  findTripTest();
});


// create reusable function for a validatation testing
function updateForm(bookingCode, familyName) {
  findTripComp.findTripForm.controls['bookingCode'].setValue(bookingCode);
  findTripComp.findTripForm.controls['familyName'].setValue(familyName);
}

function appComponentTests() {
  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];

  beforeEach(() => {

    fixture.detectChanges();
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
}

//Spec for FindTrip Component
function findTripTest() {
  it('should create FindTrip Component', () => {
    expect(findTripComp).not.toBeNull();
  });

  it('should validate default Value for form field & form Model', fakeAsync(() => {
    updateForm(defaultTestData.bookingCode, defaultTestData.familyName);
    expect(findTripComp.findTripForm.value).toEqual(defaultTestData);
  }));


  it('should have equal values for form control  and Model', fakeAsync(() => {
    updateForm(validTestData.bookingCode, validTestData.familyName);
    expect(findTripComp.findTripForm.value).toEqual(validTestData);
  }));


  it('should have min lenght of 5 for booking code', fakeAsync(() => {
    updateForm(minLengthBookingCodeTest.bookingCode, minLengthBookingCodeTest.familyName);
    expect(findTripComp.findTripForm.valid).toBeFalsy();
  }));


  it('should have max length of 30 charectors for booking code ', fakeAsync(() => {
    updateForm(maxLengthBookingCodeTest.bookingCode, maxLengthBookingCodeTest.familyName);
    expect(findTripComp.findTripForm.valid).toBeFalsy();
  }));

  it('should success for pattern validation for booking code', fakeAsync(() => {
    updateForm(patternBookingCodeTest.bookingCode, patternBookingCodeTest.familyName);
    expect(findTripComp.findTripForm.valid).toBeFalsy();
  }));

  it('should success for min length validation for family name', fakeAsync(() => {
    updateForm(minLengthFamilyNameTest.bookingCode, minLengthFamilyNameTest.familyName);
    expect(findTripComp.findTripForm.valid).toBeFalsy();
  }));

  it('should success for max length Validation for familyName', fakeAsync(() => {
    updateForm(maxLengthFamilyNameTest.bookingCode, maxLengthFamilyNameTest.familyName);
    expect(findTripComp.findTripForm.valid).toBeFalsy();
  }));

  it('should success for pattern Validation check for familyName', fakeAsync(() => {
    updateForm(patternFamilyNameTest.bookingCode, patternFamilyNameTest.familyName);
    expect(findTripComp.findTripForm.valid).toBeFalsy();
  }));

  it('should call FindTripService and valid response', fakeAsync(() => {

    findTripComp.retrieveBooking();

    tick(); // wait for async save to complete
    expect(findTripServiceSpy.testResponse.bookingCode).toBe('PZIGZ3');

  }));

}
class FindTripServiceSpy {
  testResponse = dummyResponse;

  getBookingData = jasmine.createSpy('getBookingData').and.callFake(
    ({ bookingCode = '34567', familyName = 'TEST' }) => Promise
      .resolve(true)
      .then(() => Object.assign({}, this.testResponse))
  );


}