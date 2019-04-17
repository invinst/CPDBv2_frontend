'use strict';

import { retry } from '../utils';
import LoginScreen from './sections/login-screen';
import Section from './sections/section';


export default class Page extends Section {
  constructor() {
    super();

    this.loginScreen = new LoginScreen();
  }

  open(path) {
    browser.deleteCookie();
    browser.url(path);
    browser.element('body').waitForVisible();
  }

  get currentBasePath() {
    const url = browser.getUrl();
    return url.replace(/https?:\/\/[^/]+/, '');
  }

  toggleEditMode(editModeOn) {
    retry(
      () => {
        browser.keys('Escape');
        browser.pause(10);
      },
      () => {
        return editModeOn ? this.currentBasePath.match(/^edit/) == null : this.currentBasePath.match(/^edit/) !== null;
      }
    );
  }

  openEditMode() {
    this.toggleEditMode(false);
    this.loginScreen.login();
  }

  isRichTextEditorEmpty(element) {
    return element.element('.public-DraftEditorPlaceholder-root').state === 'success';
  }

  expandRootTopMargin() {
    browser.execute(() => {
      document.getElementsByTagName('html')[0].style.marginTop = '100px';
    });
  }
}
