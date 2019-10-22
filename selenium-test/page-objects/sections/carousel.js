import Section from './section';

export default class CarouselSection extends Section {
  constructor(parentSelector='', mainElementSelector, cardSelector) {
    super(parentSelector, mainElementSelector);
    this.prepareElementGetters({
      leftArrow: '//*[contains(@class, "test--carousel-arrow-left")]',
      rightArrow: '//*[contains(@class, "test--carousel-arrow-right")]',
      firstPinButton: `${cardSelector}//div[contains(@class, "item-pin-button__item-pin-button")]`,
      cards: cardSelector,
    });
  }
}
