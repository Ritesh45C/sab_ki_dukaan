import React, {useState, useEffect, useCallback, Fragment} from 'react';
import {
  Container,
  Title,
  LocationsContainer,
  InputContainer,
  SearchInput,
} from './styles';
import {fetchProductsRefsData} from 'redux/actions/searchProductsActions';
import {useDispatch, connect} from 'react-redux';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {debounce} from 'lodash';
import {View, FlatList, ScrollView} from 'react-native';
import {ProductType} from 'types/Products';
import BundleOffert from 'components/CategoryScreen/BundleOffert';
import Item from 'components/CategoryScreen/Item';
import Badge from 'components/Badge';
import { checkIfItsInTheCart } from 'components/CategoryScreen/Functions';
import LoadingModalSingleton from 'components/Loading';
import { AppStyles, Metrics } from 'Theme';
var levenshtein = require('fast-levenshtein');

const SearchProductsScreen = (props: any) => {
  const [searchValue, setSearchValue] = useState('');
  const [productsResult, setProductsResult] = useState<ProductType[]>([]);
  const [fetching, setFetching] = useState(false);
  const getSuggestions = () => {
    return [
      {product_name: 'Bundle Offert'},
      {product_name: 'Apple'},
      {product_name: 'Pear'},
      {product_name: 'Carrot'},
    ];
  };
  const _search = (inputValue: string) => {
    setFetching(true);
    const {productsRefs}: any = props.productsRefs;

    const ref: FirebaseFirestoreTypes.DocumentReference[] = [];
    productsRefs.map((product: any, index: number) => {
      var distance = levenshtein.get(product.product_name, inputValue);
      if (distance <= 2) {
        ref.push(firestore().doc(product.productRef));
        console.log(product.product_name);
      }
    });
    const promesas: Promise<any>[] = ref.map(
      doc =>
        new Promise(async (resolve, reject) => {
          try{
            const result = await doc.get();
            const Data = result.data();
            resolve(Data);
          }catch(e){
            reject(e)
          }
      
        }),
    );
    Promise.all(promesas).then(result => {
      setProductsResult(result);
      setFetching(false)
    }).catch(e => {
      console.error(e)
      setFetching(false)
    });

  };

  const handler = useCallback(debounce(_search, 1000), []);
  const _handleTextChange = (inputValue: string) => {
    setSearchValue(inputValue);
    handler(inputValue);
  };
  
  const _renderScrollViewContent = () => {
    const {cartProducts} = props.cart;
    return (
      <View>
        {productsResult.length > 0 && (
          <FlatList
          contentContainerStyle={{
            ...AppStyles.FlatListStyles.FlatListContent,
            marginTop: Metrics.baseMargin
          }}
            keyExtractor={item => item.product_id}
            showsVerticalScrollIndicator={false}
            data={productsResult}
            renderItem={({item}) => {
              let itsInTheCart: boolean = false
              const result = checkIfItsInTheCart(item.product_id,cartProducts)
              if(result){
                if(result.itsInTheCart){
                  itsInTheCart = true
                  item.units = result.Product.units
                }
              }
              if (item.type == 'bundle') {
                return (
                  <BundleOffert itsInTheCart={itsInTheCart} bundle={item} />
                );
              } else return <Item itsInTheCart={itsInTheCart} item={item} />;
            }}
          />
        )}
      </View>
    );
  };
  const refLoading = props.api.PRODUCTS_REFS_DATA
  return (
    <Container>
      <InputContainer>
        <SearchInput
          value={searchValue}
          onChangeText={!refLoading?_handleTextChange:undefined}
          placeholder="Search products..."
        />
      </InputContainer>
      
      {!refLoading? searchValue == '' ? (
        <Fragment>
          <Title>Popular Suggestions</Title>
          <LocationsContainer>
            {getSuggestions().map((product, index) => {
              return (
                <Badge key={index} onPress={() => {setSearchValue(product.product_name)
                  handler(product.product_name)
                  }}>
                  {product.product_name}
                </Badge>
              );
            })}
          </LocationsContainer>
        </Fragment>
      ):
      <Title>Results</Title>
      : 
      null
      }
{_renderScrollViewContent()}
    </Container>
  );
};
const mapStateToProps = (reducers: any) => {
  return {api: reducers.api, productsRefs: reducers.productsRefs, cart: reducers.cart};
};
export default connect(mapStateToProps)(SearchProductsScreen);
