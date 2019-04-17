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
      timelineSlider: '(//div[contains(@class, "test--timeline-slider")])',
      firstSearchResultSuggestion: '(//div[@class="graph-search-input-container"]//div//div)',
      biggestGraphNode: '(//*[@r="7"])',
    });
  }

  graphNodes() {
    return browser.elements('(//*[@class="node"])').value;
  }

  graphLinks() {
    return browser.elements('(//*[contains(@class, "link")])').value;
  }
}

class PinboardSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      title: '(//div[contains(@class, "pinboard-title")])',
      description: '(//div[contains(@class, "pinboard-description")])',
      pinboardPaneMenu: '(//div[contains(@class, "pinboard-pane-section-menu")])',
      networkPaneName: '//span[contains(@class, "pinboard-pane-tab-name")][1]',
      geographicPaneName: '//span[contains(@class, "pinboard-pane-tab-name")][2]',
    });
  }
}

class GeoGraphicSection extends Section {
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

class PinboardPage extends Page {
  animatedSocialGraphSection = new AnimatedSocialGraphSection();
  geographicSection = new GeoGraphicSection();
  pinboardSection = new PinboardSection();

  open() {
    super.open('/pinboard/5cd06f2b/pinboard-title/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new PinboardPage();
