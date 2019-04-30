import Page from './page';
import Section from './sections/section';


class AnimatedSocialGraphSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      title: '(//div[contains(@class, "social-graph-title")])',
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
      showCivilComplaintOnlyCheckbox: '(//input[@class="test--show-civil-complaint-checkbox"])',
      firstSearchResultSuggestion: '(//div[@class="graph-search-input-container"]//div//div)',
      tooltip: '(//div[contains(@class, "test--graph-tooltip")]//span)',
      biggestGraphNode: '(//*[@r="7"])',
      mainTabs: '(//div[contains(@class, "main-tabs")])',
      geographicTab: '(//div[contains(@class, "geographic-btn")])',
      networkTab: '(//div[contains(@class, "social-graph-btn")])',
    });
  }

  graphNodes() {
    return browser.elements('(//*[@class="node"])').value;
  }

  graphLinks() {
    return browser.elements('(//*[contains(@class, "link")])').value;
  }
}

class GeographicSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      complaintText: '//div[contains(@class, "legend__legend")]//div[1]//span[contains(@class, "legend-row-text")]',
      trrText: '//div[contains(@class, "legend__legend")]//div[2]//span[contains(@class, "legend-row-text")]',
      complaintNumber: '//div[contains(@class, "legend__legend")]//div[1]//span[contains(@class, "legend-row-number")]',
      trrNumber: '//div[contains(@class, "legend__legend")]//div[2]//span[contains(@class, "legend-row-number")]',
    });
  }
}

class SocialGraphPage extends Page {
  animatedSocialGraphSection = new AnimatedSocialGraphSection();
  geographicSection = new GeographicSection();

  open() {
    super.open('/social-graph/?unit_id=123&title=Live test social graph title');
    browser.element('body').waitForVisible();
  }
}

module.exports = new SocialGraphPage();
