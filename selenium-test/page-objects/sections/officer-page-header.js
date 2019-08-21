import Section from './section';


export default class Header extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      officerName: '.test--officer-name',
      summaryButton: '//a[@class="test--header-button"][text()="Summary"]',
      activeButton: '.test--header-button-active',
    });
  }
}
