import Page from './page';
import Section from './sections/section';


class LeftPane extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      shade: '.test--social-graph-legend-shade',
      mostCrs: '(//span[@class="test--social-graph-legend-cr-num"])[1]',
      leastCrs: '(//span[@class="test--social-graph-legend-cr-num"])[last()]',
      numOfficer: '.test--social-graph-left-pane-num-officers'
    });
  }
}

class SocialGraph extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      element: '.test--social-graph',
      nodes: '.test--social-graph circle',
      links: '.test--social-graph line'
    });
  }
}

class Slider extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      element: '.test--social-graph-slider',
      minHandle: '(//div[contains(@class, "test--social-graph-slider-handle")])[1]',
      maxHandle: '(//div[contains(@class, "test--social-graph-slider-handle")])[2]',
    });
  }
}

class OfficerSocialGraphPage extends Page {
  leftPane = new LeftPane();
  socialGraph = new SocialGraph();
  slider = new Slider();

  open(officerId) {
    super.open(`/officer/${officerId}/social-graph/`);
    browser.element('body').waitForVisible();
  }
}

module.exports = new OfficerSocialGraphPage();
