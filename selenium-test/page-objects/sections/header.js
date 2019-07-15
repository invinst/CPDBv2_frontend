import Section from './section';


class LogoSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      editButton: '.test--top-slim-header .top-button-wrapper .hoverable-edit-wrapper-button',
      saveButton: '.test--top-slim-header .bottom-button-wrapper .hoverable-edit-wrapper-button:first-child',
      cancelButton: '.test--top-slim-header .bottom-button-wrapper .hoverable-edit-wrapper-button:last-child',
      title: '.test--top-slim-header .header-logo-title',
      subtitle: '.test--top-slim-header .header-logo-subtitle',
      subtitleFirstLine: [
        '(//div[@class="test--top-slim-header"]',
        '//div[contains(@class, "header-logo-subtitle")]',
        '//div[@data-block="true"])[1]',
      ].join(''),
      boldTextSpan: [
        '(//div[@class="test--top-slim-header"]',
        '//div[contains(@class, "header-logo-subtitle")]',
        '//span[@data-offset-key and contains(@style, "font-weight: bold;")]/span)[1]',
      ].join(''),
      italicTextSpan: [
        '(//div[@class="test--top-slim-header"]',
        '//div[contains(@class, "header-logo-subtitle")]',
        '//span[@data-offset-key and contains(@style, "font-style: italic;")]/span)[1]'
      ].join(''),
      linkTextSpan: [
        '(//div[@class="test--top-slim-header"]',
        '//div[contains(@class, "header-logo-subtitle")]',
        '//span[contains(@style, "text-decoration: underline;")]/span[@data-offset-key]/span)[1]'
      ].join('')
    });
  }
}

class DemoVideoSection extends Section {
  mainElementSelector = '//div[contains(@class, "demo-video__demo-video")]';
  playButtonSelector = '//div[@class="demo-video-button"]';

  constructor() {
    super();
    this.prepareElementGetters({
      upperText: '//span[@class="demo-video-text-upper"]',
      lowerText: '//span[@class="demo-video-text-lower"]',
      playButton: this.playButtonSelector,
      playButtonThumbnail: `${this.playButtonSelector}//img[@class="demo-video-thumbnail"]`,
    });
  }
}

class TopBarSection extends Section {
  mainElementSelector = '//div[@class="top-bar"]';
  logo = new LogoSection();
  demoVideo = new DemoVideoSection();

  constructor() {
    super();
    this.prepareElementGetters();
  }
}

class SearchBoxSection extends Section {
  mainElementSelector = '//div[contains(@class, "search-box__search-box")]';
  searchMagnifyingGlassSelector ='//*[name()="svg" and contains(@class, "search-box-magnifying-glass")]'

  constructor() {
    super();
    this.prepareElementGetters({
      searchMagnifyingGlass: this.searchMagnifyingGlassSelector,
      searchMagnifyingGlassPath: `${this.searchMagnifyingGlassSelector}//*[name()="path"]`,
      searchText: '//span[@class="search-box-search-text"]',
      searchTerm: '//span[@class="search-box-term"]',
      playButtonThumbnail: '//div[@class="demo-video-button"]//img[@class="demo-video-thumbnail"]',
    });
  }
}

class RightLinksSection extends Section {
  mainElementSelector = '//div[contains(@class, "right-links__right-links")]';

  constructor() {
    super();
    this.prepareElementGetters({
      data: '//a[text()="Data"]',
      qa: '//a[text()="Q&A"]',
      documents: '//a[text()="Documents"]',
    });
  }
}

class NavBarSection extends Section {
  mainElementSelector = '//div[@class="navbar"]';
  searchBox = new SearchBoxSection();
  rightLinks = new RightLinksSection();

  constructor() {
    super();
    this.prepareElementGetters();
  }
}

class Header extends Section {
  topBar = new TopBarSection();
  navBar = new NavBarSection();

  elements = {
    logOutButton: '//div[@class="test--logout-button"]',
  }
}

class TopHeader extends Header {
  mainElementSelector = '//div[@class="test--top-slim-header"]';

  constructor() {
    super();
    this.prepareElementGetters(this.elements);
  }
}

class SlimHeader extends Header {
  mainElementSelector = '//div[contains(@class, "slim-header__sticky-slim-header")]';

  constructor() {
    super();
    this.prepareElementGetters(this.elements);
  }
}

module.exports = {
  TopHeader,
  SlimHeader
};
