import { FindTripAppPage } from './app.po';

describe('find-trip-app App', () => {
  let page: FindTripAppPage;

  beforeEach(() => {
    page = new FindTripAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
