import React, {useState} from 'react';
import {Container} from './styles';
import Category from 'components/MainScreen/Category';
import {FlatList, TouchableHighlight} from 'react-native';
import {CategoriesType} from 'types/Categories';

interface CategoriesProps {
  categoriesData: Array<CategoriesType>;
}

const Categories = (props: CategoriesProps) => {
  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={props.categoriesData}
        renderItem={({item}) => {
         return item.available ? <Category {...item} /> : null
        }}
      />
    </Container>
  );
};

/*ItemSeparatorComponent={Platform.OS !== 'android' && ({highlighted}) => (
    <View style={[style.separator, highlighted && {marginLeft: 0}]} />
  )}*/
export default Categories;
