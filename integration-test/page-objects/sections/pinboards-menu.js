import Section from './section';

const nthMenuItemTitle = (n) => `(//div[@class="pinboard-title"])[${n}]`;
const nthMenuItemCreatedAt = (n) => `(//div[@class="pinboard-created-at"])[${n}]`;
const nthPinButton = (n) => `(//div[@class="pin-button"])[${n}]`;

class PinboardsMenuSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      addToPinboardButton: '//div[contains(@class, "add-to-pinboard-btn")]',
      menu: '//div[contains(@class, "pinboards-menu")]',
      items: '//div[contains(@class, "pinboard-item")]',
      firstItemTitle: nthMenuItemTitle(1),
      firstItemCreatedAt: nthMenuItemCreatedAt(1),
      firstItemPinButton: nthPinButton(1),
      secondItemTitle: nthMenuItemTitle(2),
      secondItemCreatedAt: nthMenuItemCreatedAt(2),
      secondItemPinButton: nthPinButton(2),
      thirdItemTitle: nthMenuItemTitle(3),
      thirdItemCreatedAt: nthMenuItemCreatedAt(3),
      thirdItemPinButton: nthPinButton(3),
      createPinboardWithSelectionButton: '//div[@class="add-to-new-pinboard"]',
    });
  }
}

export default PinboardsMenuSection;
