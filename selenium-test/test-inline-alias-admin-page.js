'use strict';

import 'should';

import inlineAliasAdminPage from './page-objects/inline-alias-admin-page';

describe('Inline Alias Admin Page', function () {
  beforeEach(function () {
    inlineAliasAdminPage.open();
  });

  it('should be able to update tags', function () {
    inlineAliasAdminPage.tagsInputTextbox.waitForDisplayed();
    inlineAliasAdminPage.tagsInputTextbox.click();
    inlineAliasAdminPage.tags.count.should.equal(0);

    inlineAliasAdminPage.tagsInput.setValue('tag 1');
    browser.keys('Enter');
    inlineAliasAdminPage.tagsInput.setValue('tag 2');
    browser.keys('Enter');
    inlineAliasAdminPage.tagsInput.setValue('tag 3');
    browser.keys('Enter');

    inlineAliasAdminPage.tags.count.should.equal(3);
    inlineAliasAdminPage.firstTag.getText().should.equal('tag 1');
    inlineAliasAdminPage.secondTag.getText().should.equal('tag 2');
    inlineAliasAdminPage.thirdTag.getText().should.equal('tag 3');

    inlineAliasAdminPage.secondTagDeleteBtn.click();
    inlineAliasAdminPage.tags.count.should.equal(2);
    inlineAliasAdminPage.firstTag.getText().should.equal('tag 1');
    inlineAliasAdminPage.secondTag.getText().should.equal('tag 3');
  });
});
