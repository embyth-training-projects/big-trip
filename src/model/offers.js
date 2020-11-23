import Observer from './observer';

export default class Offers extends Observer {
  constructor() {
    super();

    this._offers = [];
  }

  setOffers(offers) {
    this._offers = offers.slice();
  }

  getOffers() {
    return this._offers;
  }

  static adaptToClient(offer) {
    return {
      type: offer.type,
      offers: offer.offers.map((item) => {
        return {
          label: item.title,
          price: item.price,
        };
      })
    };
  }

  static adaptToServer(offer) {
    return {
      type: offer.type,
      offers: offer.offers.map((item) => {
        return {
          title: item.label,
          price: item.price,
        };
      })
    };
  }
}
