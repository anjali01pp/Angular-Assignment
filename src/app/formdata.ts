export interface Address {
    addressId: number;
    employeeId: number;
    address1: string;
    address2: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    createdById: number;
    createdDate: string;
  }
  
  export interface FormData {
    id: number;
    firstname: string;
    lastname: string;
    name: string;
    email: string;
    dob: string;
    position: string;
    statusId: number;
    gender: boolean;
    mobile: number;
    resume: string;
    profilePic: string;
    resumeBase64: string;
    profilePicBase64: string;
    createdById: number;
    createdDate: string;
    addresses: Address[];
  }
