import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import validator from 'validator';
import {ProductType} from 'types/Products';
import {
  getUserOrderDocumentRef,
  getOrderDataCartProductsDocumentRef,
  GetProductsReferenceOfCartProductsInOrder,
} from './OrdersFunctions';
import {OrderType} from './OrdersFunctions/types';
import {ErrorHandler, CarouselOffertsType} from 'types/General';
import Geolocation from '@react-native-community/geolocation';
import {getOrderDetails, noError, countryCode} from 'utils/general';
import {daysofweek} from 'containers/RecurringProductScreen';
import {GoogleLocationResult} from 'components/GoogleAutocomplete/services/Google.service';

export const signOut = () => auth().signOut();
export const currentUser = (): FirebaseAuthTypes.User | null =>
  auth().currentUser;

interface AddUserToDatabaseProps {
  user: FirebaseAuthTypes.User;
  city: string;
  selectedAddress: {};
}
interface user_info {
  name: string;
  lastname: string;
  houseno: number | string;
  apartment_name: number | string;
  street_details: string;
  landmark: string;
}
interface personalInfoTypes {
  step: string;
  name: string;
  lastname: string;
  mobile_number: string;
  houseno: string;
  apartment_name: string;
  street_details: string;
  landmark: string;
}
interface LogInAnonymouslyProps {
  city: string;
  selectedAddress: GoogleLocationResult['structured_formatting'];
}

type RecurringOrderType = {
  product_id: string;
  schedule: any;
  type: string;
  startAt: Date;
};

class FirebaseServices {
  db: FirebaseFirestoreTypes.Module;
  emailDomain: string;
  currentUser: FirebaseAuthTypes.User | null;
  constructor() {
    this.db = firestore();
    this.emailDomain = '@deliveryapp.com';
    this.currentUser = this.current_user();
  }
  /*Auth(actions) {
    auth().onAuthStateChanged(user => {
      if (user) actions.auth_state(true);
      else actions.auth_state(false);
    });
  }*/
  current_user() {
    return auth().currentUser;
  }
  set_current_user(){
    return this.currentUser = this.current_user()
  }
  async VerifyPhone(phoneNumber: string) {
    return new Promise(async (resolve, reject) => {
      try {
        var result = await auth().verifyPhoneNumber(
          `${countryCode}${phoneNumber}`,
        );

        if (validator.isEmpty(result.verificationId)) {
          const error = this.setErrorHandler({
            code: 'ERR_VERIFY_PHONE_001',
            error: true,
            error_message: {
              title: 'Timeout',
              message: 'Please re-try',
            },
          });
          reject(error);
        }
        resolve(result.verificationId);
      } catch (e) {
        const general = this.setErrorHandler({
          code: 'ERR_GENERAL',
          error: true,
          error_message: {
            title: 'Error',
            message: 'Please re-try',
          },
        });
        reject(general);
      }
    });
  }
  async linkCredential(
    credential: FirebaseAuthTypes.AuthCredential,
    phoneNumber: string,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.currentUser) {
          reject(
            this.setErrorHandler({
              code: 'ERR_USER_003',
              error: true,
              error_message: {title: '', message: ''},
            }),
          );
          return;
        }
        await this.currentUser.linkWithCredential(credential);
        this.db
          .collection('Users')
          .doc(`${this.currentUser.uid}`)
          .update({
            phoneNumber,
          });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  createAccount(
    phoneNumber: string,
    password: string,
    addressSelected: {
      city: string;
      selectedAddress: GoogleLocationResult['structured_formatting'];
    },
    personal_info: user_info,
    withoutEmail: boolean,
  ) {
    return new Promise<ErrorHandler>(async (resolve, reject) => {
      try {
        if (!withoutEmail) {
          await auth().createUserWithEmailAndPassword(
            phoneNumber + this.emailDomain,
            password,
          );
          this.set_current_user();
        } 

        if (!this.currentUser) {
          reject(
            this.setErrorHandler({
              code: 'ERR_USER_003',
              error: true,
              error_message: {title: '', message: ''},
            }),
          );
          return;
        }
        this.db
          .collection('Users')
          .doc(`${this.currentUser.uid}`)
          .set({
            uid: this.currentUser.uid,
            user_address: {
              city: addressSelected.city,
              address: {
                main_text: addressSelected.selectedAddress.main_text,
                secondary_text: addressSelected.selectedAddress.secondary_text,
              },
            },
            personal_info: {
              ...personal_info,
            },
          });

        resolve(noError());
      } catch (e) {
        reject(e);
      }
    });
  }
  async createUserPhoneAndPassword(
    phoneNumber: string,
    password: string,
    credential: FirebaseAuthTypes.AuthCredential,
    addressSelected: any,
    personal_info: user_info,
  ) {
    return new Promise<ErrorHandler>(async (resolve, reject) => {
      try {

        if (!this.currentUser) {
          await this.createAccount(
            phoneNumber,
            password,
            addressSelected,
            personal_info,
            false,
          );
          await this.linkCredential(credential, phoneNumber);
        } else if (this.currentUser.providerData.length == 1) {
          if (!this.currentUser.providerData[0].email) {
            const EmailCredential = auth.EmailAuthProvider.credential(
              phoneNumber + this.emailDomain,
              password,
            );
            const isSuccessful = await this.createAccount(
              phoneNumber,
              password,
              addressSelected,
              personal_info,
              true,
            );
            if (isSuccessful) {
              this.currentUser.linkWithCredential(EmailCredential);
              resolve(noError());
            }
          } else if (!this.currentUser.providerData[0].phoneNumber) {
            const PhoneNumberCredential = auth.PhoneAuthProvider.credential(
              credential.token,
              credential.secret,
            );
            await this.linkCredential(PhoneNumberCredential, phoneNumber);
            resolve(noError());
          }
          console.log(this.currentUser.providerData);
          reject(
            this.setErrorHandler({
              code: '',
              error: true,
              error_message: {
                title: 'Error',
                message: 'Error creating Account',
              },
            }),
          );
        } else {
          signOut();
        }
        resolve(noError());
      } catch (error) {
        reject(error);
      }
    });
  }

  AddUserToDatabase = ({
    user,
    selectedAddress,
    city,
  }: AddUserToDatabaseProps) => {
    return new Promise(async (resolve, reject) => {
      try {
        await firestore()
          .collection('Users')
          .doc(user.uid)
          .set({
            isAnonymous: user.isAnonymous,
            shopping_credits: 0,
            uid: user.uid,
            address_selected: {
              city: city,
              ...selectedAddress,
            },
          });
        resolve(true);
      } catch (e) {
        console.error(e);
        reject(false);
      }
    });
  };

  LogInAnonymously(props: LogInAnonymouslyProps) {
    return new Promise<FirebaseAuthTypes.UserCredential>(
      async (resolve, reject) => {
        try {
          const credential = await auth().signInAnonymously();
          if (credential.additionalUserInfo) {
            if (credential.additionalUserInfo.isNewUser) {
          
              const address = {
                main_text: props.selectedAddress.main_text,
                secondary_text: props.selectedAddress.secondary_text,
              }
              this.AddUserToDatabase({
                user: credential.user,
                selectedAddress: {address:{...address}},
                city: props.city,
              }).then(() => {
                resolve(credential);
              });
            } else {
              resolve(credential);
            }
          } else {
            reject(
              this.setErrorHandler({
                code: 'ERR_ANONYMOUSLY',
                error: true,
                error_message: {
                  title: '',
                  message: '',
                },
              }),
            );
          }
        } catch (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/operation-not-allowed') {
            //  alert('You must enable Anonymous auth in the Firebase Console.');
          } else {
            //  console.error(error);
          }
          reject(error);
        }
      },
    );
  }

  LogIn(phoneNumber: string, password: string) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        await auth().signInWithEmailAndPassword(
          phoneNumber + this.emailDomain,
          password,
        );
        this.set_current_user();

        if (!this.currentUser) {
          reject(
            this.setErrorHandler({
              code: 'ERR_USER_003',
              error: true,
              error_message: {title: '', message: ''},
            }),
          );
          return;
        }
        const result = await firestore()
          .collection('Users')
          .doc(`${this.currentUser.uid}`)
          .get();
        if (result.exists && this.currentUser.phoneNumber !== null) {
          // all ok
        } else if (this.currentUser.phoneNumber == null) {
          // error, enviar a verificar numero
        }

        resolve(true);
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            reject({
              error: true,
              error_message: {
                title: error.code,
                message: 'The phone number entered not exists.',
              },
            });
            break;
          case 'auth/wrong-password':
            reject({
              error: true,
              error_message: {
                title: error.code,
                message:
                  'The password is invalid or the user does not have a password.',
              },
            });
            break;
        }
      }
    });
  }
  fetchUserData() {
    return new Promise<any | ErrorHandler>(async (resolve, reject) => {
      try {
        if (!this.currentUser) {
          console.warn("exit")
          reject(
            this.setErrorHandler({
              code: 'ERR_USER_003',
              error: true,
              error_message: {title: '', message: ''},
            }),
          );
          return;
        }
        const userDataSnapshot = await firestore()
          .collection('Users')
          .doc(this.currentUser.uid)
          .get();
        const userData = userDataSnapshot.data();
        if (userData) {
          resolve(userData);
        }
      } catch (e) {
        reject(
          this.setErrorHandler({
            code: 'ERR_FETCHING_USER',
            error: true,
            error_message: {
              title: 'Error',
              message: 'Error fetching user data',
            },
          }),
        );
      }
    });
  }

  async fetchProductsByIds(products: Array<any>) {
    var ref = firestore().collection('Products');
    var data = await Promise.all(
      products.map(product =>
        ref.where('product_id', '==', product.product_id).get(),
      ),
    );
    let cartProducts: any = [];
    data.forEach(async promise => {
      const querySnapshot = await promise;
      querySnapshot.docs.forEach((doc, index) => {
        cartProducts.push(doc.data());
      });
    });
    return cartProducts;
  }
  /*
    async fetchProductsByIds(products: Array<any>) {
    var ref = firestore().collection('Products');
    var data = await Promise.all([
      products.map(product =>
        ref.where('product_id', '==', product.product_id).get(),
      ),
    ]);
    data.forEach(promises => {
      promises.forEach(async promise => {
        const querySnapshot = await promise;
        querySnapshot.docs.forEach(doc => {
          console.log(doc.data());
        });
      });
    });
  } */
  async fetchProductsRefsData() {
    try {
      const Data = await firestore()
        .collection('ProductsRefs')
        .get();
      let ProductsRefs: any = [];

      Data.forEach((ProductRefDoc: any) => {
        ProductsRefs.push(ProductRefDoc.data());
      });
      if (ProductsRefs.length > 0) {
        return ProductsRefs;
      }
    } catch (error) {
      return error;
    }
  }
  async fetchProductsData(sub_category_selected: any) {
    const Data = await firestore()
      .collection('Products')
      .where('sub_category', '==', sub_category_selected)
      .get();

    let Products: any = [];

    Data.forEach((ProductDoc: any) => {
      Products.push(ProductDoc.data());
    });
    if (Products.length > 0) {
      return Products;
    }
    return false;
  }
  async fetchCategoriesData() {
    const Data = await firestore()
      .collection('Categories')
      .orderBy('position', 'asc')
      .get();
    let Categories: any = [];
    Data.forEach((Category: any) => {
      Categories.push(Category.data());
    });
    if (Categories.length > 0) {
      return Categories;
    }
    return false;
  }

  setErrorHandler = (error: ErrorHandler) => {
    return {
      code: error.code,
      error: error.error,
      error_message: {
        title: error.error_message.title,
        message: error.error_message.message,
      },
    };
  };

  async saveTokenToDatabase(token: string) {
    const db = firestore();
    try {
      if (!this.currentUser) {
        return this.setErrorHandler({
          code: 'ERR_USER_003',
          error: true,
          error_message: {title: '', message: ''},
        });
      }
      await db
        .collection('Users')
        .doc(this.currentUser.uid)
        .update({
          tokens: firestore.FieldValue.arrayUnion(token),
        });
      await db
        .collection('Tokens')
        .doc(token)
        .set({
          token: token,
        });
      return noError();
    } catch (error) {
      const ErrorResult = this.setErrorHandler({
        code: 'ERR_SAVINGTOKENS',
        error: true,
        error_message: {
          title: 'Error',
          message: 'Problem sending user Tokens',
        },
      });
      return ErrorResult;
    }
  }
  getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve(position);
        },
        error => reject({position: error}),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    });
  };
  GetRecurringOrders = () => {
    return new Promise<any>(async (resolve, reject) => {
      if (!this.currentUser) {
        reject(
          this.setErrorHandler({
            code: 'ERR_USER_003',
            error: true,
            error_message: {title: '', message: ''},
          }),
        );
        return;
      }
      if (this.currentUser.isAnonymous) {
        reject(
          this.setErrorHandler({
            code: 'ERR_ISANONYMOUS',
            error: true,
            error_message: {
              title: 'Error',
              message: 'The user is anonymous',
            },
          }),
        );
      }
      const userRef: FirebaseFirestoreTypes.DocumentReference = firestore()
        .collection('Users')
        .doc(this.currentUser.uid);
      const recurringOrdersDocs = await userRef
        .collection('RecurringOrders')
        .get();
      if (recurringOrdersDocs.empty) {
        resolve('isempty');
        return;
      }
      const AllRecurringOrders: RecurringOrderType[] = [];
      const productsRefs: FirebaseFirestoreTypes.DocumentReference[] = [];

      recurringOrdersDocs.docs.map(doc => {
        const productPlacedRef: FirebaseFirestoreTypes.DocumentReference = firestore().doc(
          `Products/${doc.data().product_id}`,
        );
        const recurringOrderData: any = doc.data();
        productsRefs.push(productPlacedRef);
        AllRecurringOrders.push(recurringOrderData);
      });

      const promesasProductsPlaced = productsRefs.map(doc => {
        return new Promise(async (resolve, reject) => {
          try {
            const productSnapshot = await doc.get();
            resolve(productSnapshot.data());
          } catch (error) {
            reject(
              this.setErrorHandler({
                code: 'ERR_RESOLVING_PRODUCTS_PLACED',
                error: true,
                error_message: {
                  title: 'Error',
                  message: 'An error has occurred. Please try again.',
                },
              }),
            );
          }
        });
      });
      const productsPlaced = await Promise.all(promesasProductsPlaced);
      resolve({
        RecurringOrders: AllRecurringOrders,
        ProductsPlaced: productsPlaced,
      });
    });
  };

  GetProductRecurringDetails = (Product_Id: string) => {
    return new Promise<RecurringOrderType>(async (resolve, reject) => {
      if (!this.currentUser) {
        reject(
          this.setErrorHandler({
            code: 'ERR_USER_003',
            error: true,
            error_message: {title: '', message: ''},
          }),
        );
        return;
      }
      if (this.currentUser.isAnonymous) {
        return;
      }
      const userRef: FirebaseFirestoreTypes.DocumentReference = firestore()
        .collection('Users')
        .doc(this.currentUser.uid);
      const productsPlaced = await userRef
        .collection('RecurringOrders')
        .where('product_id', '==', Product_Id)
        .get();
      if (productsPlaced.empty) {
        reject();
        return;
      }
      productsPlaced.forEach(doc => {
        const productPlaced: any = doc.data();
        resolve(productPlaced);
      });
      /* 
        typesOfRecurringOrders.map(async (type) => {
          const recurringOrder = await userRef.collection('RecurringOrders').doc(type).get()
          if(recurringOrder.exists){
             const data: any = recurringOrder.data();
             const {products} = data
             if(data){
              const isProduct = ({product_id}:any) => product_id == Product_Id;
              const Index = products.findIndex(isProduct);
              if (Index !== -1){               
                resolve(products[Index])
              }
             }
          }
        })*/
    });
  };

  AddProductToRecurringOrder = (
    RecurringType: string,
    Product_Id: string,
    Schedule: any,
    startAt: Date | null,
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.currentUser) {
          reject(
            this.setErrorHandler({
              code: 'ERR_USER_003',
              error: true,
              error_message: {title: '', message: ''},
            }),
          );
          return;
        }
        if (this.currentUser.isAnonymous) {
          return;
        }
        const userRef: FirebaseFirestoreTypes.DocumentReference = firestore()
          .collection('Users')
          .doc(this.currentUser.uid);
        const productsPlaced = await userRef
          .collection('RecurringOrders')
          .where('product_id', '==', Product_Id)
          .get();

        if (productsPlaced.empty) {
          await userRef.collection('RecurringOrders').add({
            product_id: Product_Id,
            schedule: Schedule,
            type: RecurringType,
            startAt: startAt,
          });
        } else {
          const productPlacedRef = productsPlaced.docs[0].ref;
          let numOfEmpty = 0;
          daysofweek.map(day => {
            if (Schedule[day.key] == 0) {
              numOfEmpty += 1;
            }
          });
          if (daysofweek.length == numOfEmpty) {
            await productPlacedRef.delete();
            resolve('deleted');
            return;
          }
          await productPlacedRef.update({
            product_id: Product_Id,
            schedule: Schedule,
            type: RecurringType,
            startAt: startAt,
          });
        }
        resolve('updated');
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  };

  AddOrderData = (
    personal_info: personalInfoTypes,
    cartProducts: ProductType[],
    method: string,
  ) => {
    return new Promise<string | ErrorHandler>(async (resolve, reject) => {
      try {
        if (!this.currentUser) {
          reject(
            this.setErrorHandler({
              code: 'ERR_USER_003',
              error: true,
              error_message: {title: '', message: ''},
            }),
          );
          return;
        }
        const position = await this.getCurrentPosition();

        const products_ids: Array<{
          product_ref: FirebaseFirestoreTypes.DocumentReference;
          units: number;
        }> = [];
        const orderDetails = getOrderDetails(cartProducts);
        cartProducts.map((product: ProductType) => {
          products_ids.push({
            product_ref: firestore()
              .collection('Products')
              .doc(product.product_id),
            units: product.units,
          });
        });

        const ref = await firestore()
          .collection('Orders')
          .add({
            ...personal_info,
            location: position,
            orderDetails,
            uid: this.currentUser.uid,
            method: method,
            createDate: firestore.FieldValue.serverTimestamp(),
            payment: {
              chargeId: null,
              paid_out: false,
            },
          });
        await ref.update({
          orderId: ref.id,
        });
        const promesasProductsIds = products_ids.map(async product_id =>
          ref.collection('cartProducts').add(product_id),
        );
        await Promise.all(promesasProductsIds);

        await firestore()
          .collection('Users')
          .doc(this.currentUser.uid)
          .collection('Orders')
          .doc(ref.id)
          .set({
            order: ref,
            payment: {
              chargeId: null,
              paid_out: false,
            },
          });
        resolve(ref.id);
      } catch (error) {
        console.log(error);
        let ErrorResult;

        if (error.position) {
          console.warn(error.position);
          if (error.position.code == 2) {
            ErrorResult = this.setErrorHandler({
              code: error.position.code,
              error: true,
              error_message: {
                title: `A problem has occurred obtaining your gps location.`,
                message: 'Please activate your gps and try again.',
              },
            });
          } else if (error.position.code == 1) {
            ErrorResult = this.setErrorHandler({
              code: error.position.code,
              error: true,
              error_message: {
                title: 'A problem has occurred obtaining your gps location.',
                message: `${error.position.message}`,
              },
            });
          }
        } else {
          ErrorResult = this.setErrorHandler({
            code: 'ERR_GENERAL',
            error: true,
            error_message: {
              title: 'Error',
              message: 'Problem sending order',
            },
          });
        }
        reject(ErrorResult);
      }
    });
  };

  getCarouselOfferts = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let carouselOfferts: CarouselOffertsType[] = [];
        const promiseDocs = await firestore()
          .collection('Offerts_Carousel')
          .orderBy('position', 'asc')
          .get();
        promiseDocs.forEach(doc => {
          const data: any = doc.data();
          carouselOfferts.push(data);
        });
        resolve(carouselOfferts);
      } catch (e) {
        reject(
          this.setErrorHandler({
            code: 'ERR_GENERAL',
            error: true,
            error_message: {
              title: '',
              message: '',
            },
          }),
        );
      }
    });
  };
  fetchOrderData = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.currentUser) {
          reject(
            this.setErrorHandler({
              code: 'ERR_USER_003',
              error: true,
              error_message: {title: '', message: ''},
            }),
          );
          return;
        }
        let AllDataOfOrders: OrderType[] = [];
        const userOrdersSnapshot: FirebaseFirestoreTypes.QuerySnapshot = await firestore()
          .collection('Users')
          .doc(this.currentUser.uid)
          .collection('Orders')
          .get();

        // 1- Obtienes la colección de ordenes de la colección usuarios
        // 2- Mapeas todas las referencias en un array y las pasas cómo promesas get.
        // 3- una ves resuelta la promesa te devuelve la lista de sus ordenes.

        const userOrderReferences = getUserOrderDocumentRef(userOrdersSnapshot);
        const promesasUserOrder: Promise<OrderType>[] = userOrderReferences.map(
          doc =>
            new Promise(async (resolve, reject) => {
              const result = await doc.get();
              const order: OrderType = {
                orderSnapshot: result,
                order_id: doc.id,
              };
              resolve(order);
            }),
        );
        const OrderData: OrderType[] = await Promise.all(promesasUserOrder);
        AllDataOfOrders = OrderData;

        // 1- Extraes las referencias de los productos de las ordenes
        // 2- Las mapeas en un array y las pasa cómo promesas señalando la subcolección por orden.
        // 3- Resuelve las promesas mapeadas

        let OrderSnapshots: FirebaseFirestoreTypes.DocumentSnapshot[] = [];
        OrderData.map(order => OrderSnapshots.push(order.orderSnapshot));

        const OrderDataCartProductsRef = getOrderDataCartProductsDocumentRef(
          OrderSnapshots,
        );
        const promesasOrderDataCartProducts = OrderDataCartProductsRef.map(
          doc => doc.collection('cartProducts').get(),
        );
        const CartProductsInOrderData = await Promise.all(
          promesasOrderDataCartProducts,
        );

        // 1- Pasamos como parametro los documentos con la subcolección 'CartProducts
        // El cual contiene la referencia del producto, sus unidades y le añadimos la ruta de la orden.
        // 2- Mapeamos las referencias cómo promesas get pero además de obtener el producto, concatenamos
        // las unidades y la ruta de la orden.
        const ProductsReferenceAndUnits = GetProductsReferenceOfCartProductsInOrder(
          CartProductsInOrderData,
        );
        const promesasProductsReferenceAndUnits: Promise<{
          units: number;
          order_id: string;
        }>[] = ProductsReferenceAndUnits.map(
          doc =>
            new Promise(async (resolve, reject) => {
              const result = await doc.product_ref.get();
              let product: any = result.data();

              product.units = doc.units;
              product.order_id = doc.path.split('/')[1];

              resolve(product);
            }),
        );
        const AllProductsOfOrders = await Promise.all(
          promesasProductsReferenceAndUnits,
        );
        let OrderResult: any = [];
        AllDataOfOrders.map(Order => {
          let OrderToFilter = Order.order_id;
          const ItsProductOfCurrentOrder = ({order_id}: any) =>
            order_id == OrderToFilter;
          const Filtered = AllProductsOfOrders.filter(ItsProductOfCurrentOrder);
          if (Filtered.length) {
            OrderResult.push({
              ...Order.orderSnapshot.data(),
              products: Filtered,
            });
          }
        });
        resolve(OrderResult);
      } catch (error) {
        reject(error);
      }
    });
  };
}
export default new FirebaseServices();
