import { async, ComponentFixture, TestBed,fakeAsync,  inject,  tick} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

  import { Component }                 from '@angular/core';
  import { AppComponent }              from './app.component';
  import { FindTripComponent }           from './FindTrip/findTrip.component';
  import{FindTripModel} from './FindTrip/FindTripDataModel'
  import { RouterLinkStubDirective }   from '../testing/router-stubs';
  import { RouterOutletStubComponent } from '../testing/router-stubs';

  //Import Mock Input Data (BookingCode & Family Name) for Validation testing
import {
  DefaultData,

} from '../testing/mockFindTripData';
let comp:    AppComponent;
let fixture: ComponentFixture<AppComponent>;
let page:Page;
let findTripComp:    FindTripComponent;
let findTripFixture: ComponentFixture<FindTripComponent>;
let defaultData:DefaultData;

let expectedModel:FindTripModel;
   let retrieveBtn: DebugElement;
import { AppModule }    from './app.module';
import { AppRouterModule } from './app-router.module';

describe('AppComponent & AppModule', () => {

  beforeEach( async(() => {

    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })

    .overrideModule(AppModule, {
      remove: {
        imports: [ AppRouterModule ]
      },
      add: {
        declarations: [ RouterLinkStubDirective, RouterOutletStubComponent ]
      //  imports:[FormGroup,ReactiveFormsModule]
      }
    })

    .compileComponents()

    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp    = fixture.componentInstance;
     findTripFixture= TestBed.createComponent(FindTripComponent);
     findTripComp=findTripFixture.componentInstance;

    // findTripComp.findTripModel=new FindTripModel('','');
    // defaultData=new DefaultData('','');
    findTripFixture.detectChanges();
    });
  }));

  tests();
});

 // create reusable function for a dry spec.
  function updateForm(bookingCode, familyName) {
    findTripComp.findTripForm.controls['bookingCode'].setValue(bookingCode);
    findTripComp.findTripForm.controls['familyName'].setValue(familyName);
  }
function tests() {
  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];

  beforeEach(() => {
  
    retrieveBtn = findTripFixture.debugElement.query(By.css('button'));
    page    = new Page();
    // trigger initial data binding
    fixture.detectChanges();
    findTripFixture.autoDetectChanges();

 
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

 let defaultData = findTripComp.findTripModel;

    it('should have default bookingCode & familyName Values', fakeAsync(() => {
    expect(findTripComp.findTripModel).toEqual(DefaultData);
  }));
let validData=new DefaultData('23345','errr');
  it('form value should update from form changes--data binding between model & formControl', fakeAsync(() => {
    updateForm(validData.bookingCode, validData.familyName);
    expect(findTripComp.findTripForm.value).toEqual(validData);
  }));
 let InvalidTestData ={'bookingCode':'123456','familyName':'45DRD'};
 
  it('expect Retrieve booking button to be disabled when input is invalid ', () => {
updateForm(InvalidTestData.bookingCode, InvalidTestData.familyName);
expect( page.saveBtn.nativeElement.getAttribute('disabled')).toBeTruthy("submit button is disabled");
      expect(findTripComp.findTripForm.valid).toBeFalsy();
    
  });




// Validate submit button disable on form invalid 
 
/*...Validation Testing Scenarioes....*/

  /*it('isValid should be false when form is invalid', fakeAsync(() => {
    updateForm(inValidData.bookingCode, inValidData.familyName);
    expect(findTripComp.).toBeFalsy();
  }));*/
  
  /*button should be disabled on Invalid Data...*/

 /* it('should update model on submit', fakeAsync(() => {
    updateForm(validUser.email, validUser.password);
    comp.onSubmit();
    expect(comp.user).toEqual(validUser);
  }));*/

/* Service Call Test..*/

}
class Page {
  gotoSpy:      jasmine.Spy;
  navSpy:       jasmine.Spy;

  saveBtn:      DebugElement;


  constructor() {
   
    this.gotoSpy = spyOn(comp, 'gotoList').and.callThrough();
  
  }

  /** Add page elements after hero arrives */
  addPageElements() {
    if (findTripComp.findTripModel) {
      // have a hero so these elements are now in the DOM
      const buttons    = findTripFixture.debugElement.queryAll(By.css('button'));
      this.saveBtn     = buttons[0];
 
    }
  }
}