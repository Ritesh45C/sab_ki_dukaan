import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface productRefType {
  units: number;
  product_ref: FirebaseFirestoreTypes.DocumentReference;
  path: string;
}
export interface OrderType {
  orderSnapshot: FirebaseFirestoreTypes.DocumentSnapshot;
  order_id: string;
}
