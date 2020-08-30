import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Metrics, Colors} from 'Theme';
import { connect } from 'react-redux';

import {select_subCategory} from 'redux/actions/categoriesActions';
import { useDispatch } from 'react-redux';
import { resetFilter } from 'redux/actions/productsActions';


const {width: screenWidth} = Dimensions.get('window');
const SubCategoriesNav = (props:any) => {
  const dispatch = useDispatch();
  const load_subCategory = (key:string) => {
    //dispatch(resetFilter())
    dispatch(select_subCategory(key))
  };

  
  const {sub_categories} = props.subCategories
  return (
      <ScrollView
        horizontal
        contentContainerStyle={styles.NavContainer}
        showsHorizontalScrollIndicator={false}>
        {sub_categories.map((sub_category  : any) => {
          return (
            <TouchableOpacity
              style={{marginRight: Metrics.largeMargin}}
              onPress={() => load_subCategory(sub_category.key)}
              key={sub_category.key}>
              <Text
                style={
                  props.subCategories.sub_category_selected === sub_category.key
                    ? styles.activeStep
                    : styles.normalStep
                }>
                {sub_category.name}
              </Text>
              <View style={props.subCategories.sub_category_selected === sub_category.key ? styles.borderActive : styles.border} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  NavContainer: {
    justifyContent:"center",
    alignItems:"center",
    marginHorizontal:Metrics.baseMargin,
    height: '100%',
  },
  border: {
    height:Metrics.smallMargin / 2 ,
    borderStyle: 'solid',
    borderRadius: 10,
    backgroundColor:"transparent"
  },
  borderActive: {
    height:Metrics.smallMargin / 2 ,
    borderStyle: 'solid',
    borderRadius: 10,
    backgroundColor:Colors.primary
  },
  activeStep: {
    fontSize: 16,
    color:Colors.gray,
    fontWeight: 'bold',
    marginVertical:Metrics.smallMargin,
   // textShadowRadius:15,
  //  textShadowColor:Colors.gray 
  },
  normalStep: {
    fontSize: 16,
    fontWeight:'bold',
    color:Colors.gray,
   // textShadowRadius:15,
   // textShadowColor:Colors.gray 
  },
});
const mapStateToProps = reducers => {
  return reducers.categories
}
export default connect(mapStateToProps)(SubCategoriesNav);
