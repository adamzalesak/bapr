import { DataFrame } from '../../DataFrame/DataFrame';

test('DataFrame rename columns', () => {
  const df = new DataFrame(
    [
      { col1: 1, col2: 10 },
      { col1: 2, col2: 20 },
      { col1: 3, col2: 30 },
      { col1: 4, col2: 40 },
      { col1: 5, col2: 50 },
    ],
    [
      { name: 'col1', type: 'number' },
      { name: 'col2', type: 'number' },
    ],
  );

  expect(df.renameColumns(['col1'], ['col1-renamed']).rows).toEqual([
    { 'col1-renamed': 1, col2: 10 },
    { 'col1-renamed': 2, col2: 20 },
    { 'col1-renamed': 3, col2: 30 },
    { 'col1-renamed': 4, col2: 40 },
    { 'col1-renamed': 5, col2: 50 },
  ]);
  expect(df.renameColumns(['col1'], ['col1-renamed']).columns).toEqual([
    { name: 'col1-renamed', type: 'number' },
    { name: 'col2', type: 'number' },
  ]);
});

test('DataFrame drop columns', () => {
  const df = new DataFrame(
    [
      { col1: 1, col2: 10 },
      { col1: 2, col2: 20 },
      { col1: 3, col2: 30 },
      { col1: 4, col2: 40 },
      { col1: 5, col2: 50 },
    ],
    [
      { name: 'col1', type: 'number' },
      { name: 'col2', type: 'number' },
    ],
  );

  expect(df.dropColumns(['col1']).rows).toEqual([
    { col2: 10 },
    { col2: 20 },
    { col2: 30 },
    { col2: 40 },
    { col2: 50 },
  ]);
  expect(df.dropColumns(['col1']).columns).toEqual([{ name: 'col2', type: 'number' }]);
});

