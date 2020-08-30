interface CardData {
  number: string;
  expMonth: number;
  expYear: number;
  cvc: string;       
  currency: string;
  addressCity: string;
  addressState:  string;
  addressCountry: string;
  addressZip:  string;
}

class StripeService {
  public_key: string;
  constructor() {
    this.public_key = 'c2tfdGVzdF9ZdFUyZnJ5MFZhQVBrejZSU015VWozV1gwMGYybWd2WG9XOg==';
  }

  createTokenFetch(params: CardData) {
    return new Promise((resolve, reject) => {
      fetch('https://api.stripe.com/v1/tokens', {
        body: `card[number]=${params.number}&card[exp_month]=${
          params.expMonth
        }&card[exp_year]=${params.expYear}&card[cvc]=${params.cvc}`,
        headers: {
          Authorization: `Basic ${this.public_key}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      })
        .then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default new StripeService();
