import Section from './section';


class LogoSection extends Section {
  constructor(parentSelector) {
    super(parentSelector, '//div[@class="logo"]');
    this.prepareElementGetters({
      editButton: '//span[@class="top-button-wrapper"]//a[contains(@class, "hoverable-edit-wrapper-button")]',
      saveButton: '//span[@class="bottom-button-wrapper"]//a[@class="hoverable-edit-wrapper-button"]',
      cancelButton: '//span[@class="bottom-button-wrapper"]//a[@class="hoverable-edit-wrapper-button"][2]',
      title: '//*[contains(@class, "header-logo-title")]',
      subtitle: '//div[contains(@class, "header-logo-subtitle")]',
      subtitleFirstLine: '//div[contains(@class, "header-logo-subtitle")]//div[@data-block="true"][1]',
      boldTextSpan: '(//div[contains(@class, "header-logo-subtitle")]' +
        '//span[@data-offset-key and contains(@style, "font-weight: bold;")]/span)[1]',
      italicTextSpan: '(//div[contains(@class, "header-logo-subtitle")]' +
        '//span[@data-offset-key and contains(@style, "font-style: italic;")]/span)[1]',
      linkTextSpan: '(//div[contains(@class, "header-logo-subtitle")]' +
        '//span[contains(@style, "text-decoration: underline;")]/span[@data-offset-key]/span)[1]',
    });
  }
}

class DemoVideoSection extends Section {
  constructor(parentSelector) {
    super(parentSelector, '//div[contains(@class, "demo-video__demo-video")]');

    const playButtonSelector = '//div[@class="demo-video-button"]';
    this.prepareElementGetters({
      titleText: '//div[contains(@class, "demo-video-text-input")]',
      playButton: playButtonSelector,
      playButtonThumbnail: `${ playButtonSelector }//img[@class="demo-video-thumbnail"]`,
    });
  }
}

class TopBarSection extends Section {
  constructor(parentSelector) {
    super(parentSelector, '//div[@class="top-bar-wrapper"]');

    this.prepareElementGetters({
      logo: LogoSection,
      demoVideo: DemoVideoSection,
    });
  }
}

class SearchBoxSection extends Section {
  constructor(parentSelector) {
    super(parentSelector, '//div[contains(@class, "search-box__search-box")]');

    const searchMagnifyingGlassSelector = '//*[name()="svg" and contains(@class, "search-box-magnifying-glass")]';
    this.prepareElementGetters({
      searchMagnifyingGlass: searchMagnifyingGlassSelector,
      searchMagnifyingGlassPath: `${searchMagnifyingGlassSelector}//*[name()="path"]`,
      searchText: '//span[@class="search-box-search-text"]',
      searchTerm: '//span[@class="search-box-term"]',
      playButtonThumbnail: '//div[@class="demo-video-button"]//img[@class="demo-video-thumbnail"]',
    });
  }
}

class RightLinksSection extends Section {
  constructor(parentSelector) {
    super(parentSelector, '//div[contains(@class, "right-links__right-links")]');

    this.prepareElementGetters({
      data: '//a[text()="Data"]',
      qa: '//a[text()="Q&A"]',
      documents: '//a[text()="Documents"]',
      pinboard: '//a[text()="Pinboard"]',
    });
  }
}

class NavBarSection extends Section {
  constructor(parentSelector) {
    super(parentSelector, '//div[@class="navbar-wrapper"]');
    this.prepareElementGetters({
      logOutButton: '//a[contains(@class, "test--logout-button")]',
      searchBox: SearchBoxSection,
      rightLinks: RightLinksSection,
    });
  }
}

class Header extends Section {
  constructor(parentSelector, mainElementSelector) {
    super(parentSelector, mainElementSelector);

    this.prepareElementGetters({
      topBar: TopBarSection,
      navBar: NavBarSection,
    });
  }
}

class TopHeader extends Header {
  constructor(parentSelector) {
    super(parentSelector, '//div[@class="test--top-slim-header"]');
  }
}

class SlimHeader extends Header {
  constructor(parentSelector) {
    super(parentSelector, '//div[contains(@class, "slim-header__sticky-slim-header")]');
  }
}

module.exports = {
  TopHeader,
  SlimHeader,
};
