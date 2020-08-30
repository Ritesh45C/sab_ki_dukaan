import { ProductType} from "types/Products";
import { DetailsType } from "types/General";

export const keyGenerator = () => (
    Math.random().toString(36).substr(2, 10)
);

export const countryCode = '+91'

export const noError = () => {
   return {
     code:'ERR_EMPTY',
     error:false,
     error_message:{
       title:'',
       message:''
     }
   }
}

const addItems = (Items: string, Units: number) => {
  const TotalItems = parseFloat(Items) + parseFloat(Units.toString())
  return TotalItems.toFixed(0)
}
const addSavings = (Savings: string, Product: ProductType) => {
  if(Product.isdiscount){
    const ProductPrice = Product.price;
    const ProductDiscount = Product.discount

    const TotalPriceForAll = (parseFloat(ProductPrice) * Product.units).toString()
    const TotalDiscountPriceForAll = (parseFloat(ProductDiscount.price) * Product.units).toString()
  
    const Save = parseFloat(TotalPriceForAll) - parseFloat(TotalDiscountPriceForAll)
    const TotalDiscount = parseFloat(Savings) + parseFloat(Save.toString())
    return TotalDiscount.toFixed(2)
  }else{
    return Savings
  }
}
const addTotal = (Total: string, Product: ProductType) => {
   if(Product.isdiscount){
    const getDiscountPriceForAllUnits = (parseFloat(Product.discount.price) * Product.units).toString()
    const AddToTotalThePriceForAllUnits = parseFloat(Total) + parseFloat(getDiscountPriceForAllUnits);
    return AddToTotalThePriceForAllUnits.toFixed(2)

   }else{
     const getPriceForAllUnits = (parseFloat(Product.price) * Product.units).toString()
     const AddToTotalThePriceForAllUnits = parseFloat(Total) + parseFloat(getPriceForAllUnits);
     return AddToTotalThePriceForAllUnits.toFixed(2)
   }
}
export const getOrderDetails = (Products: Array<ProductType>) => {
    let details: DetailsType = {
      Items:"0",
      Savings:"0",
      Total:"0",
    };

    Products.map(product => {

      details = {
          ...details,
          Items: addItems(details.Items,product.units),
          Savings: addSavings(details.Savings, product),
          Total: addTotal(details.Total, product),
      };
      
    });
   
    return details;
  };


