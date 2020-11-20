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
    return Object.assign(offer, {
      offers: offer.offers.map((item) => {
        return {
          label: item.title,
          price: item.price,
        };
      })
    });
  }

  static adaptToEvent(offers) {
    return offers.map((item) => {
      return {
        label: item.title,
        price: item.price,
      };
    });
  }
}
