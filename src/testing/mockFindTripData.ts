export class DefaultData{
 
    bookingCode='';
    familyName='';

}
export const defaultTestData:DefaultData={bookingCode:'34567',familyName:'23@DEE'};
export const validTestData:DefaultData={bookingCode:'34567',familyName:'FDGFD'};

export const minLengthBookingCodeTest:DefaultData={bookingCode:'3457',familyName:'FDGFD'};
export const maxLengthBookingCodeTest:DefaultData={bookingCode:'3456756',familyName:'FDGFD'};
export const patternBookingCodeTest:DefaultData={bookingCode:'1RT@G*',familyName:'FDGFD'};

export const minLengthFamilyNameTest:DefaultData={bookingCode:'34567',familyName:'G'};
export const maxLengthFamilyNameTest:DefaultData={bookingCode:'34567',familyName:'ABCDEFGHABCDEFGHABCDEFGHABCDEFG'};
export const patternFamilyNameTest:DefaultData={bookingCode:'34567',familyName:'23@DEE'};