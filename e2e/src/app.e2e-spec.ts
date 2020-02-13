import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  describe('business requirements', () => {
    describe('shows a table with pagination displaying \`Rechnung\`', () => {
      it('shows a table', () => {
        page.navigateTo();
        expect(page.hasRechnungTable()).toEqual(true);
      });

      it('shows a pagination', () => {
        page.navigateTo();
        expect(page.hasPaginator()).toEqual(true);
      });

      it('displays expected \`Rechnung\` items', (done) => {
        // without a real backend, it is a bit hard to do e2e tests that validate data flow

        page.navigateTo();
        page.getRechnungTableRows().then((elements) => {
          const rechnungsUids = elements.map((element) => element.getAttribute('data-rechnungs-uid'));

          expect(rechnungsUids.length).toBeGreaterThan(0);
          done();
        });
      });
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
