import Page from './page';
import Section from './sections/section';


class AnimatedSocialGraphSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      title: '(//div[contains(@class, "sidenav-title")])',
      coaccusalsThresholdText: '(//p[contains(@class, "coaccusals-threshold-text")])',
      toggleTimelineButton: '(//button[contains(@class, "toggle-timeline-btn")])',
      searchInput: '(//input[contains(@class, "graph-search-input")])',
      searchButton: '(//button[contains(@class, "graph-search-btn")])',
      startDate: '(//div[contains(@class, "start-date-label")])',
      endDate: '(//div[contains(@class, "end-date-label")])',
      currentDate: '(//span[contains(@class, "current-date-label")])',
      coaccusalsThresholdSlider: '(//div[@class="coaccusals-threshold-slider-container"]' +
        '//div[contains(@class, "coaccusals-threshold-slider")])',
      timelineSlider: '(//div[contains(@class, "test--timeline-slider")])',
      showCivilComplaintOnlyCheckbox: '(//label[contains(@class, "test--show-civil-complaint-checkbox")])',
      firstSearchResultSuggestion: '(//div[@class="graph-search-input-container"]//div//div)',
    });
  }

  graphNodes() {
    return browser.elements('(//*[@class="node"])').value;
  }

  graphLinks() {
    return browser.elements('(//*[@class="link"])').value;
  }
}

class SocialGraphPage extends Page {
  animatedSocialGraphSection = new AnimatedSocialGraphSection();

  open() {
    super.open('/social-graph/?unit_id=123&title=Live test social graph title');
    browser.element('body').waitForVisible();
  }
}

module.exports = new SocialGraphPage();
