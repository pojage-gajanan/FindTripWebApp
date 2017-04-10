import { browser, element, by } from 'protractor';

export class FindTripAppPage {
  navigateTo() {
    return browser.get('/findTrip');  
  }

  getHeaderForFindTripPagetext() {
    return element(by.css('.label_checkin')).getText();
  }

    getSectionContentForFindTripPage() {
    return element.all(by.css('.font_title'));
  }
     getArticleContentForFindTripPage() {
    return element(by.css('.font_detail p')).getText();
  }
  getInputTextBoxCount(){
   return  element.all(by.css("input[type=text]"));
  }
  getInputLabels(){
    return  element.all(by.css(".form-group label"));
  }
  getSubmitButton(){
     return  element(by.tagName('button'));
  }
  getBookingCodeInputElem(){
   return element( by.css(".bookingcls"));
  }
  getFamilyNameInputElem(){
   return element( by.css(".familycls"));
  }
  handleClickEvent(){
        this.getSubmitButton().click().then(function () {
       // expect($('[ng-show=isLoggedIn]').isDisplayed()).toBeTruthy();
       let passengerDetailDiv = element.all(by.css(".passengerCls div:first"));

      return  expect(passengerDetailDiv.getText()).not.toBeNull();
    });
  }

}


