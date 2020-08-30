interface categorySelected {
    category_name:string,
    sub_category_name: string,
    sub_category_selected: string,
    sub_categories: Array<CategoryType>
  }

type CategoryType = {
    key: string
    name: string
}
type CategoriesType = {
    category_name: string
    available: boolean
    key: string
    position:number
    sub_categories: Array<CategoryType>
}
export type { CategoriesType, CategoryType, categorySelected };