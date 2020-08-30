import React, {useEffect, useState} from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  View,
  RefreshControl,
  FlatList,
} from 'react-native';
import SubCategoriesNav from 'components/CategoryScreen/SubCategoriesNav';
import FilterOptions from 'components/CategoryScreen/FilterOptions';
import BundleOffert from 'components/CategoryScreen/BundleOffert';
import Item from 'components/CategoryScreen/Item';
import {connect} from 'react-redux';
import {fetchProductsData} from 'redux/actions/productsActions';

import {ProductType} from 'types/Products';
import {categorySelected} from 'types/Categories';
import {keyGenerator, getOrderDetails} from 'utils/general';
import {Filter} from 'redux/reducers/productsReducer';
import {checkIfItsInTheCart} from 'components/CategoryScreen/Functions';
import {Colors, Metrics} from 'Theme';
import { AppStyles } from 'Theme';

const HEADER_MAX_HEIGHT = 270;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

interface CategoryScreenProps {
  navigation: any;
  cart: {cartProducts: any};
  route: any;
  dispatch: any;
  products: {
    productsData: ProductType[] | null;
    productsSelected: Array<string>;
    filter: Filter;
  };
  categories: any;
}

const CategoryScreen = (props: CategoryScreenProps) => {
  const [scrollYState, setScrollYState] = useState(
    new Animated.Value(
      // iOS has negative initial scroll value because content inset...
      Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
    ),
  );
  const [refreshing, setRefreshing] = useState(false);

  const {dispatch} = props;
  useEffect(() => {
    props.navigation.setOptions({
      title: props.categories.subCategories.category_name,
    });
    dispatch(
      fetchProductsData(props.categories.subCategories.sub_category_selected),
    );
  }, [props.categories.subCategories]);

  useEffect(() => {
    const Details = getOrderDetails(props.cart.cartProducts);
    props.navigation.setParams({
      itemsCart: Details.Items,
    });
  }, [props.cart]);

  /*    <Item />
        <BundleOffert /> */
  const _renderScrollViewContent = () => {
    const {cartProducts} = props.cart;
    const filter = props.products.filter;
    return (
      <View style={styles.scrollViewContent}>
        {props.products.productsData !== null && (
          <FlatList
            contentContainerStyle={{
              ...AppStyles.FlatListStyles.FlatListContent,
              marginTop: Metrics.baseMargin
            }}
            showsVerticalScrollIndicator={false}
            data={props.products.productsData}
            renderItem={({item}) => {
              let itsInTheCart: boolean = false;
              const result = checkIfItsInTheCart(item.product_id, cartProducts);
              if (result) {
                if (result.itsInTheCart) {
                  itsInTheCart = true;
                  item.units = result.Product.units;
                }
              }
              if (filter.filterActive) {
                if (item.filterby.find(val => val == filter.filter)) {
                  if (item.type == 'bundle') {
                    return (
                      <BundleOffert itsInTheCart={itsInTheCart} bundle={item} />
                    );
                  } else
                    return <Item itsInTheCart={itsInTheCart} item={item} />;
                }
              } else {
                if (item.type == 'bundle') {
                  return (
                    <BundleOffert itsInTheCart={itsInTheCart} bundle={item} />
                  );
                } else return <Item itsInTheCart={itsInTheCart} item={item} />;
              }
              return null;
            }}
          />
        )}
      </View>
    );
  };
  // Because of content inset the scroll value will be negative on iOS so bring
  // it back to 0.
  const scrollY = Animated.add(
    scrollYState,
    Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
  );
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const SubNavTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });
  const sub_category = props.categories.subCategories.sub_categories.find(
    (sub_category: any) =>
      sub_category.key == props.categories.subCategories.sub_category_selected,
  );
  return (
    <View style={styles.fill}>
      <Animated.ScrollView
        style={styles.fill}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollYState}}}],
          {useNativeDriver: true},
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => setRefreshing(false), 1000);
            }}
            // Android offset for RefreshControl
            progressViewOffset={HEADER_MAX_HEIGHT}
          />
        }
        // iOS offset for RefreshControl
        contentInset={{
          top: HEADER_MAX_HEIGHT,
        }}
        contentOffset={{
          y: -HEADER_MAX_HEIGHT,
        }}>
        {_renderScrollViewContent()}
      </Animated.ScrollView>
      <Animated.View
        pointerEvents="none"
        style={[styles.header, {transform: [{translateY: headerTranslate}]}]}>
        <Animated.Image
          style={[
            styles.backgroundImage,
            {
              opacity: imageOpacity,
              transform: [{translateY: imageTranslate}],
            },
          ]}
          source={{
            uri: sub_category.imgurl !== undefined ? sub_category.imgurl : '',
          }}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.bar,
          {
            transform: [{translateY: SubNavTranslate}],
          },
        ]}>
        <SubCategoriesNav />
        <FilterOptions />
      </Animated.View>
    </View>
  );
};
const mapStateToProps = (reducers: any) => {
  return {
    products: reducers.products,
    categories: reducers.categories,
    cart: reducers.cart,
  };
};



export default connect(mapStateToProps)(CategoryScreen);

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // @ts-ignore
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: Colors.white,
    height: 100,
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'absolute',
    top: HEADER_SCROLL_DISTANCE,
    left: 0,
    right: 0,
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    backgroundColor:Colors.gray200,
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_SCROLL_DISTANCE + 100 : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
