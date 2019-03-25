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
    return browser.elements('(//*[@class="link"])').value;
  }
}

class PinboardSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      title: '(//div[contains(@class, "pinboard-title")])',
      description: '(//div[contains(@class, "pinboard-description")])',
    });
  }
}

class PinboardPage extends Page {
  animatedSocialGraphSection = new AnimatedSocialGraphSection();
  pinboardSection = new PinboardSection();

  open() {
    super.open('/pinboard/123/pinboard-title/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new PinboardPage();
