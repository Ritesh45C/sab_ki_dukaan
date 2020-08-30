import {ProductType} from 'types/Products';

export const isPercentage = (item: ProductType) => {
  if (item.discount.type == 'percentage') {
    return true;
  } else {
    return false;
  }
};
export const viewTextItemPreviousPrice = (item: ProductType) => {
  if (item.isdiscount) {
    return `${item.price_symbol} ${item.price}`;
  } else {
    return ``;
  }
};
export const viewTextItemDiscountDetails = (item: ProductType) => {
  if (item.isdiscount) {
    return `${
      isPercentage(item)
        ? `${item.discount.value}% OFF`
        : `${item.discount.value}₹ OFF`
    }`;
  } else {
    return ``;
  }
};
export const viewTextItemPriceDetails = (item: ProductType) => {
  if (item.isdiscount) {
    return `${item.discount.price_symbol} ${item.discount.price}`;
  } else {
    return `${item.price_symbol} ${item.price}`;
  }
};

export const checkIfItsInTheCart = (
  productId: string,
  cartProducts: ProductType[],
) => {
  const itsInTheCartFilter = ({product_id}: any) => product_id == productId;
  let result: Array<ProductType> = cartProducts.filter(itsInTheCartFilter);
  if (result.length !== 0) {
    return {itsInTheCart: true, Product: result[0]};
  }else{
    return false;
  }
};
