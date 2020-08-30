import { ProductType } from "./Products";

type orderDetails = {
  Items: number;
  Savings: number;
  Total: number;
};
type userLocation = {
  coords: {
    accuracy: number;
    longitude: number;
    latitude: number;
    speed: number;
    heading: 0;
    altitude: 5;
  },
  timestamp: number,
  mocked:boolean
};


type PaymentType = {
  chargeId:string;
  paid_out:boolean
}
interface OrderProductType extends ProductType{
    order_id:string,
    units:number
}
export interface OrderData {
  street_details: string;
  mobile_number: string;
  apartment_name: string;
  lastname: string;
  name: string;
  orderDetails: orderDetails;
  houseno: string;
  location: userLocation;
  landmark:string,
  products: OrderProductType[],
  method: string,
  payment: PaymentType,
  orderId: string,
  createDate: {
    seconds:number
  }
};
