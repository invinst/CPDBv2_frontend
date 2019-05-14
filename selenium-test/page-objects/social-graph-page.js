import Page from './page';
import Section from './sections/section';


class AnimatedSocialGraphSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      title: '(//div[contains(@class, "social-graph-title")])',
      coaccusalsThresholdText: '(//p[contains(@class, "coaccusals-threshold-text")])',
      toggleTimelineButton: '(//button[contains(@class, "toggle-timeline-btn")])',
      startDate: '(//div[contains(@class, "start-date-label")])',
      endDate: '(//div[contains(@class, "end-date-label")])',
      currentDate: '(//span[contains(@class, "current-date-label")])',
      coaccusalsThresholdSlider: '(//div[@class="coaccusals-threshold-slider-container"]' +
        '//div[contains(@class, "coaccusals-threshold-slider")])',
      timelineSlider: '(//div[contains(@class, "test--timeline-slider")])',
      showCivilComplaintOnlyCheckbox: '(//input[@class="test--show-civil-complaint-checkbox"])',
      tooltip: '(//div[contains(@class, "test--graph-tooltip")]//span)',
      biggestGraphNode: '(//*[@r="7"])',
      mainTabs: '(//div[contains(@class, "main-tabs")])',
      geographicTab: '(//div[contains(@class, "geographic-btn")])',
      networkTab: '(//div[contains(@class, "social-graph-btn")])',
      leftSection: '(//div[contains(@class, "left-section")])',
      officerTab: '(//span[contains(@class, "right-pane-tab-name")])[1]',
      timelineTab: '(//span[contains(@class, "right-pane-tab-name")])[2]',

    });
  }

  graphNodes() {
    return browser.elements('(//*[name()="circle" and contains(@class, "node")])').value;
  }

  graphLinks() {
    return browser.elements('(//*[name()="line" and contains(@class, "link")])').value;
  }

  graphLabels() {
    return browser.elements('(//*[name()="text" and @class="node-label"])').value;
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

class OfficersSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      firstOfficerRow: '//div[contains(@class, "officer-row")][1]',
      officerPreviewPane: '//div[contains(@class, "preview-pane")]',
      officerName: '//h1[contains(@class, "test--officer-name")]',
    });
  }

  officerRowCount() {
    return browser.elements('//div[contains(@class, "officer-row")]').value.length;
  }
}

class TimelineSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      firstAllegationYear: '//div[contains(@class, "test--timeline-item")][1]//div[@class="date"]',
      firstAllegationCategory: '//a[contains(@class, "test--timeline-item")][1]//div[@class="category"]',
      firstAllegationSubcategory: '//a[contains(@class, "test--timeline-item")][1]//div[@class="subcategory"]',
      firstAllegationDate: '//a[contains(@class, "test--timeline-item")][1]//span[@class="date"]',
    });
  }

  allegationRowCount() {
    return browser.elements('//a[contains(@class, "test--timeline-item")]').value.length;
  }
}

class SocialGraphPage extends Page {
  animatedSocialGraphSection = new AnimatedSocialGraphSection();
  geographicSection = new GeographicSection();
  officersSection = new OfficersSection();
  timelineSection = new TimelineSection();

  open() {
    super.open('/social-graph/?unit_id=123&title=Live test social graph title');
  }
}

module.exports = new SocialGraphPage();
