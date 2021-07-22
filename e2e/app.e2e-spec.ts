import { TicketAppPage } from './app.po';

describe('ticket-app App', () => {
  let page: TicketAppPage;

  beforeEach(() => {
    page = new TicketAppPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
