import Section from '../section';


class OfficerCard extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      element: '.test--officer-card',
      name: '.test--officer-name',
      subInfo: '.test--officer-sub-info',
      indicator: '.test--indicator',
      removeButton: '.test--remove-officer-button'
    });
  }
}

module.exports = OfficerCard;
