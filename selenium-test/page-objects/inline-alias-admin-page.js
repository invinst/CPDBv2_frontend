import Page from './page';


class InlineAliasAdminPage extends Page {
  constructor() {
    super();

    this.prepareElementGetters({
      tagsInputTextbox: '//div[@class="react-tagsinput"]',
      tagsInput: '//input[@placeholder="Enter alias"]',
      tags: '//span[@class="react-tagsinput-tag"]',
      firstTag: '//span[@class="react-tagsinput-tag"][1]',
      secondTag: '//span[@class="react-tagsinput-tag"][2]',
      thirdTag: '//span[@class="react-tagsinput-tag"][3]',
      firstTagDeleteBtn: '//span[@class="react-tagsinput-tag"][1]//img',
      secondTagDeleteBtn: '//span[@class="react-tagsinput-tag"][2]//img',
    });
  }

  open() {
    super.open('/search/alias/form/');
  }
}

module.exports = new InlineAliasAdminPage();
