import { DataFrame } from '../../DataFrame/DataFrame';

test('DataFrame Simple Imputer number', () => {
  const df = new DataFrame(
    [
      { col1: 1, col2: 50 },
      { col1: 2, col2: null },
      { col1: 3, col2: 20 },
      { col1: 4, col2: null },
      { col1: 5, col2: 50 },
    ],
    [
      { name: 'col1', type: 'number' },
      { name: 'col2', type: 'number' },
    ],
  );

  expect(df.simpleImputer('col2', 'MEAN').rows).toEqual([
    { col1: 1, col2: 50 },
    { col1: 2, col2: 40 },
    { col1: 3, col2: 20 },
    { col1: 4, col2: 40 },
    { col1: 5, col2: 50 },
  ]);

  expect(df.simpleImputer('col2', 'MEDIAN').rows).toEqual([
    { col1: 1, col2: 50 },
    { col1: 2, col2: 50 },
    { col1: 3, col2: 20 },
    { col1: 4, col2: 50 },
    { col1: 5, col2: 50 },
  ]);

  expect(df.simpleImputer('col2', 'MOST_FREQUENT').rows).toEqual([
    { col1: 1, col2: 50 },
    { col1: 2, col2: 50 },
    { col1: 3, col2: 20 },
    { col1: 4, col2: 50 },
    { col1: 5, col2: 50 },
  ]);

  expect(df.simpleImputer('col2', 'CONSTANT', '0').rows).toEqual([
    { col1: 1, col2: 50 },
    { col1: 2, col2: 0 },
    { col1: 3, col2: 20 },
    { col1: 4, col2: 0 },
    { col1: 5, col2: 50 },
  ]);
});

test('DataFrame Simple Imputer string', () => {
  const df = new DataFrame(
    [
      { col1: 1, col2: 'a' },
      { col1: 2, col2: null },
      { col1: 3, col2: 'b' },
      { col1: 4, col2: null },
      { col1: 5, col2: 'a' },
    ],
    [
      { name: 'col1', type: 'number' },
      { name: 'col2', type: 'string' },
    ],
  );

  expect(df.simpleImputer('col2', 'MOST_FREQUENT').rows).toEqual([
    { col1: 1, col2: 'a' },
    { col1: 2, col2: 'a' },
    { col1: 3, col2: 'b' },
    { col1: 4, col2: 'a' },
    { col1: 5, col2: 'a' },
  ]);

  expect(df.simpleImputer('col2', 'CONSTANT', 'c').rows).toEqual([
    { col1: 1, col2: 'a' },
    { col1: 2, col2: 'c' },
    { col1: 3, col2: 'b' },
    { col1: 4, col2: 'c' },
    { col1: 5, col2: 'a' },
  ]);
});

