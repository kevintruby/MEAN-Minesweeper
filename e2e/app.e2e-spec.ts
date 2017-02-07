import { MeanMinesweeperPage } from './app.po';

describe('mean-minesweeper App', function() {
  let page: MeanMinesweeperPage;

  beforeEach(() => {
    page = new MeanMinesweeperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
