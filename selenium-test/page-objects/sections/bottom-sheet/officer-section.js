import Section from '../section';
import OfficerCard from './officer-card';
import OfficerAddBlock from './officer-add-block';


class OfficerSection extends Section {
  officerCard = new OfficerCard();
  officerAddBlock = new OfficerAddBlock();

  constructor() {
    super();
    this.prepareElementGetters({
      officerInvolved: '.test--officer-involved',
      circleAddOfficerButton: '.test--circle-add-officer-button',
      addOfficerButton: '.test--add-officer-button'
    });
  }
}

module.exports = OfficerSection;
