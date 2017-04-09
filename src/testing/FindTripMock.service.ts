export class FindTripMockService {

responseData={
    'bookingCode':'',
'familyName':''
}

  getBookingData = jasmine.createSpy('getBookingData').and.callFake(
    (reqData:ModelData) => Promise
      .resolve(true)
      .then(() => Object.assign(this.responseData,reqData))
  );

  
}

 export class ModelData {
bookingCode='';
familyName='';

}