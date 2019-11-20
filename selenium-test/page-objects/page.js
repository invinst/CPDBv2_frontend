'use strict';

import { retry } from '../utils';
import LoginScreen from './sections/login-screen';
import Section from './sections/section';


export default class Page extends Section {
  constructor() {
    super();

    this.loginScreen = new LoginScreen();
    this.prepareElementGetters({
      clickyScript: '//script[@src="//static.getclicky.com/js"]',
      clickySiteIdsScript: '//script[' +
        'text()="var clicky_site_ids = clicky_site_ids || []; clicky_site_ids.push(CLICKY_TRACKING_ID);"]',
      clickyNoJavascriptGIF:
        '//noscript[contains(text(), \'<img alt="Clicky" width="1" height="1" src="//in.getclicky.com/\')]',
    });
  }

  open(path) {
    browser.deleteCookies();
    browser.url(path);
    $('body').waitForDisplayed();
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
