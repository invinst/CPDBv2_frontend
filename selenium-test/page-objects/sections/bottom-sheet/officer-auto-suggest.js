import Section from '../section';


class OfficerAutoSuggest extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      input: '.test--officer-input',
      suggestion: '.test--suggestion',
      noMatchFound: '.test--no-match-found'
    });
  }
}

module.exports = OfficerAutoSuggest;
