import { FindTripAppPage } from './app.po';

describe('find-trip-app App', () => {
  let page: FindTripAppPage;

  beforeEach(() => {
    page = new FindTripAppPage();
  });

  it('should display header with text "CHECK-IN" ', () => {
    page.navigateTo();
    expect(page.getHeaderForFindTripPagetext()).toEqual('CHECK-IN');
  });

    it('should display first section with content text "RETRIEVE YOUR"', () => {
    page.navigateTo();
    expect(page.getSectionContentForFindTripPage().get(0).getText()).toEqual('RETRIEVE YOUR');
  });

    it('should display first section with content text "BOOKING" ', () => {
    page.navigateTo();
    expect(page.getSectionContentForFindTripPage().get(1).getText()).toEqual('BOOKING');
  });
   it('should display first section with content text "-" ', () => {
    page.navigateTo();
    expect(page.getSectionContentForFindTripPage().get(2).getText()).toEqual('-');
  });

 it('should display detail info for retrive booking data using booking code & family name. ', () => {
    page.navigateTo();
    expect(page.getArticleContentForFindTripPage()).toEqual('You can find your booking by filling out your family name and the booking code in your booking confirmation.');
  });
 it('should display two input boxes with label as BookingCode and familyName ', () => {
    page.navigateTo();
    expect(page.getInputTextBoxCount().count()).toEqual(2);
     expect(page.getInputLabels().get(0).getText()).toEqual('Booking code');
     expect(page.getInputLabels().get(1).getText()).toEqual('Family name');
  });

 it('should display submit button with text as "Retrieve booking" ', () => {
    page.navigateTo();

     expect(page.getSubmitButton().getText()).toEqual('Retrieve booking');

  });


  it('should successfully show passenger data on providing inputs & clicking button', function() {
    var bookingCodeElm = page.getBookingCodeInputElem();
    var familyName = page.getFamilyNameInputElem();
    bookingCodeElm.sendKeys('ER345');
    familyName.sendKeys('GAJANAN');
    expect(page.handleClickEvent()).toBeTruthy();
  }); 
 


});

