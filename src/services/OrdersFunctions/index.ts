import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {productRefType} from './types'

export const getUserOrderDocumentRef = (
  userOrdersSnapshot: FirebaseFirestoreTypes.QuerySnapshot,
) => {
  const ArrayRef: Array<FirebaseFirestoreTypes.DocumentReference> = [];
  userOrdersSnapshot.forEach(snapshot => {
    ArrayRef.push(snapshot.data().order);
  });
  return ArrayRef;
};
export const getOrderDataCartProductsDocumentRef = (
  OrderDataCartProductsRef: Array<FirebaseFirestoreTypes.DocumentSnapshot>,
) => {
  const ArrayRef: Array<FirebaseFirestoreTypes.DocumentReference> = [];
  OrderDataCartProductsRef.forEach(snapshot => {
    ArrayRef.push(snapshot.ref);
  });
  return ArrayRef;
};

export const GetProductsReferenceOfCartProductsInOrder = (
  CartProductsInOrderData: Array<FirebaseFirestoreTypes.QuerySnapshot>,
) => {
  const ArrayRef: Array<productRefType> = [];
  CartProductsInOrderData.forEach(snapshot => {
    snapshot.forEach(productDoc => {
      const {units, product_ref} = productDoc.data();
      ArrayRef.push({units, product_ref, path: productDoc.ref.path});
    });
  });
  return ArrayRef;
};
