import { AppPage } from './app.po';
import { browser, logging, WebElement } from 'protractor';
import { fail } from 'assert';

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

      it('displays expected \`Rechnung\` items', async (done) => {
        // without a real backend, it is a bit hard to do e2e tests that validate data flow

        page.navigateTo();
        const tableRows = await page.getRechnungTableRows();
        const rechnungsUids = await rechnungsUidsFromElementsDataset(tableRows);

        expect(rechnungsUids.length).toBeGreaterThan(0);
        done();
      });

      it('can page forward through data', async (done) => {
        page.navigateTo();
        const initRows = await page.getRechnungTableRows();
        const initRechnungsUid = await rechnungsUidsFromElementsDataset(initRows);

        await (await page.getPaginatorNextButton()).click();

        const newRows = await page.getRechnungTableRows();
        const newRechnungsUid = await rechnungsUidsFromElementsDataset(newRows);

        expect(initRechnungsUid).not.toEqual(newRechnungsUid);
        done();
      });

      it('can page backward through data', async (done) => {
        page.navigateTo();
        const initRows = await page.getRechnungTableRows();
        const initRechnungsUid = await rechnungsUidsFromElementsDataset(initRows);

        await page.getPaginatorNextButton().click();

        await page.getPaginatorBackButton().click();

        const newRows = await page.getRechnungTableRows();
        const newRechnungsUid = await rechnungsUidsFromElementsDataset(newRows);

        expect(initRechnungsUid).toEqual(newRechnungsUid);
        done();
      });

      it('can open \`Rechnungsposition\` by clicking a button', async () => {
        page.navigateTo();

        const tableRowButton = await page.getFirstRechnungTableRowButton();

        tableRowButton.click();

        const present = await page.getOpenDialogs().isPresent();

        expect(present).toBeTruthy();
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

function rechnungsUidsFromElementsDataset(elements: WebElement[]): Promise<string[]> {
  return Promise.all(elements.map((element) => element.getAttribute('data-rechnungs-uid')));
}
