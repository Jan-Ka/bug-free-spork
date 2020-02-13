import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }

  hasTable(): Promise<boolean> {
    try {
      const tableElem = element(by.css('table')).getWebElement();
      //if there is an element, we don't get an exception
      return Promise.resolve(true);
    } catch {
      return Promise.resolve(false);
    }
  }
}
