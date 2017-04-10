
import {Observable} from "rxjs/Rx";
import {ServiceResponse,serviceTestData} from './serviceData' ;
export class FindTripMockService {


 public getBookingData(url: string): Observable<ServiceResponse> {
    return Observable.of(serviceTestData);
  }
}
