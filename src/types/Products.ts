type type = "item" | "bundle"

export type ProductDiscount = {
    type:string,
    value:string,
    price:string,
    price_symbol:string
}

export type Product = {
    imgurl?:string,
    bundle_details?:string,
    product_details:string,
    product_name:string,
    units:number ,
    quantity?: number,
    quantity_symbol?:string,
    price:string,
    price_symbol:string,
    type: type,
    filterby: string[],
    isdiscount:boolean,
    discount: ProductDiscount
}

export interface ProductType extends Product {
    isIntheCart?:boolean,
    product_id:string,
    available: boolean,
    category: string,
    sub_category:string,
    items?: Array<Product>
}


