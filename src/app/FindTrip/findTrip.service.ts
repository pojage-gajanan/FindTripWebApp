import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {FindTripModel} from './findTripDataModel';

@Injectable()
export class FindTripService {
    private url: string = "/assets/data/mock.json";

    constructor(private http: Http) { }

    getBookingData(findTripModel: FindTripModel) {
        let params: URLSearchParams = new URLSearchParams();
        console.log(findTripModel);
        params.set('bookingCode', findTripModel.bookingCode);
        params.set('familyName', findTripModel.familyName);
        let requestOptions = new RequestOptions();
        requestOptions.search = params;
        return this.http.get(this.url, requestOptions).map((response: Response) => response.json()).catch(this.handleError);
    }
   private handleError (error: Response | any) {
   
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
