import React from 'react';
import {
  Title_Category,
  Sub_Category,
  Title_SubCategory,
  Container,
  Sub_Category_Image,
} from './styles';
import {View, FlatList} from 'react-native';
import NavigationServices from 'services/NavigationService';
import Item from 'components/CategoryScreen/Item';
import {CategoriesType} from 'types/Categories';
import {load_subCategory} from 'redux/actions/categoriesActions';
import {useDispatch} from 'react-redux';

const Category = (props: CategoriesType) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <Title_Category>{props.category_name}</Title_Category>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={item => item.key}
        data={props.sub_categories}
        renderItem={({item, index, separators}) => {
      
          return (
            <View key={item.key} style={{marginRight: 12}}>
              
           
              <Sub_Category
                  onPress={() => {
                    dispatch(
                      load_subCategory({
                        category_name: props.category_name,
                        sub_category_name: item.name,
                        sub_category_selected: item.key,
                        sub_categories: props.sub_categories,
                      }),
                    );
                    NavigationServices.navigate('CategoryScreen', {});
                  }}
                >
                     <Sub_Category_Image source={{uri:item.imgurl}}/>
               
                  </Sub_Category>

              <Title_SubCategory>{item.name}</Title_SubCategory>
            </View>
          );
        }}
      />
    </Container>
  );
};
export default Category;
