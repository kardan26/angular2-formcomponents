import { FormcomponentsPage } from './app.po';

describe('formcomponents App', function() {
  let page: FormcomponentsPage;

  beforeEach(() => {
    page = new FormcomponentsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
