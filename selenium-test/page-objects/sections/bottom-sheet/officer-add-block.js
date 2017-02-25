import Section from '../section';
import OfficerAutoSuggest from './officer-auto-suggest';


class OfficerAddBlock extends Section {
  officerAutoSuggest = new OfficerAutoSuggest();

  constructor() {
    super();
    this.prepareElementGetters({
      addButton: '.test--add-button',
      cancelButton: '.test--cancel-button'
    });
  }
}

module.exports = OfficerAddBlock;
