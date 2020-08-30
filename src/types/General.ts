export interface ErrorHandler {
  code: string | "ERR_EMPTY";
  error: boolean;
  error_message: {
    title: string;
    message: string;
  }
}

export type DetailsType = {
  Items: string;
  Savings:string;
  Total: string;
};

export type CarouselOffertsType = {
  imgurl:string,
  position:number
}