import { browser, by, element, WebElementPromise } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }

  hasPaginator(): Promise<boolean> {
    try {
      element(by.css('mat-paginator')).getWebElement();
      // if there is an element, we don't get an exception
      return Promise.resolve(true);
    } catch {
      return Promise.resolve(false);
    }
  }

  hasRechnungTable(): Promise<boolean> {
    try {
      element(by.css('app-rechnung-table')).getWebElement();
      // if there is an element, we don't get an exception
      return Promise.resolve(true);
    } catch {
      // if there is an element, we don't get an exception
      return Promise.resolve(false);
    }
  }

  getRechnungTableRows() {
    return element.all(by.css('app-rechnung-table tr[data-rechnungs-uid]')).getWebElements();
  }

  getFirstRechnungTableRowButton() {
    return element(by.css('app-rechnung-table tbody tr:first-of-type button.mat-icon-button')).getWebElement();
  }

  getPaginatorNextButton() {
    return element(by.css('.mat-paginator-navigation-next:enabled')).getWebElement();
  }

  getPaginatorBackButton() {
    return element(by.css('.mat-paginator-navigation-previous:enabled')).getWebElement();
  }

  getOpenDialogs() {
    return element(by.css('.cdk-overlay-container mat-dialog-container'));
  }
}
