import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Metrics, Colors} from 'Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect, useDispatch} from 'react-redux';
import {ProductType} from 'types/Products';
import Item from '../Item';
import { activeFilter, toggleFilter, addFilters } from 'redux/actions/productsActions';
import { Filter } from 'redux/reducers/productsReducer';
import IconButton from 'components/IconButton';

const {width: screenWidth} = Dimensions.get('window');

interface FilterOptionsProps{
  products: {
    productsData: ProductType[];
    filter: Filter;
  }
}

const FilterOptions = (props: FilterOptionsProps) => {
  const dispatch = useDispatch();


  const selectFilterOption = (value:string,index: number) => {
    dispatch(activeFilter(value,index))
 
  };
  const ToggleFilterIcon = () => {
    dispatch(toggleFilter())
  };
  const filter = props.products.filter
  if(filter.filterOptions){
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={styles.iconContainer}>
          <IconButton onPress={ToggleFilterIcon}  name="tune"
              size={20}
              color={filter.filterActive ? Colors.primary : '#373636'}
           />
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={styles.NavContainer}
          showsHorizontalScrollIndicator={false}>
          {filter.filterOptions.map((value, index) => {
            return (
              <TouchableOpacity
                style={{marginRight: Metrics.baseMargin}}
                onPress={() => selectFilterOption(value,index)}
                key={index}>
                <View
                  style={
                    filter.filterActive && filter.filterActiveIndex === index
                      ? styles.BadgeActive
                      : styles.Badge
                  }>
                  <Text
                    style={
                      filter.filterActive && filter.filterActiveIndex === index
                        ? styles.activeStep
                        : styles.normalStep
                    }>
                    {value}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }else{
    return null
  }
};

const styles = StyleSheet.create({
  Badge: {
    borderStyle: 'solid',
    borderRadius: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: 2,
  },
  BadgeActive: {
    borderStyle: 'solid',
    borderRadius: 10,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: 2,
    backgroundColor:Colors.primary
    
  },
  iconContainer: {
    width: "10%",
    height: "100%",
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  },
  NavContainer: {
    justifyContent:"center",
    alignItems:"center",
    height: '100%',
  },
  borderActive: {
    borderStyle: 'solid',
    borderBottomWidth: 3,
    marginTop: Metrics.smallMargin,
    borderRadius: 10,
  },
  activeStep: {
    fontSize: 15,
    fontWeight:"bold",
    color:  Colors.white,
    
    textShadowRadius:10,
    textShadowColor:Colors.gray 
  },
  normalStep: {
    fontSize: 15,
    fontWeight:'bold',
    color:  Colors.gray,
   // textShadowRadius:10,
    //textShadowColor:Colors.gray 
  },
});

const mapStateToProps = (reducers: any) => {
  return {products: reducers.products};
};
export default connect(mapStateToProps)(FilterOptions);
