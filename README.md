# FindTripApp

## Overview:  
This application provide Find-trip Utility to users where user can find booking details
 by filling bookingCode and familyName.
 
## Implementation : 
This project is developed using Angular 2.0 with using reactive forms,Http and Router modules.It is developed with mobile  first approach 
 and with fully accessibility.

## Code Example: 
This project consist of root component- AppComponent and AppModule and One Feature Module-FindTrip.
FindTrip module consist of FindTrip Component which uses external template and stylesheet for view purpose.FindTripComponent is having FindTrip Class
which handle the user interaction using Reactive Form model & form Control.It deligate task of fetching Booking Detail to the FindTripService which in turn
uses get request from Http Module to retrieve response. 
